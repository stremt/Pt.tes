import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Highlighter, Copy } from "lucide-react";

export default function TextHighlightMarker() {
  const [text, setText] = useState("This is highlighted text");
  const [highlightColor, setHighlightColor] = useState("#fef08a");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Text Highlight Marker | CSS Highlight Generator | Pixocraft Tools",
    description: "Generate CSS text highlights with custom colors and copy code.",
    keywords: "text highlight generator, css mark element",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-highlight-marker",
  });

  const cssCode = `.highlighted {
  background-color: ${highlightColor};
  padding: 2px 4px;
  border-radius: 3px;
}`;

  const htmlCode = `<mark class="highlighted">${text}</mark>`;

  return (
      <Breadcrumb
        items={[
          { label: "Home", url: "/" },
          { label: "Tools", url: "/tools" },
          { label: "Text Tools", url: "/tools/text" },
          { label: tool.name || "Tool" },
        ]}
      />
      <div className="mb-6">/
    <ToolLayout
      title="Text Highlight Marker"
      description="Create highlighted text with custom background colors."
      icon={<Highlighter className="h-10 w-10 text-primary" />}
      toolId="text-highlight-marker"
      category="Text & Writing"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type the text you want to highlight." },
        { step: 2, title: "Pick Color", description: "Choose a highlight background color." },
        { step: 3, title: "Copy Code", description: "Get CSS and HTML code." },
      ]}
      benefits={[
        { icon: <Highlighter className="h-6 w-6 text-primary" />, title: "Custom Highlights", description: "Any color, any text." },
      ]}
      faqs={[
        { question: "What's the best highlight color?", answer: "Yellow (#fef08a) is classic, but use any color that provides good contrast." },
        { question: "Can I use this for code?", answer: "Yes! Great for highlighting important parts of documentation or tutorials." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Highlight Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Text to Highlight</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-2 min-h-[80px]"
                data-testid="input-text"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Highlight Color</label>
              <div className="flex gap-2 mt-2">
                <input
                  type="color"
                  value={highlightColor}
                  onChange={(e) => setHighlightColor(e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                  data-testid="input-color"
                />
                <input
                  type="text"
                  value={highlightColor}
                  onChange={(e) => setHighlightColor(e.target.value)}
                  className="flex-1 px-3 border rounded font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-8 bg-muted/50 rounded-lg">
              <p className="text-2xl">
                <mark
                  style={{
                    backgroundColor: highlightColor,
                    padding: '2px 4px',
                    borderRadius: '3px',
                  }}
                  data-testid="highlight-preview"
                >
                  {text}
                </mark>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>CSS Code</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(cssCode, "CSS copied!")}
                data-testid="button-copy-css"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy CSS
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted/50 rounded-lg font-mono text-sm" data-testid="css-code">
              {cssCode}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>HTML Code</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(htmlCode, "HTML copied!")}
                data-testid="button-copy-html"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy HTML
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted/50 rounded-lg font-mono text-sm break-all" data-testid="html-code">
              {htmlCode}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
