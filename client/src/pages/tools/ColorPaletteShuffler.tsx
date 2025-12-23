import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Palette, Copy, Shuffle } from "lucide-react";

export default function ColorPaletteShuffler() {
  const [palette, setPalette] = useState<string[]>([
    "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"
  ]);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Color Palette Shuffler | Generate Random Palettes | Pixocraft Tools",
    description: "Generate harmonious 5-color palettes instantly for design projects.",
    keywords: "palette generator, random color scheme",
    canonicalUrl: "https://tools.pixocraft.in/tools/color-palette-shuffler",
  });

  const generatePalette = () => {
    const newPalette = Array.from({ length: 5 }, () =>
      `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    );
    setPalette(newPalette);
  };

  const copyAllColors = () => {
    copyToClipboard(palette.join(', '), "Palette copied!");
  };

  return (
    <ToolLayout
      title="Color Palette Shuffler"
      description="Generate 5-color palettes instantly for your designs."
      icon={<Palette className="h-10 w-10 text-primary" />}
      toolId="color-palette-shuffler"
      category="Color & Design"
      howItWorks={[
        { step: 1, title: "Click Shuffle", description: "Generate a new 5-color palette." },
        { step: 2, title: "Preview Colors", description: "See all colors at once." },
        { step: 3, title: "Copy Palette", description: "Copy individual or all colors." },
      ]}
      benefits={[
        { icon: <Shuffle className="h-6 w-6 text-primary" />, title: "Quick Palettes", description: "Get instant color combinations." },
      ]}
      faqs={[
        { question: "How many colors in a palette?", answer: "Each palette contains 5 random colors." },
        { question: "Can I copy all colors at once?", answer: "Yes! Click 'Copy All Colors' to get all HEX codes." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Color Palette</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyAllColors} data-testid="button-copy-all">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
                <Button size="sm" onClick={generatePalette} data-testid="button-shuffle">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {palette.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full h-32 rounded-lg border-2 border-border cursor-pointer hover-elevate active-elevate-2"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color, "Color copied!")}
                    data-testid={`color-${index}`}
                  />
                  <p className="text-center font-mono text-sm font-semibold">{color}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Click any color to copy its HEX code • Click shuffle to generate a new palette
            </p>
          </CardContent>
        </Card>
          {/* Category Footer */}\n          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">\n            Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>\n          </p>
      </div>
    </ToolLayout>
  );
}
