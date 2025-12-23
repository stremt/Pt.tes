import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Superscript, Copy, RotateCcw } from "lucide-react";

const SUPERSCRIPT_MAP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
  'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ',
  'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
};

export default function SuperscriptGenerator() {
  const [input, setInput] = useState("");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Superscript Generator | Convert Text to Superscript | Pixocraft Tools",
    description: "Generate superscript characters for math & styling. Offline and private.",
    keywords: "superscript generator, tiny text generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/superscript-generator",
  });

  const toSuperscript = (text: string): string => {
    return text.split('').map(char => SUPERSCRIPT_MAP[char.toLowerCase()] || char).join('');
  };

  const output = toSuperscript(input);

  return (
    <ToolLayout
      title="Superscript Generator"
      description="Type text → convert to superscript instantly."
      icon={<Superscript className="h-10 w-10 text-primary" />}
      toolId="superscript-generator"
      category="text"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type numbers, letters, or symbols." },
        { step: 2, title: "Auto Convert", description: "Instantly converts to superscript Unicode." },
        { step: 3, title: "Copy & Use", description: "Use in documents, social media, or anywhere." },
      ]}
      benefits={[
        { icon: <Superscript className="h-6 w-6 text-primary" />, title: "Unicode Superscript", description: "True superscript characters, not CSS." },
      ]}
      faqs={[
        { question: "Where can I use superscript?", answer: "Use in math equations, footnotes, trademark symbols (™), exponents (x²), and more." },
        { question: "Does it work in social media?", answer: "Yes! These are real Unicode characters that work anywhere." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Normal Text</span>
              {input && (
                <Button variant="ghost" size="sm" onClick={() => setInput("")} data-testid="button-clear">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter text..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-base"
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Superscript Output</span>
              {output && (
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(output, "Copied!")} data-testid="button-copy">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg text-2xl min-h-[80px] max-h-[300px] overflow-y-auto break-words">
              {output || <span className="text-muted-foreground italic text-base">ˢᵘᵖᵉʳˢᶜʳⁱᵖᵗ ᵒᵘᵗᵖᵘᵗ ʰᵉʳᵉ...</span>}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
