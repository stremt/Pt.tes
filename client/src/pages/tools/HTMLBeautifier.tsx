import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { FileCode, Copy, RotateCcw, Zap, Lock, Globe } from "lucide-react";
import beautify from "js-beautify";

export default function HTMLBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "HTML Beautifier Online | Format HTML Code Fast",
    description: "Format and clean messy HTML code instantly. Offline, quick and perfect for developers.",
    keywords: "html beautifier, format html code, html formatter online",
    canonicalUrl: "https://tools.pixocraft.in/tools/html-beautifier",
  });

  const handleBeautify = () => {
    const beautified = beautify.html(input, {
      indent_size: 2,
      wrap_line_length: 80,
      preserve_newlines: true,
    });
    setOutput(beautified);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="HTML Beautifier"
      description="Format and beautify your HTML with one click. Offline and developer-friendly."
      icon={<FileCode className="h-10 w-10 text-primary" />}
      toolId="html-beautifier"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Paste HTML", description: "Enter your messy or minified HTML code." },
        { step: 2, title: "Beautify", description: "Click beautify to format with proper indentation." },
        { step: 3, title: "Copy", description: "Copy the clean, formatted HTML." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Formatting", description: "Clean up HTML code in seconds." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Privacy First", description: "All processing happens offline." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Free Forever", description: "No limits or restrictions." },
      ]}
      faqs={[
        { question: "What does HTML beautification do?", answer: "It adds proper indentation, line breaks, and formatting to make HTML code clean and readable." },
        { question: "Can it fix broken HTML?", answer: "It formats HTML but doesn't fix structural errors. Use an HTML validator for error checking." },
        { question: "Is there a file size limit?", answer: "No hard limit, but very large files may slow down processing." },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleBeautify} disabled={!input} data-testid="button-beautify">
                <FileCode className="h-4 w-4 mr-2" />
                Beautify HTML
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
              <CardTitle>Input HTML</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder='<div><h1>Hello</h1><p>World</p></div>'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[500px] text-sm font-mono"
                data-testid="input-html"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Beautified HTML</span>
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
                  <p className="text-sm">Beautified HTML will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
