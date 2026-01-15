import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Subscript, Copy, RotateCcw } from "lucide-react";

const SUBSCRIPT_MAP: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
  'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ', '+': '₊', '-': '₋', '=': '₌',
  '(': '₍', ')': '₎'
};

export default function SubscriptGenerator() {
  const [input, setInput] = useState("");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Subscript Generator | Create Subscript Text | Pixocraft Tools",
    description: "Convert text into subscript characters like H₂O, CO₂. Perfect for formulas and scientific notation. Free, fast and works offline.",
    keywords: "subscript generator, chemical text generator, subscript text online, unicode subscript",
    canonicalUrl: "https://tools.pixocraft.in/tools/subscript-generator",
  });

  const toSubscript = (text: string): string => {
    return text.split('').map(char => SUBSCRIPT_MAP[char.toLowerCase()] || char).join('');
  };

  const output = toSubscript(input);

  return (
    <ToolLayout
      title="Subscript Generator"
      description="Enter text → convert to subscript instantly."
      icon={<Subscript className="h-10 w-10 text-primary" />}
      toolId="subscript-generator"
      category="text"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type numbers, letters, or symbols." },
        { step: 2, title: "Auto Convert", description: "Instantly converts to subscript Unicode." },
        { step: 3, title: "Copy & Use", description: "Perfect for chemical formulas and math." },
      ]}
      benefits={[
        { icon: <Subscript className="h-6 w-6 text-primary" />, title: "Unicode Subscript", description: "True subscript characters." },
      ]}
      faqs={[
        { question: "Where can I use subscript?", answer: "Perfect for chemical formulas (H₂O, CO₂), mathematical notation, and scientific writing." },
        { question: "Does it work everywhere?", answer: "Yes! These are real Unicode characters that work in any text field." },
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
              placeholder="e.g., H2O, CO2..."
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
              <span>Subscript Output</span>
              {output && (
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(output, "Copied!")} data-testid="button-copy">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg text-2xl min-h-[80px]">
              {output || <span className="text-muted-foreground italic text-base">ₛᵤᵦₛ�ᵣᵢₚₜ ₒᵤₜₚᵤₜ ₕₑᵣₑ...</span>}
            </div>
            {output && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-900">
                <p className="text-sm text-green-900 dark:text-green-100">
                  <strong>Example:</strong> H₂O (Water), CO₂ (Carbon Dioxide)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
