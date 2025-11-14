import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Sparkles, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export default function CSSAnimationGenerator() {
  const [animationName, setAnimationName] = useState<string>("myAnimation");
  const [duration, setDuration] = useState<string>("1");
  const [timingFunction, setTimingFunction] = useState<string>("ease");
  const [iterationCount, setIterationCount] = useState<string>("infinite");
  const [cssCode, setCssCode] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "CSS Animation Generator | Keyframe Creator",
    description: "Create CSS animations visually and copy keyframe CSS instantly.",
    keywords: "css animation generator, keyframe tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/css-animation-generator",
  });

  const generateCSS = () => {
    const css = `@keyframes ${animationName} {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100px);
    opacity: 0;
  }
}

.animated-element {
  animation: ${animationName} ${duration}s ${timingFunction} ${iterationCount};
}`;
    
    setCssCode(css);
    toast({
      title: "Generated!",
      description: "CSS animation code generated successfully",
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(cssCode);
    toast({
      title: "Copied!",
      description: "CSS code copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Set Name", description: "Choose a name for your animation" },
    { step: 2, title: "Configure", description: "Set duration, timing function, and iteration count" },
    { step: 3, title: "Generate", description: "Click generate to create the CSS keyframe code" },
  ];

  const benefits = [
    { icon: <Sparkles className="h-5 w-5" />, title: "Visual Creator", description: "Generate animations with simple controls" },
    { icon: <Copy className="h-5 w-5" />, title: "Copy Code", description: "Copy ready-to-use CSS instantly" },
    { icon: <Sparkles className="h-5 w-5" />, title: "Live Preview", description: "See the animation in action" },
  ];

  const faqs = [
    {
      question: "What are CSS keyframes?",
      answer: "CSS keyframes define the intermediate steps in an animation sequence, allowing you to create complex animations.",
    },
    {
      question: "Can I customize the keyframes?",
      answer: "Yes, after generating the basic animation, you can edit the keyframe percentages and properties to customize the animation.",
    },
    {
      question: "What timing functions are available?",
      answer: "Common timing functions include ease, linear, ease-in, ease-out, and ease-in-out. Each creates a different animation feel.",
    },
  ];

  return (
    <ToolLayout
      title="CSS Animation Generator"
      description="Create CSS animations visually and copy keyframe CSS instantly."
      icon={<Sparkles className="h-8 w-8" />}
      toolId="css-animation-generator"
      category="generator"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="animation-name" className="text-base font-semibold">
              Animation Name
            </Label>
            <Input
              id="animation-name"
              value={animationName}
              onChange={(e) => setAnimationName(e.target.value)}
              placeholder="myAnimation"
              data-testid="input-animation-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-base font-semibold">
              Duration (seconds)
            </Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="1"
              data-testid="input-duration"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timing-function" className="text-base font-semibold">
              Timing Function
            </Label>
            <Select value={timingFunction} onValueChange={setTimingFunction}>
              <SelectTrigger data-testid="select-timing-function">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ease">Ease</SelectItem>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="ease-in">Ease In</SelectItem>
                <SelectItem value="ease-out">Ease Out</SelectItem>
                <SelectItem value="ease-in-out">Ease In Out</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="iteration-count" className="text-base font-semibold">
              Iteration Count
            </Label>
            <Select value={iterationCount} onValueChange={setIterationCount}>
              <SelectTrigger data-testid="select-iteration-count">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="infinite">Infinite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={generateCSS}
          size="lg"
          data-testid="button-generate"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Generate CSS Animation
        </Button>

        {cssCode && (
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
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono" data-testid="code-output">
                {cssCode}
              </pre>
            </div>
            <div className="border-t pt-4">
              <Label className="text-sm font-semibold mb-4 block">Preview</Label>
              <div className="flex items-center justify-center h-32 bg-muted/30 rounded-lg overflow-hidden">
                <div
                  className="w-16 h-16 bg-primary rounded-lg"
                  style={{
                    animation: `${animationName} ${duration}s ${timingFunction} ${iterationCount}`,
                  }}
                  data-testid="preview-animation"
                />
              </div>
            </div>
          </Card>
        )}
        
        <style>{cssCode}</style>
      </div>
    </ToolLayout>
  );
}
