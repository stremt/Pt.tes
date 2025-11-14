import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Square, Copy } from "lucide-react";

export default function OutlineCSSGenerator() {
  const [outlineWidth, setOutlineWidth] = useState("2");
  const [outlineStyle, setOutlineStyle] = useState("solid");
  const [outlineColor, setOutlineColor] = useState("#3b82f6");
  const [outlineOffset, setOutlineOffset] = useState("2");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Outline CSS Generator | Create Outline Styles | Pixocraft Tools",
    description: "Generate CSS outlines with width, style & offset.",
    keywords: "outline css generator, css outline tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/outline-css-generator",
  });

  const cssCode = `.element {
  outline: ${outlineWidth}px ${outlineStyle} ${outlineColor};
  outline-offset: ${outlineOffset}px;
}`;

  return (
    <ToolLayout
      title="Outline CSS Generator"
      description="Create custom CSS outlines with live preview."
      icon={<Square className="h-10 w-10 text-primary" />}
      toolId="outline-css-generator"
      category="CSS & Design"
      howItWorks={[
        { step: 1, title: "Customize Outline", description: "Set width, style, color, and offset." },
        { step: 2, title: "Preview", description: "See the outline effect in real-time." },
        { step: 3, title: "Copy CSS", description: "Use the generated CSS code." },
      ]}
      benefits={[
        { icon: <Square className="h-6 w-6 text-primary" />, title: "Outline Control", description: "Fine-tune outline properties visually." },
      ]}
      faqs={[
        { question: "What's the difference between outline and border?", answer: "Outline doesn't affect layout and can have an offset, while border is part of the box model." },
        { question: "When should I use outline?", answer: "Great for focus states, highlighting elements, and accessibility without affecting layout." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Outline Properties</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label>Width (px)</Label>
              <Input
                type="number"
                value={outlineWidth}
                onChange={(e) => setOutlineWidth(e.target.value)}
                className="mt-2"
                data-testid="input-width"
              />
            </div>
            <div>
              <Label>Offset (px)</Label>
              <Input
                type="number"
                value={outlineOffset}
                onChange={(e) => setOutlineOffset(e.target.value)}
                className="mt-2"
                data-testid="input-offset"
              />
            </div>
            <div>
              <Label>Style</Label>
              <Select value={outlineStyle} onValueChange={setOutlineStyle}>
                <SelectTrigger className="mt-2" data-testid="select-style">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">solid</SelectItem>
                  <SelectItem value="dashed">dashed</SelectItem>
                  <SelectItem value="dotted">dotted</SelectItem>
                  <SelectItem value="double">double</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Color</Label>
              <div className="flex gap-2 mt-2">
                <input
                  type="color"
                  value={outlineColor}
                  onChange={(e) => setOutlineColor(e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                  data-testid="input-color"
                />
                <Input value={outlineColor} onChange={(e) => setOutlineColor(e.target.value)} className="font-mono" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center p-12 bg-muted/50 rounded-lg">
              <div
                className="bg-background p-8 rounded"
                style={{
                  outline: `${outlineWidth}px ${outlineStyle} ${outlineColor}`,
                  outlineOffset: `${outlineOffset}px`,
                }}
                data-testid="outline-preview"
              >
                <p className="text-center font-mono">Element with Outline</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>CSS Code</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(cssCode, "CSS copied!")}
                data-testid="button-copy"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy CSS
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto font-mono text-sm" data-testid="css-code">
              {cssCode}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
