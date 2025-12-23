import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Pipette, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function HexColorPickerTool() {
  const [color, setColor] = useState("#3b82f6");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Hex Color Picker | Choose & Copy Colors Instantly | Pixocraft Tools",
    description: "Pick any color and copy HEX, RGB instantly. Perfect for designers & developers.",
    keywords: "hex color picker, color tool, color selector",
    canonicalUrl: "https://tools.pixocraft.in/tools/hex-color-picker-tool",
  });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : null;
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: `${format} copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const howItWorks = [
    { step: 1, title: "Pick Color", description: "Use color picker to select any color" },
    { step: 2, title: "View Codes", description: "See HEX & RGB values instantly" },
    { step: 3, title: "Copy & Use", description: "Copy to clipboard in your preferred format" },
  ];

  const benefits = [
    { icon: <Pipette className="h-5 w-5" />, title: "HEX + RGB", description: "Both formats shown instantly" },
    { icon: <Pipette className="h-5 w-5" />, title: "Designer Friendly", description: "Perfect for web & graphic design" },
    { icon: <Pipette className="h-5 w-5" />, title: "Copy Instantly", description: "One-click copy to clipboard" },
    { icon: <Pipette className="h-5 w-5" />, title: "100% Free", description: "No signup required" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it show RGB also?",
      answer: "Yes — HEX + RGB both. You can see and copy color values in both hexadecimal (#RRGGBB) and RGB (red, green, blue) formats instantly."
    },
    {
      question: "Can I enter custom HEX values?",
      answer: "Yes! You can type any HEX code directly or use the color picker. The RGB value updates automatically."
    },
    {
      question: "Is this tool free?",
      answer: "Absolutely! Our hex color picker is 100% free with no registration, ads, or limitations. Use it as much as you need."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  const rgb = hexToRgb(color);

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Hex Color Picker"
        description="Pick a color → copy HEX/RGB → use in your design or code."
        icon={<Pipette className="h-8 w-8" />}
        toolId="hex-color-picker-tool"
        category="design"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Hex Color Picker</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-center">
                <div
                  className="w-full h-64 rounded-lg border-4 border-muted cursor-pointer"
                  style={{ backgroundColor: color }}
                  data-testid="color-preview"
                />
              </div>

              <div className="space-y-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-16 cursor-pointer"
                  data-testid="input-color-picker"
                />
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={color.toUpperCase()}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#000000"
                    data-testid="input-hex"
                  />
                  <Button
                    onClick={() => copyToClipboard(color.toUpperCase(), "HEX")}
                    size="icon"
                    variant="outline"
                    data-testid="button-copy-hex"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>

                {rgb && (
                  <div className="flex gap-2">
                    <Input
                      value={rgb}
                      readOnly
                      data-testid="input-rgb"
                    />
                    <Button
                      onClick={() => copyToClipboard(rgb, "RGB")}
                      size="icon"
                      variant="outline"
                      data-testid="button-copy-rgb"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
            </p>
      {/* Category Footer */}
      <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
        Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
      </p>
    </ToolLayout>
    </>
  );
}
