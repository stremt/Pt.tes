import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle, Copy, Check } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";

export default function ColorPaletteGenerator() {
  useSEO({
    title: "Color Palette Generator | Random & Custom Palettes",
    description: "Generate beautiful color palettes instantly. Stunning random colors, hex codes & offline support.",
    keywords: "color palette generator, color theme maker, random colors, palette creator",
    canonicalUrl: "https://tools.pixocraft.in/tools/color-palette-generator",
  });

  const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  };

  const generatePalette = () => {
    return Array.from({ length: 5 }, () => generateRandomColor());
  };

  const [palette, setPalette] = useState<string[]>(generatePalette());
  const [copied, setCopied] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    setPalette(generatePalette());
  };

  const copyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopied(index);
    toast({ title: "Copied!", description: `${color} copied to clipboard` });
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(palette.join(", "));
    toast({ title: "Copied!", description: "All colors copied to clipboard" });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Image Tools", url: "/tools/image" }, { label: "ColorPaletteGenerator" }]} />
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Color Palette Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate stunning color palettes instantly. Perfect for UI/UX designers, artists & creators.
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <Button onClick={handleGenerate} size="lg" data-testid="button-generate">
            <Shuffle className="mr-2 h-5 w-5" />
            Generate New Palette
          </Button>
          <Button onClick={copyAll} variant="outline" size="lg" data-testid="button-copy-all">
            <Copy className="mr-2 h-5 w-5" />
            Copy All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {palette.map((color, index) => (
            <Card
              key={index}
              className="hover-elevate active-elevate-2 overflow-hidden cursor-pointer transition-all"
              onClick={() => copyColor(color, index)}
              data-testid={`card-color-${index}`}
            >
              <div className="h-48" style={{ backgroundColor: color }} />
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <p className="font-mono font-semibold">{color}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyColor(color, index);
                    }}
                    data-testid={`button-copy-${index}`}
                  >
                    {copied === index ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied === index ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Generate Palettes</h3>
              <p className="text-muted-foreground">
                Click "Generate New Palette" to create a fresh set of 5 random colors that work well together.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Copy Colors</h3>
              <p className="text-muted-foreground">
                Click any color card or the copy button to copy its HEX code to your clipboard.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Use in Your Projects</h3>
              <p className="text-muted-foreground">
                Perfect for web design, UI/UX projects, branding, digital art, and any creative work requiring color schemes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>

  );
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
        </p>
}
