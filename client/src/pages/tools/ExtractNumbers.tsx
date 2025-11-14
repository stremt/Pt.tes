import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Hash, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ExtractNumbers() {
  const [inputText, setInputText] = useState<string>("");
  const [extractedNumbers, setExtractedNumbers] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Extract Numbers | Pull All Digits from Text",
    description: "Extract all numbers from a block of text using static JS.",
    keywords: "extract numbers, pull digits text",
    canonicalUrl: "https://tools.pixocraft.in/tools/extract-numbers",
  });

  const extractNumbers = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter some text to extract numbers from",
        variant: "destructive",
      });
      return;
    }

    const numbers = inputText.match(/\d+/g);
    const result = numbers ? numbers.join(", ") : "No numbers found";
    setExtractedNumbers(result);
    
    toast({
      title: "Extracted!",
      description: `Found ${numbers?.length || 0} numbers`,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(extractedNumbers);
    toast({
      title: "Copied!",
      description: "Extracted numbers copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter text containing numbers" },
    { step: 2, title: "Extract", description: "Click extract to pull out all numbers" },
    { step: 3, title: "Copy", description: "Copy the extracted numbers" },
  ];

  const benefits = [
    { icon: <Hash className="h-5 w-5" />, title: "Fast Extraction", description: "Extract all numbers instantly" },
    { icon: <Copy className="h-5 w-5" />, title: "Comma Separated", description: "Get numbers in a clean, comma-separated list" },
    { icon: <Hash className="h-5 w-5" />, title: "Offline", description: "Works completely offline in your browser" },
  ];

  const faqs = [
    {
      question: "What formats are supported?",
      answer: "The tool extracts all integer sequences from text, including multi-digit numbers.",
    },
    {
      question: "Can it extract decimal numbers?",
      answer: "Currently, it extracts integer sequences. Decimals will be split at the decimal point.",
    },
    {
      question: "What if there are no numbers?",
      answer: "The tool will display 'No numbers found' if your text contains no digits.",
    },
  ];

  return (
    <ToolLayout
      title="Extract Numbers"
      description="Extract all numbers from a block of text using static JS."
      icon={<Hash className="h-8 w-8" />}
      toolId="extract-numbers"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-text" className="text-base font-semibold">
              Input Text
            </Label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text with numbers... e.g., I have 25 apples and 100 oranges"
              className="min-h-[150px]"
              data-testid="textarea-input"
            />
          </div>

          <Button
            onClick={extractNumbers}
            size="lg"
            disabled={!inputText}
            data-testid="button-extract"
          >
            <Hash className="mr-2 h-5 w-5" />
            Extract Numbers
          </Button>
        </div>

        {extractedNumbers && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Extracted Numbers
              </Label>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                data-testid="button-copy"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea
              value={extractedNumbers}
              readOnly
              className="min-h-[100px]"
              data-testid="textarea-output"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
