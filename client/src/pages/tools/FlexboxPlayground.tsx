import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Box, Copy } from "lucide-react";

export default function FlexboxPlayground() {
  const [flexDirection, setFlexDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("flex-start");
  const [gap, setGap] = useState("8");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Flexbox Playground | CSS Flexbox Generator | Pixocraft Tools",
    description: "Play with Flexbox properties visually. Copy CSS instantly.",
    keywords: "flexbox generator, css flex tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/flexbox-playground",
  });

  const cssCode = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  gap: ${gap}px;
}`;

  return (
    <ToolLayout
      title="Flexbox Playground"
      description="Experiment with flexbox properties visually."
      icon={<Box className="h-10 w-10 text-primary" />}
      toolId="flexbox-playground"
      category="CSS & Design"
      howItWorks={[
        { step: 1, title: "Adjust Properties", description: "Select flex direction, justify, and align options." },
        { step: 2, title: "See Preview", description: "View the flexbox layout in real-time." },
        { step: 3, title: "Copy CSS", description: "Use the generated CSS in your project." },
      ]}
      benefits={[
        { icon: <Box className="h-6 w-6 text-primary" />, title: "Visual Learning", description: "Understand flexbox by seeing changes instantly." },
      ]}
      faqs={[
        { question: "What is Flexbox?", answer: "Flexbox is a CSS layout model that makes it easy to align and distribute space among items in a container." },
        { question: "Can I use this in production?", answer: "Yes! The generated CSS is production-ready." },
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Flexbox Properties</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label>Flex Direction</Label>
              <Select value={flexDirection} onValueChange={setFlexDirection}>
                <SelectTrigger className="mt-2" data-testid="select-flex-direction">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">row</SelectItem>
                  <SelectItem value="row-reverse">row-reverse</SelectItem>
                  <SelectItem value="column">column</SelectItem>
                  <SelectItem value="column-reverse">column-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Justify Content</Label>
              <Select value={justifyContent} onValueChange={setJustifyContent}>
                <SelectTrigger className="mt-2" data-testid="select-justify">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="space-between">space-between</SelectItem>
                  <SelectItem value="space-around">space-around</SelectItem>
                  <SelectItem value="space-evenly">space-evenly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Align Items</Label>
              <Select value={alignItems} onValueChange={setAlignItems}>
                <SelectTrigger className="mt-2" data-testid="select-align">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="stretch">stretch</SelectItem>
                  <SelectItem value="baseline">baseline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Gap</Label>
              <Select value={gap} onValueChange={setGap}>
                <SelectTrigger className="mt-2" data-testid="select-gap">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0px</SelectItem>
                  <SelectItem value="4">4px</SelectItem>
                  <SelectItem value="8">8px</SelectItem>
                  <SelectItem value="12">12px</SelectItem>
                  <SelectItem value="16">16px</SelectItem>
                  <SelectItem value="24">24px</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              style={{
                display: 'flex',
                flexDirection: flexDirection as any,
                justifyContent,
                alignItems,
                gap: `${gap}px`,
                minHeight: '200px',
                border: '2px dashed hsl(var(--border))',
                padding: '16px',
                borderRadius: '8px',
              }}
              data-testid="flexbox-preview"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-primary/20 border-2 border-primary rounded px-6 py-4 font-mono"
                >
                  Item {i}
                </div>
              ))}
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
