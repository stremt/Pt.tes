import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Zap, Copy, RotateCcw } from "lucide-react";

const ZALGO_CHARS = {
  up: [
    '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357',
    '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c',
  ],
  down: [
    '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324',
    '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330',
  ],
  mid: [
    '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334',
    '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362',
  ],
};

export default function GlitchTextGenerator() {
  const [input, setInput] = useState("");
  const [intensity, setIntensity] = useState([5]);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Glitch Text Generator | Zalgo Spooky Text | Pixocraft Tools",
    description: "Create glitchy, spooky Zalgo text instantly. Offline & fun.",
    keywords: "glitch text, zalgo generator, crazy text",
    canonicalUrl: "https://tools.pixocraft.in/tools/glitch-text-generator",
  });

  const generateGlitch = (text: string, level: number): string => {
    return text.split('').map(char => {
      if (char === ' ') return ' ';
      let glitched = char;
      for (let i = 0; i < level; i++) {
        if (Math.random() > 0.5) glitched += ZALGO_CHARS.up[Math.floor(Math.random() * ZALGO_CHARS.up.length)];
        if (Math.random() > 0.5) glitched += ZALGO_CHARS.down[Math.floor(Math.random() * ZALGO_CHARS.down.length)];
        if (Math.random() > 0.7) glitched += ZALGO_CHARS.mid[Math.floor(Math.random() * ZALGO_CHARS.mid.length)];
      }
      return glitched;
    }).join('');
  };

  const output = generateGlitch(input, intensity[0]);

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
      title="Glitch Text Generator (Zalgo)"
      description="Enter text → glitchify it instantly."
      icon={<Zap className="h-10 w-10 text-primary" />}
      toolId="glitch-text-generator"
      category="Text & Writing"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type any text you want to glitchify." },
        { step: 2, title: "Adjust Intensity", description: "Use the slider to control glitch level." },
        { step: 3, title: "Copy & Share", description: "Use your glitchy text anywhere!" },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Spooky Effect", description: "Create creepy, distorted Zalgo text." },
      ]}
      faqs={[
        { question: "What is Zalgo text?", answer: "Zalgo text is creepy, glitched text created by adding Unicode combining characters above and below normal letters." },
        { question: "Where can I use it?", answer: "Use in social media, gaming usernames, or anywhere you want to create a spooky effect!" },
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
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter text to glitchify..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-base"
              data-testid="input-text"
            />
            <div className="space-y-2">
              <Label>Glitch Intensity: {intensity[0]}</Label>
              <Slider
                value={intensity}
                onValueChange={setIntensity}
                min={1}
                max={10}
                step={1}
                data-testid="slider-intensity"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Glitch Output</span>
              {output && (
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(output, "Copied!")} data-testid="button-copy">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg text-2xl min-h-[120px] break-all leading-loose">
              {output || <span className="text-muted-foreground italic text-base">G̴̢̛l̵̨̛i̴̧̨t̶̨͝c̸̛̪h̶̢̛ ̸̧͝t̸͘͜e̵̢̛x̸͜͝t̶̢̛ ̶̛͜h̴̢̛e̵̛̛r̶̢̛e̸̛.̸̢.̶̛.̶̢</span>}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
