import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function HexRgbConverter() {
  useSEO({
    title: "HEX to RGB Converter | Convert Colors Instantly",
    description: "Convert HEX to RGB or RGB to HEX instantly. Perfect for designers and developers.",
    keywords: "hex to rgb, rgb converter, color converter online, rgb to hex",
    canonicalUrl: "https://tools.pixocraft.in/tools/hex-rgb-converter",
  });

  const [hex, setHex] = useState("#3B82F6");
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const hexToRgb = (hexValue: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.max(0, Math.min(255, x)).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setR(rgb.r);
      setG(rgb.g);
      setB(rgb.b);
    }
  };

  const handleRgbChange = (newR: number, newG: number, newB: number) => {
    setR(newR);
    setG(newG);
    setB(newB);
    setHex(rgbToHex(newR, newG, newB));
  };

  const copyHex = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    toast({ title: "Copied!", description: "HEX color copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const copyRgb = () => {
    navigator.clipboard.writeText(`rgb(${r}, ${g}, ${b})`);
    setCopied(true);
    toast({ title: "Copied!", description: "RGB color copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Color Tools", url: "/tools/color" }, { label: "Hex RGB Converter" }]} />
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">HEX to RGB Converter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert HEX to RGB or RGB to HEX with one click. Fast, accurate & offline.
          </p>
        </div>

        <div className="mb-8">
          <Card className="overflow-hidden">
            <div className="h-32" style={{ backgroundColor: hex }} />
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Current Color</p>
                <p className="text-2xl font-bold">{hex}</p>
                <p className="text-lg text-muted-foreground">rgb({r}, {g}, {b})</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  #
                </div>
                HEX Color
              </CardTitle>
              <CardDescription>Hexadecimal color format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hex">HEX Value</Label>
                <Input
                  id="hex"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#000000"
                  data-testid="input-hex"
                />
              </div>
              <Button onClick={copyHex} variant="outline" className="w-full" data-testid="button-copy-hex">
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                Copy HEX
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <ArrowRightLeft className="h-4 w-4 text-primary" />
                </div>
                RGB Color
              </CardTitle>
              <CardDescription>Red, Green, Blue values (0-255)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="r">R</Label>
                  <Input
                    id="r"
                    type="number"
                    min="0"
                    max="255"
                    value={r}
                    onChange={(e) => handleRgbChange(parseInt(e.target.value) || 0, g, b)}
                    data-testid="input-r"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="g">G</Label>
                  <Input
                    id="g"
                    type="number"
                    min="0"
                    max="255"
                    value={g}
                    onChange={(e) => handleRgbChange(r, parseInt(e.target.value) || 0, b)}
                    data-testid="input-g"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="b">B</Label>
                  <Input
                    id="b"
                    type="number"
                    min="0"
                    max="255"
                    value={b}
                    onChange={(e) => handleRgbChange(r, g, parseInt(e.target.value) || 0)}
                    data-testid="input-b"
                  />
                </div>
              </div>
              <Button onClick={copyRgb} variant="outline" className="w-full" data-testid="button-copy-rgb">
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                Copy RGB
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Color Conversion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is HEX?</h3>
              <p className="text-muted-foreground">
                HEX colors use a 6-digit hexadecimal code (#RRGGBB) commonly used in web design and CSS.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What is RGB?</h3>
              <p className="text-muted-foreground">
                RGB represents colors using Red, Green, and Blue values from 0 to 255, used in programming and design software.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Instant Conversion</h3>
              <p className="text-muted-foreground">
                Change values in either format and see instant conversion. All processing happens offline in your browser.
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
