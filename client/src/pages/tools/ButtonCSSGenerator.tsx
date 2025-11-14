import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { RectangleHorizontal, Copy } from "lucide-react";

export default function ButtonCSSGenerator() {
  const [buttonText, setButtonText] = useState("Click Me");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [borderRadius, setBorderRadius] = useState([8]);
  const [padding, setPadding] = useState([12]);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "CSS Button Generator | Create Custom Buttons | Pixocraft Tools",
    description: "Design modern CSS buttons with hover + shadow + radius.",
    keywords: "css button generator, button maker tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/button-css-generator",
  });

  const cssCode = `.custom-button {
  background-color: ${bgColor};
  color: ${textColor};
  border: none;
  border-radius: ${borderRadius[0]}px;
  padding: ${padding[0]}px ${padding[0] * 2}px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-button:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}`;

  return (
    <ToolLayout
      title="CSS Button Generator"
      description="Design beautiful CSS buttons visually."
      icon={<RectangleHorizontal className="h-10 w-10 text-primary" />}
      toolId="button-css-generator"
      category="CSS & Design"
      howItWorks={[
        { step: 1, title: "Customize Button", description: "Adjust colors, border radius, and padding." },
        { step: 2, title: "See Preview", description: "View your button in real-time." },
        { step: 3, title: "Copy CSS", description: "Use the generated code in your project." },
      ]}
      benefits={[
        { icon: <RectangleHorizontal className="h-6 w-6 text-primary" />, title: "Visual Editor", description: "Design buttons without coding." },
      ]}
      faqs={[
        { question: "Can I customize hover effects?", answer: "Yes, the generated CSS includes a hover effect with brightness and transform." },
        { question: "Is the code production-ready?", answer: "Yes! Copy and paste directly into your CSS file." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Button Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Button Text</Label>
              <Input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="mt-2"
                data-testid="input-text"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Background Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-20 rounded cursor-pointer"
                    data-testid="input-bg-color"
                  />
                  <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="font-mono" />
                </div>
              </div>
              <div>
                <Label>Text Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-10 w-20 rounded cursor-pointer"
                    data-testid="input-text-color"
                  />
                  <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} className="font-mono" />
                </div>
              </div>
            </div>
            <div>
              <Label>Border Radius: {borderRadius[0]}px</Label>
              <Slider
                value={borderRadius}
                onValueChange={setBorderRadius}
                min={0}
                max={50}
                step={1}
                className="mt-2"
                data-testid="slider-radius"
              />
            </div>
            <div>
              <Label>Padding: {padding[0]}px</Label>
              <Slider
                value={padding}
                onValueChange={setPadding}
                min={4}
                max={32}
                step={2}
                className="mt-2"
                data-testid="slider-padding"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center p-8 bg-muted/50 rounded-lg">
              <button
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  border: 'none',
                  borderRadius: `${borderRadius[0]}px`,
                  padding: `${padding[0]}px ${padding[0] * 2}px`,
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                data-testid="button-preview"
              >
                {buttonText}
              </button>
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
