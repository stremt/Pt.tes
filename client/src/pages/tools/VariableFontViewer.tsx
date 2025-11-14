import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { Type } from "lucide-react";

export default function VariableFontViewer() {
  const [text, setText] = useState("Variable Fonts are Amazing!");
  const [weight, setWeight] = useState([400]);
  const [width, setWidth] = useState([100]);
  const [slant, setSlant] = useState([0]);

  useSEO({
    title: "Variable Font Viewer | Experiment with Font Variations | Pixocraft Tools",
    description: "Experiment with variable fonts using sliders for weight, width & italics.",
    keywords: "variable font viewer, font weight slider",
    canonicalUrl: "https://tools.pixocraft.in/tools/variable-font-viewer",
  });

  return (
    <ToolLayout
      title="Variable Font Viewer"
      description="Play with variable font settings in real-time."
      icon={<Type className="h-10 w-10 text-primary" />}
      toolId="variable-font-viewer"
      category="Typography & Fonts"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type any text to preview." },
        { step: 2, title: "Adjust Sliders", description: "Control weight, width, and slant." },
        { step: 3, title: "See Changes", description: "Watch the font transform in real-time." },
      ]}
      benefits={[
        { icon: <Type className="h-6 w-6 text-primary" />, title: "Font Exploration", description: "Discover variable font capabilities." },
      ]}
      faqs={[
        { question: "What are variable fonts?", answer: "Variable fonts allow multiple font variations in a single file, controlled by axes like weight, width, and slant." },
        { question: "Do all fonts support this?", answer: "No, only variable fonts support these adjustments. This demo uses a system variable font." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Text Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[80px]"
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Font Variations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Weight: {weight[0]}</Label>
              <Slider
                value={weight}
                onValueChange={setWeight}
                min={100}
                max={900}
                step={1}
                className="mt-2"
                data-testid="slider-weight"
              />
            </div>
            <div>
              <Label>Width: {width[0]}%</Label>
              <Slider
                value={width}
                onValueChange={setWidth}
                min={75}
                max={125}
                step={1}
                className="mt-2"
                data-testid="slider-width"
              />
            </div>
            <div>
              <Label>Slant: {slant[0]}°</Label>
              <Slider
                value={slant}
                onValueChange={setSlant}
                min={-15}
                max={15}
                step={1}
                className="mt-2"
                data-testid="slider-slant"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center p-8 bg-muted/50 rounded-lg min-h-[200px]">
              <p
                className="text-4xl text-center break-words"
                style={{
                  fontFamily: 'system-ui',
                  fontVariationSettings: `"wght" ${weight[0]}, "wdth" ${width[0]}, "slnt" ${slant[0]}`,
                }}
                data-testid="font-preview"
              >
                {text}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/30">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Note:</strong> This demo uses system fonts. For best results with variable fonts, use fonts like Inter, Recursive, or other variable font families in your projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
