import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useSEO, StructuredData } from "@/lib/seo";
import { CodePreviewCard } from "@/components/tools/CodePreviewCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", "position": 4, "name": "Box Shadow Generator", "item": "https://tools.pixocraft.in/tools/box-shadow-generator" }
  ]
});

export default function BoxShadowGenerator() {
  useSEO({
    title: "CSS Box Shadow Generator | Visual Shadow Maker",
    description: "Design box shadows visually and copy CSS instantly. No ads, no login, fully offline.",
    keywords: "css shadow generator, box shadow maker, shadow css tool, box shadow css",
    canonicalUrl: "https://tools.pixocraft.in/tools/box-shadow-generator",
  });

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(4);
  const [blur, setBlur] = useState(6);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);

  const rgbaColor = () => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  const generateCSS = () => {
    return `box-shadow: ${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgbaColor()};`;
  };

  const shadowStyle = {
    boxShadow: `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgbaColor()}`,
  };

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Developer Tools", url: "/tools/developer" }, { label: "Box Shadow Generator" }]} />
      </div>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Box Shadow Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Customize shadows visually and copy CSS instantly. Perfect for modern UI design.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shadow Settings</CardTitle>
                <CardDescription>Adjust shadow properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Horizontal Offset: {offsetX}px</Label>
                  <Slider
                    value={[offsetX]}
                    onValueChange={([v]) => setOffsetX(v)}
                    min={-50}
                    max={50}
                    step={1}
                    data-testid="slider-offsetx"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Vertical Offset: {offsetY}px</Label>
                  <Slider
                    value={[offsetY]}
                    onValueChange={([v]) => setOffsetY(v)}
                    min={-50}
                    max={50}
                    step={1}
                    data-testid="slider-offsety"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Blur Radius: {blur}px</Label>
                  <Slider
                    value={[blur]}
                    onValueChange={([v]) => setBlur(v)}
                    min={0}
                    max={100}
                    step={1}
                    data-testid="slider-blur"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Spread Radius: {spread}px</Label>
                  <Slider
                    value={[spread]}
                    onValueChange={([v]) => setSpread(v)}
                    min={-50}
                    max={50}
                    step={1}
                    data-testid="slider-spread"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Shadow Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="h-10 w-16"
                      data-testid="input-color"
                    />
                    <Input
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Opacity: {opacity}%</Label>
                  <Slider
                    value={[opacity]}
                    onValueChange={([v]) => setOpacity(v)}
                    min={0}
                    max={100}
                    step={1}
                    data-testid="slider-opacity"
                  />
                </div>
              </CardContent>
            </Card>

            <CodePreviewCard title="CSS Code" code={generateCSS()} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See your shadow in action</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-12">
              <div
                className="w-64 h-64 bg-background rounded-lg border"
                style={shadowStyle}
                data-testid="preview-shadow"
              />
            </CardContent>
          </Card>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t"><Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link></p>
      </div>
      </div>
    </>
  );
}
