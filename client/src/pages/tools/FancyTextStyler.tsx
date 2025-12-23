import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Sparkles, Copy } from "lucide-react";

const FANCY_STYLES: Record<string, (text: string) => string> = {
  Bold: (text) => text.split('').map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(code + 119743);
    if (code >= 97 && code <= 122) return String.fromCharCode(code + 119737);
    if (code >= 48 && code <= 57) return String.fromCharCode(code + 120734);
    return c;
  }).join(''),
  Italic: (text) => text.split('').map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(code + 119847);
    if (code >= 97 && code <= 122) return String.fromCharCode(code + 119841);
    return c;
  }).join(''),
  'Bold Italic': (text) => text.split('').map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(code + 119899);
    if (code >= 97 && code <= 122) return String.fromCharCode(code + 119893);
    return c;
  }).join(''),
  Monospace: (text) => text.split('').map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(code + 120367);
    if (code >= 97 && code <= 122) return String.fromCharCode(code + 120361);
    if (code >= 48 && code <= 57) return String.fromCharCode(code + 120774);
    return c;
  }).join(''),
  'Double Struck': (text) => text.split('').map(c => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCharCode(code + 120055);
    if (code >= 97 && code <= 122) return String.fromCharCode(code + 120049);
    if (code >= 48 && code <= 57) return String.fromCharCode(code + 120734);
    return c;
  }).join(''),
};

export default function FancyTextStyler() {
  const [input, setInput] = useState("Fancy Text");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Fancy Text Styler | Unicode Text Formatter | Pixocraft Tools",
    description: "Transform text into bold, italic, monospace & more using Unicode.",
    keywords: "fancy text generator, unicode text styler",
    canonicalUrl: "https://tools.pixocraft.in/tools/fancy-text-styler",
  });

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
      title="Fancy Text Styler"
      description="Convert text to fancy Unicode styles instantly."
      icon={<Sparkles className="h-10 w-10 text-primary" />}
      toolId="fancy-text-styler"
      category="Text & Writing"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type any text you want to stylize." },
        { step: 2, title: "Pick Style", description: "Choose from bold, italic, monospace, and more." },
        { step: 3, title: "Copy & Use", description: "Use your fancy text anywhere!" },
      ]}
      benefits={[
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "Unicode Styles", description: "Works in social media, messages, anywhere." },
      ]}
      faqs={[
        { question: "Are these real characters?", answer: "Yes! These are mathematical Unicode characters that look like styled text." },
        { question: "Where can I use fancy text?", answer: "Anywhere that supports Unicode - social media, messaging apps, documents, and more!" },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-base"
              placeholder="Enter text to stylize..."
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        <div className="space-y-3">
          {Object.entries(FANCY_STYLES).map(([styleName, transformer]) => {
            const output = transformer(input);
            return (
              <Card key={styleName}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{styleName}</p>
                      <p className="text-xl font-mono break-all" data-testid={`style-${styleName.toLowerCase().replace(' ', '-')}`}>
                        {output}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(output, `${styleName} text copied!`)}
                      data-testid={`button-copy-${styleName.toLowerCase().replace(' ', '-')}`}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/text" className="text-primary hover:text-primary/80 transition-colors">Text Tools</Link>
        </p>
    </ToolLayout>
  );
}
