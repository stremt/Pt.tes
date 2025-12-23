import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Shuffle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function CaseMixer() {
  const [inputText, setInputText] = useState<string>("");
  const [mixedText, setMixedText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Uppercase Lowercase Mixer | Random Case Text Generator",
    description: "Randomly mix uppercase and lowercase letters in your text. Fun, fast and fully offline.",
    keywords: "random case generator, mix case text, uppercase lowercase tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/case-mixer",
  });

  const handleMixCase = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter some text to mix case",
        variant: "destructive",
      });
      return;
    }

    const mixed = inputText
      .split('')
      .map(char => {
        if (!/[a-zA-Z]/.test(char)) return char;
        return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
      })
      .join('');
    
    setMixedText(mixed);
    toast({
      title: "Case Mixed!",
      description: "Your text has been randomly mixed",
    });
  };

  const copyToClipboard = async () => {
    if (!mixedText) return;
    await navigator.clipboard.writeText(mixedText);
    toast({
      title: "Copied!",
      description: "Mixed text copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter or paste your text" },
    { step: 2, title: "Mix Case", description: "Click to randomly mix uppercase and lowercase" },
    { step: 3, title: "Copy Result", description: "Copy your mixed-case text" },
  ];

  const benefits = [
    { icon: <Shuffle className="h-5 w-5" />, title: "Random Mix", description: "Each letter randomly uppercase or lowercase" },
    { icon: <Copy className="h-5 w-5" />, title: "Keep Numbers", description: "Numbers and symbols remain unchanged" },
    { icon: <Shuffle className="h-5 w-5" />, title: "Instant Results", description: "Generate mixed case text instantly" },
  ];

  const faqs = [
    {
      question: "Can I keep numbers?",
      answer: "Yes, numbers and special characters remain unchanged. Only alphabetic characters are randomly mixed.",
    },
    {
      question: "Is it truly random?",
      answer: "Yes, each letter has a 50/50 chance of being uppercase or lowercase using JavaScript's Math.random().",
    },
    {
      question: "What can I use this for?",
      answer: "Great for creating stylized text, mocking text, or creative social media posts.",
    },
  ];

  const toolContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="input-text" data-testid="label-input">Input Text</Label>
          <Textarea
            id="input-text"
            data-testid="input-text"
            placeholder="Enter text to mix case..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <Button 
          onClick={handleMixCase} 
          className="w-full" 
          data-testid="button-mix"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Mix Case
        </Button>

        {mixedText && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Mixed Case Result</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={mixedText}
              readOnly
              className="min-h-[150px]"
            />
            <Button 
              onClick={copyToClipboard} 
              variant="outline" 
              className="w-full mt-2"
              data-testid="button-copy"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Uppercase Lowercase Mixer"
      description="Randomly mix uppercase and lowercase letters in your text. Fun, fast and fully offline."
      icon={<Shuffle className="h-6 w-6" />}
      toolId="case-mixer"
      category="text"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
