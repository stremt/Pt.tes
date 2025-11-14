import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Plus, Copy } from "lucide-react";

const COMMON_SYMBOLS = ['→', '←', '↑', '↓', '★', '☆', '♥', '♦', '♣', '♠', '•', '◦', '▪', '▫', '▸', '▹', '◂', '◃', '✓', '✗', '✖', '✚', '✜', '⊕', '⊗', '⊙', '○', '●', '◯', '◉', '◐', '◑'];

export default function SymbolCombiner() {
  const [text, setText] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("•");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Symbol Combiner | Add Symbols to Text | Pixocraft Tools",
    description: "Add decorative symbols before/after text instantly.",
    keywords: "symbol combiner, text decorator tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/symbol-combiner",
  });

  const beforeText = `${selectedSymbol} ${text}`;
  const afterText = `${text} ${selectedSymbol}`;
  const bothText = `${selectedSymbol} ${text} ${selectedSymbol}`;

  return (
    <ToolLayout
      title="Symbol Combiner"
      description="Add decorative symbols to your text easily."
      icon={<Plus className="h-10 w-10 text-primary" />}
      toolId="symbol-combiner"
      category="Text & Writing"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type any text you want to decorate." },
        { step: 2, title: "Pick Symbol", description: "Choose from common symbols." },
        { step: 3, title: "Copy Result", description: "Get text with symbols before, after, or both!" },
      ]}
      benefits={[
        { icon: <Plus className="h-6 w-6 text-primary" />, title: "Quick Decoration", description: "Add visual appeal to text instantly." },
      ]}
      faqs={[
        { question: "Where can I use these symbols?", answer: "Perfect for bullet points, lists, social media posts, and decorative headings!" },
        { question: "Can I use custom symbols?", answer: "Yes! Click any symbol from the gallery or type your own." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text..."
              className="text-base"
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Choose Symbol</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-8 gap-2">
              {COMMON_SYMBOLS.map((symbol) => (
                <Button
                  key={symbol}
                  variant={selectedSymbol === symbol ? "default" : "outline"}
                  className="text-xl"
                  onClick={() => setSelectedSymbol(symbol)}
                  data-testid={`symbol-${symbol}`}
                >
                  {symbol}
                </Button>
              ))}
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium">Or type your own symbol:</label>
              <Input
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value.slice(0, 3))}
                className="mt-2 text-center text-xl"
                maxLength={3}
                data-testid="input-custom-symbol"
              />
            </div>
          </CardContent>
        </Card>

        {text && (
          <div className="space-y-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Symbol Before</p>
                    <p className="text-xl" data-testid="output-before">{beforeText}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(beforeText, "Copied!")} data-testid="button-copy-before">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Symbol After</p>
                    <p className="text-xl" data-testid="output-after">{afterText}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(afterText, "Copied!")} data-testid="button-copy-after">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Symbols Both Sides</p>
                    <p className="text-xl" data-testid="output-both">{bothText}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(bothText, "Copied!")} data-testid="button-copy-both">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
