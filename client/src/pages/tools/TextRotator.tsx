import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { RotateCw, Copy } from "lucide-react";

export default function TextRotator() {
  const [text, setText] = useState("Hello");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Text Rotator | Rotate & Flip Text | Pixocraft Tools",
    description: "Flip text upside-down or reverse it instantly using Unicode.",
    keywords: "text rotator, upside down text, reverse text",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-rotator",
  });

  const FLIP_MAP: Record<string, string> = {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
    'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
    'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
    'y': 'ʎ', 'z': 'z', '?': '¿', '!': '¡', '.': '˙', ',': '\'', '\'': ',',
    'A': '∀', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H',
    'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '⅂', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ',
    'Q': 'Ό', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
    'Y': '⅄', 'Z': 'Z',
  };

  const flipUpsideDown = (str: string): string => {
    return str.split('').reverse().map(c => FLIP_MAP[c] || c).join('');
  };

  const reverseText = (str: string): string => {
    return str.split('').reverse().join('');
  };

  const upsideDown = flipUpsideDown(text);
  const reversed = reverseText(text);

  return (
    <>
      <ToolLayout
        title="Text Rotator"
        description="Flip text upside-down or reverse it instantly."
        icon={<RotateCw className="h-10 w-10 text-primary" />}
        toolId="text-rotator"
        category="text"
        howItWorks={[
        { step: 1, title: "Enter Text", description: "Type any text you want to rotate." },
        { step: 2, title: "Choose Style", description: "See upside-down and reversed versions." },
        { step: 3, title: "Copy & Share", description: "Use rotated text anywhere!" },
      ]}
      benefits={[
        { icon: <RotateCw className="h-6 w-6 text-primary" />, title: "Fun Effects", description: "Create unique text transformations." },
      ]}
      faqs={[
        { question: "How does upside-down text work?", answer: "Uses special Unicode characters that look like upside-down letters." },
        { question: "Does it work everywhere?", answer: "Yes! Works in social media, messages, and any text field." },
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
              placeholder="Enter text to rotate..."
              className="text-base"
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Upside-Down</p>
                <p className="text-2xl" data-testid="output-upside-down">{upsideDown}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(upsideDown, "Upside-down text copied!")}
                data-testid="button-copy-upside-down"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reversed</p>
                <p className="text-2xl" data-testid="output-reversed">{reversed}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(reversed, "Reversed text copied!")}
                data-testid="button-copy-reversed"
              >
                <Copy className="h-4 w-4" />
              </Button>
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
