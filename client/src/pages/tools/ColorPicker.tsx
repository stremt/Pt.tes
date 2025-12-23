import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { hexToRgb, rgbToHsl, rgbToHex } from "@/lib/random-utils";
import { Palette, Copy, Sparkles, Zap, Lock, Globe } from "lucide-react";

export default function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "Color Picker | HEX, RGB & HSL Color Tool | Pixocraft Tools",
    description: "Free online color picker. Select colors and get HEX, RGB, and HSL values instantly. Perfect for designers and developers.",
    keywords: "color picker, hex color, rgb color, hsl color, color converter, color tool, design tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/color-picker",
  });

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const colorFormats = [
    { label: "HEX", value: color.toUpperCase(), description: "Hexadecimal" },
    { label: "RGB", value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "N/A", description: "Red, Green, Blue" },
    { label: "HSL", value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "N/A", description: "Hue, Saturation, Lightness" },
  ];

  const presetColors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
    "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
    "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#000000",
    "#6b7280", "#ffffff",
  ];

  return (
    <ToolLayout
      title="Color Picker"
      description="Select colors and instantly get HEX, RGB, and HSL values. Perfect for web design, development, and creative projects."
      icon={<Palette className="h-10 w-10 text-primary" />}
      toolId="color-picker"
      category="Design Tool"
      howItWorks={[
        { step: 1, title: "Pick Color", description: "Use the color picker or choose from presets." },
        { step: 2, title: "View Formats", description: "See HEX, RGB, and HSL values instantly." },
        { step: 3, title: "Copy & Use", description: "Click any format to copy it to your clipboard." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Conversion", description: "Get HEX, RGB, and HSL values in real-time." },
        { icon: <Palette className="h-6 w-6 text-primary" />, title: "Visual Preview", description: "See your selected color with a large preview area." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "No Data Sent", description: "Everything runs in your browser. Completely private." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Free to Use", description: "No limits, no signup required, always free." },
      ]}
      faqs={[
        { question: "What's the difference between HEX, RGB, and HSL?", answer: "HEX uses hexadecimal notation (#RRGGBB), RGB uses decimal values for red, green, and blue (0-255), and HSL describes color using hue (0-360°), saturation (0-100%), and lightness (0-100%)." },
        { question: "Which color format should I use?", answer: "HEX is most common in web design and CSS. RGB is useful for programmatic color manipulation. HSL is great for creating color variations since you can easily adjust hue, saturation, or lightness." },
        { question: "Can I enter a color manually?", answer: "Yes! You can type a HEX color code directly into the color input or use the color picker to select visually." },
        { question: "How do I use these colors in CSS?", answer: "Copy any format and paste it into your CSS. For example: color: #3b82f6; or background-color: rgb(59, 130, 246); or border-color: hsl(217, 91%, 60%);" },
        { question: "What are the preset colors?", answer: "These are popular colors from modern design systems, including primary colors, grays, and commonly used accent colors for quick selection." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Color Preview & Picker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Large Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Color Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="w-full h-64 rounded-lg border-4 border-border transition-colors"
                style={{ backgroundColor: color }}
                data-testid="preview-color"
              />
            </CardContent>
          </Card>

          {/* Picker Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Select Color</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="color-picker">Color Picker</Label>
                <div className="flex gap-4 items-center">
                  <input
                    id="color-picker"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-16 w-24 cursor-pointer rounded-lg border-2 border-border"
                    data-testid="input-color-picker"
                  />
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={color.toUpperCase()}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                          setColor(value);
                        }
                      }}
                      placeholder="#000000"
                      className="font-mono"
                      data-testid="input-hex-manual"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preset Colors</Label>
                <div className="grid grid-cols-10 gap-2">
                  {presetColors.map((presetColor) => (
                    <button
                      key={presetColor}
                      onClick={() => setColor(presetColor)}
                      className="h-8 w-8 rounded-md border-2 border-border hover-elevate transition-all"
                      style={{ backgroundColor: presetColor }}
                      data-testid={`button-preset-${presetColor}`}
                      aria-label={`Select color ${presetColor}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Color Formats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {colorFormats.map((format) => (
            <Card
              key={format.label}
              className="hover-elevate cursor-pointer transition-all"
              onClick={() => copyToClipboard(format.value, `${format.label} copied!`)}
              data-testid={`card-format-${format.label.toLowerCase()}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{format.label}</Badge>
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg font-mono font-semibold break-all" data-testid={`text-${format.label.toLowerCase()}`}>
                  {format.value}
                </p>
                <p className="text-xs text-muted-foreground">{format.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* RGB Individual Values */}
        {rgb && (
          <Card>
            <CardHeader>
              <CardTitle>RGB Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <Label className="text-xs text-muted-foreground">Red</Label>
                  <div className="text-3xl font-bold text-red-500">{rgb.r}</div>
                </div>
                <div className="text-center space-y-2">
                  <Label className="text-xs text-muted-foreground">Green</Label>
                  <div className="text-3xl font-bold text-green-500">{rgb.g}</div>
                </div>
                <div className="text-center space-y-2">
                  <Label className="text-xs text-muted-foreground">Blue</Label>
                  <div className="text-3xl font-bold text-blue-500">{rgb.b}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Box */}
        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Quick Tip</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Click on any color format card (HEX, RGB, or HSL) to instantly copy it to your clipboard. Use preset colors for quick selection, or enter a specific HEX code manually for precise color matching.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </ToolLayout>
  );
}
