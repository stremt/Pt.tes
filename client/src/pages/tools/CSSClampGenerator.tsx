import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Ruler, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export default function CSSClampGenerator() {
  const [minSize, setMinSize] = useState<string>("16");
  const [preferredSize, setPreferredSize] = useState<string>("2vw");
  const [maxSize, setMaxSize] = useState<string>("24");
  const [clampValue, setClampValue] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "CSS Clamp Generator | Fluid Typography Clamp Tool",
    description: "Generate CSS clamp() values for fluid responsive text.",
    keywords: "css clamp generator, fluid text css",
    canonicalUrl: "https://tools.pixocraft.in/tools/css-clamp-generator",
  });

  const generateClamp = () => {
    const minUnit = minSize.includes("px") ? minSize : `${minSize}px`;
    const maxUnit = maxSize.includes("px") ? maxSize : `${maxSize}px`;
    const clamp = `clamp(${minUnit}, ${preferredSize}, ${maxUnit})`;
    setClampValue(clamp);
    
    toast({
      title: "Generated!",
      description: "CSS clamp() value generated successfully",
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(clampValue);
    toast({
      title: "Copied!",
      description: "Clamp value copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Set Min Size", description: "Enter minimum font size (e.g., 16px)" },
    { step: 2, title: "Set Preferred", description: "Enter preferred responsive value (e.g., 2vw)" },
    { step: 3, title: "Set Max Size", description: "Enter maximum font size (e.g., 24px)" },
  ];

  const benefits = [
    { icon: <Ruler className="h-5 w-5" />, title: "Fluid Typography", description: "Create responsive text that scales smoothly" },
    { icon: <Copy className="h-5 w-5" />, title: "Copy CSS", description: "Copy the generated clamp() code instantly" },
    { icon: <Ruler className="h-5 w-5" />, title: "Live Preview", description: "See how the text size will look" },
  ];

  const faqs = [
    {
      question: "What is CSS clamp()?",
      answer: "CSS clamp() is a function that creates fluid, responsive values between a minimum and maximum size, with a preferred value in between.",
    },
    {
      question: "What units can I use?",
      answer: "You can use px, rem, em for min/max, and vw, vh, % for the preferred value to create responsive scaling.",
    },
    {
      question: "Where should I use clamp()?",
      answer: "Use clamp() for font-size, padding, margins, or any CSS property where you want fluid, responsive values.",
    },
  ];

  return (
    <ToolLayout
      title="CSS Clamp Generator"
      description="Generate CSS clamp() values for fluid responsive text."
      icon={<Ruler className="h-8 w-8" />}
      toolId="css-clamp-generator"
      category="generator"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-size" className="text-base font-semibold">
              Min Size
            </Label>
            <Input
              id="min-size"
              value={minSize}
              onChange={(e) => setMinSize(e.target.value)}
              placeholder="16px"
              data-testid="input-min-size"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred-size" className="text-base font-semibold">
              Preferred (Responsive)
            </Label>
            <Input
              id="preferred-size"
              value={preferredSize}
              onChange={(e) => setPreferredSize(e.target.value)}
              placeholder="2vw"
              data-testid="input-preferred-size"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-size" className="text-base font-semibold">
              Max Size
            </Label>
            <Input
              id="max-size"
              value={maxSize}
              onChange={(e) => setMaxSize(e.target.value)}
              placeholder="24px"
              data-testid="input-max-size"
            />
          </div>
        </div>

        <Button
          onClick={generateClamp}
          size="lg"
          data-testid="button-generate"
        >
          <Ruler className="mr-2 h-5 w-5" />
          Generate Clamp
        </Button>

        {clampValue && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Generated CSS</Label>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                data-testid="button-copy"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm font-mono" data-testid="code-output">
                font-size: {clampValue};
              </code>
            </div>
            <div className="border-t pt-4">
              <Label className="text-sm font-semibold mb-2 block">Preview</Label>
              <p style={{ fontSize: clampValue }} data-testid="preview-text">
                This text uses the generated clamp() value
              </p>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
