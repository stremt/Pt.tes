import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Palette, Copy, Shuffle } from "lucide-react";

export default function RandomHexColor() {
  const [color, setColor] = useState("#3b82f6");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Random Hex Color Generator | Generate Random Colors | Pixocraft Tools",
    description: "Generate random HEX colors instantly for design inspiration.",
    keywords: "random hex generator, random color tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-hex-color",
  });

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    setColor(randomColor);
  };

  const rgbColor = () => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <ToolLayout
      title="Random Hex Color Generator"
      description="Generate beautiful random HEX colors with one click."
      icon={<Palette className="h-10 w-10 text-primary" />}
      toolId="random-hex-color"
      category="Color & Design"
      howItWorks={[
        { step: 1, title: "Click Generate", description: "Get a random HEX color instantly." },
        { step: 2, title: "See Preview", description: "View the color in a large preview box." },
        { step: 3, title: "Copy Code", description: "Copy HEX or RGB values." },
      ]}
      benefits={[
        { icon: <Shuffle className="h-6 w-6 text-primary" />, title: "Instant Colors", description: "Perfect for design inspiration." },
      ]}
      faqs={[
        { question: "Can I use these colors commercially?", answer: "Yes! Colors are randomly generated and free to use anywhere." },
        { question: "What's the RGB value?", answer: "The RGB equivalent is shown alongside the HEX code." },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-6">
              <div
                className="w-full h-64 rounded-lg border-4 border-border transition-colors duration-300"
                style={{ backgroundColor: color }}
                data-testid="color-preview"
              />
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <div>
                    <p className="text-sm text-muted-foreground">HEX</p>
                    <p className="text-2xl font-mono font-bold" data-testid="color-hex">{color}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(color, "HEX copied!")}
                    data-testid="button-copy-hex"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <div>
                    <p className="text-sm text-muted-foreground">RGB</p>
                    <p className="text-xl font-mono" data-testid="color-rgb">{rgbColor()}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(rgbColor(), "RGB copied!")}
                    data-testid="button-copy-rgb"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button size="lg" onClick={generateRandomColor} data-testid="button-generate">
                <Shuffle className="h-5 w-5 mr-2" />
                Generate Random Color
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
        </p>
        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
        </p>
    </ToolLayout>
  );
}
