import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Shuffle } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { CodePreviewCard } from "@/components/tools/CodePreviewCard";

export default function GradientGenerator() {
  useSEO({
    title: "CSS Gradient Generator | Create Beautiful Backgrounds",
    description: "Create linear & radial gradients visually and copy CSS instantly. Works offline.",
    keywords: "css gradient generator, gradient maker, background generator, linear gradient",
    canonicalUrl: "https://tools.pixocraft.in/tools/gradient-generator",
  });

  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#8B5CF6");

  const generateCSS = () => {
    if (type === "linear") {
      return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
  };

  const randomize = () => {
    const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setColor1(randomColor());
    setColor2(randomColor());
    setAngle(Math.floor(Math.random() * 360));
  };

  const gradientStyle = {
    background: type === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`,
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">CSS Gradient Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create beautiful gradients visually and copy CSS in one click. Perfect for developers & designers.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gradient Settings</CardTitle>
                <CardDescription>Customize your gradient</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Gradient Type</Label>
                  <Select value={type} onValueChange={(v) => setType(v as "linear" | "radial")}>
                    <SelectTrigger data-testid="select-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">Linear</SelectItem>
                      <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {type === "linear" && (
                  <div className="space-y-2">
                    <Label>Angle: {angle}°</Label>
                    <Slider
                      value={[angle]}
                      onValueChange={([v]) => setAngle(v)}
                      min={0}
                      max={360}
                      step={1}
                      data-testid="slider-angle"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color1">Color 1</Label>
                    <div className="flex gap-2">
                      <Input
                        id="color1"
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="h-10 w-16"
                        data-testid="input-color1"
                      />
                      <Input
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color2">Color 2</Label>
                    <div className="flex gap-2">
                      <Input
                        id="color2"
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="h-10 w-16"
                        data-testid="input-color2"
                      />
                      <Input
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        placeholder="#8B5CF6"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={randomize} variant="outline" className="w-full" data-testid="button-randomize">
                  <Shuffle className="mr-2 h-4 w-4" />
                  Randomize
                </Button>
              </CardContent>
            </Card>

            <CodePreviewCard title="CSS Code" code={generateCSS()} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See your gradient in action</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="w-full h-96 rounded-lg border-2 border-border"
                style={gradientStyle}
                data-testid="preview-gradient"
              />
            </CardContent>
          </Card>
        </div>
      </div>

    </div>

  );
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
        </p>
      </div>
    </div>
  );
}

