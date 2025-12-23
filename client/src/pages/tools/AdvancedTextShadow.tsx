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
import { Plus, Copy, Minus } from "lucide-react";

export default function AdvancedTextShadow() {
  const [text, setText] = useState("Shadow Text");
  const [offsetX, setOffsetX] = useState([2]);
  const [offsetY, setOffsetY] = useState([2]);
  const [blurRadius, setBlurRadius] = useState([4]);
  const [shadowColor, setShadowColor] = useState("#000000");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Advanced Text Shadow Generator | CSS Shadow Maker | Pixocraft Tools",
    description: "Create stunning text shadows with full control over offset, blur & color.",
    keywords: "text shadow generator, css text shadow tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/advanced-text-shadow",
  });

  const cssCode = `text-shadow: ${offsetX[0]}px ${offsetY[0]}px ${blurRadius[0]}px ${shadowColor};`;

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
      title="Advanced Text Shadow Generator"
      description="Design beautiful text shadows with live preview."
      icon={<Plus className="h-10 w-10 text-primary" />}
      toolId="advanced-text-shadow"
      category="CSS & Design"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type the text to apply shadow to." },
        { step: 2, title: "Adjust Shadow", description: "Control offset, blur, and color." },
        { step: 3, title: "Copy CSS", description: "Use the generated shadow code." },
      ]}
      benefits={[
        { icon: <Plus className="h-6 w-6 text-primary" />, title: "Full Control", description: "Fine-tune every shadow parameter." },
      ]}
      faqs={[
        { question: "Can I add multiple shadows?", answer: "The CSS property supports multiple shadows - just separate them with commas." },
        { question: "Does it work in all browsers?", answer: "Yes, text-shadow is widely supported across all modern browsers." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Shadow Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Text</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-2 text-base"
                data-testid="input-text"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Offset X: {offsetX[0]}px</Label>
                <Slider
                  value={offsetX}
                  onValueChange={setOffsetX}
                  min={-20}
                  max={20}
                  step={1}
                  className="mt-2"
                  data-testid="slider-offset-x"
                />
              </div>
              <div>
                <Label>Offset Y: {offsetY[0]}px</Label>
                <Slider
                  value={offsetY}
                  onValueChange={setOffsetY}
                  min={-20}
                  max={20}
                  step={1}
                  className="mt-2"
                  data-testid="slider-offset-y"
                />
              </div>
            </div>
            <div>
              <Label>Blur Radius: {blurRadius[0]}px</Label>
              <Slider
                value={blurRadius}
                onValueChange={setBlurRadius}
                min={0}
                max={20}
                step={1}
                className="mt-2"
                data-testid="slider-blur"
              />
            </div>
            <div>
              <Label>Shadow Color</Label>
              <div className="flex gap-2 mt-2">
                <input
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                  data-testid="input-color"
                />
                <Input value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="font-mono" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center p-12 bg-muted/50 rounded-lg">
              <h1
                className="text-6xl font-bold"
                style={{
                  textShadow: `${offsetX[0]}px ${offsetY[0]}px ${blurRadius[0]}px ${shadowColor}`,
                }}
                data-testid="text-preview"
              >
                {text}
              </h1>
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
            <pre className="p-4 bg-muted/50 rounded-lg font-mono text-sm" data-testid="css-code">
              {cssCode}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
