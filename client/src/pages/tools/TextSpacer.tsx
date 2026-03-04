import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Space, Copy, RotateCcw, Plus, Minus } from "lucide-react";

export default function TextSpacer() {
  const [input, setInput] = useState("");
  const [spacing, setSpacing] = useState([1]);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Text Spacer | Add Spaces Between Letters | Pixocraft Tools",
    description: "Create spaced-out text easily. Offline & free.",
    keywords: "text spacer, spaced text generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-spacer",
  });

  const addSpaces = (text: string, count: number): string => {
    return text.split('').join(' '.repeat(count));
  };

  const incrementSpacing = () => {
    if (spacing[0] < 5) {
      setSpacing([spacing[0] + 1]);
    }
  };

  const decrementSpacing = () => {
    if (spacing[0] > 1) {
      setSpacing([spacing[0] - 1]);
    }
  };

  const output = addSpaces(input, spacing[0]);

  return (
    <>
      <ToolLayout
        title="Text Spacer"
        description="Generate spaced-out text for design and emphasis."
        icon={<Space className="h-10 w-10 text-primary" />}
        toolId="text-spacer"
        category="text"
        howItWorks={[
        { step: 1, title: "Enter Text", description: "Type any text you want to space out." },
        { step: 2, title: "Adjust Spacing", description: "Use slider to control space between letters." },
        { step: 3, title: "Copy Result", description: "Copy and use your spaced text!" },
      ]}
      benefits={[
        { icon: <Space className="h-6 w-6 text-primary" />, title: "Custom Spacing", description: "Control exact spacing between characters." },
      ]}
      faqs={[
        { question: "Where can I use spaced text?", answer: "Perfect for logos, headers, social media posts, and design emphasis." },
        { question: "Does it work with any characters?", answer: "Yes, works with all text, letters, numbers, and symbols." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Input Text</span>
              {input && (
                <Button variant="ghost" size="sm" onClick={() => setInput("")} data-testid="button-clear">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              placeholder="Enter text..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-base"
              data-testid="input-text"
            />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Spacing: {spacing[0]} {spacing[0] === 1 ? 'space' : 'spaces'}</Label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={decrementSpacing}
                    disabled={spacing[0] <= 1}
                    data-testid="button-minus-spacing"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={incrementSpacing}
                    disabled={spacing[0] >= 5}
                    data-testid="button-plus-spacing"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Slider
                value={spacing}
                onValueChange={setSpacing}
                min={1}
                max={5}
                step={1}
                data-testid="slider-spacing"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Spaced Output</span>
              {output && (
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(output, "Copied!")} data-testid="button-copy">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg text-xl min-h-[80px] break-all">
              {output || <span className="text-muted-foreground italic text-base">S p a c e d   o u t p u t   h e r e...</span>}
            </div>
          </CardContent>
        </Card>
      </div>
        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/text" className="text-primary hover:text-primary/80 transition-colors">Text Tools</Link>
        </p>
      </ToolLayout>
    </>
  );
}
