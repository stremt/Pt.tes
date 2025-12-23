import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useSEO, StructuredData } from "@/lib/seo";
import { CodePreviewCard } from "@/components/tools/CodePreviewCard";
import { Link } from "wouter";
import { ToolLayout } from "@/components/layout/ToolLayout";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", "position": 4, "name": "Border Radius Generator", "item": "https://tools.pixocraft.in/tools/border-radius-generator" }
  ]
});

export default function BorderRadiusGenerator() {
  useSEO({
    title: "Border Radius Generator | CSS Curve Maker",
    description: "Create smooth border radius shapes visually & copy CSS with one click.",
    keywords: "border radius generator, css curve tool, radius editor, rounded corners",
    canonicalUrl: "https://tools.pixocraft.in/tools/border-radius-generator",
  });

  const [topLeft, setTopLeft] = useState(20);
  const [topRight, setTopRight] = useState(20);
  const [bottomRight, setBottomRight] = useState(20);
  const [bottomLeft, setBottomLeft] = useState(20);

  const generateCSS = () => {
    return `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;
  };

  const borderStyle = {
    borderRadius: `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`,
  };

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <ToolLayout
        title="Border Radius Generator"
        description="Create rounded corners visually and copy CSS instantly. Offline & beginner friendly."
        icon={<span className="h-10 w-10 text-primary">⬚</span>}
        toolId="border-radius-generator"
        category="developer"
        howItWorks={[
          { step: 1, title: "Adjust Corners", description: "Set radius for each corner independently" },
          { step: 2, title: "See Preview", description: "Watch the border-radius update in real-time" },
          { step: 3, title: "Copy CSS", description: "Copy the CSS code with one click" },
        ]}
        benefits={[
          { icon: <span className="h-6 w-6">⚡</span>, title: "Real-Time Preview", description: "See changes instantly" },
          { icon: <span className="h-6 w-6">🔒</span>, title: "100% Offline", description: "Works completely offline" },
          { icon: <span className="h-6 w-6">📋</span>, title: "Easy Copy", description: "Copy CSS with one click" },
        ]}
        faqs={[
          { question: "What is border-radius?", answer: "Border-radius creates rounded corners on HTML elements." },
          { question: "Can I use percentages?", answer: "Yes, you can use pixels or percentages for border-radius values." },
          { question: "Does it work on images?", answer: "Yes, border-radius works on images and all other elements." },
        ]}
      >
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Border Radius Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create rounded corners visually and copy CSS instantly. Offline & beginner friendly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Border Radius Settings</CardTitle>
                <CardDescription>Adjust each corner independently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Top Left: {topLeft}px</Label>
                  <Slider
                    value={[topLeft]}
                    onValueChange={([v]) => setTopLeft(v)}
                    min={0}
                    max={200}
                    step={1}
                    data-testid="slider-topleft"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Top Right: {topRight}px</Label>
                  <Slider
                    value={[topRight]}
                    onValueChange={([v]) => setTopRight(v)}
                    min={0}
                    max={200}
                    step={1}
                    data-testid="slider-topright"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bottom Right: {bottomRight}px</Label>
                  <Slider
                    value={[bottomRight]}
                    onValueChange={([v]) => setBottomRight(v)}
                    min={0}
                    max={200}
                    step={1}
                    data-testid="slider-bottomright"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bottom Left: {bottomLeft}px</Label>
                  <Slider
                    value={[bottomLeft]}
                    onValueChange={([v]) => setBottomLeft(v)}
                    min={0}
                    max={200}
                    step={1}
                    data-testid="slider-bottomleft"
                  />
                </div>
              </CardContent>
            </Card>

            <CodePreviewCard title="CSS Code" code={generateCSS()} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See your border radius in action</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-12">
              <div
                className="w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary"
                style={borderStyle}
                data-testid="preview-border"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Border Radius</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is Border Radius?</h3>
              <p className="text-muted-foreground">
                Border radius creates rounded corners on HTML elements. Each corner can be customized independently.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Common Use Cases</h3>
              <p className="text-muted-foreground">
                Perfect for buttons, cards, images, modals, and any UI element that needs smooth, rounded corners.
              </p>
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t"><Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link></p>
      </div>
      </div>
    </>
  );
}
