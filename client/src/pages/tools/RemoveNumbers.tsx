import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Eraser, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function RemoveNumbers() {
  const [inputText, setInputText] = useState<string>("");
  const [cleanedText, setCleanedText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Remove Numbers | Clean Digits from Text",
    description: "Remove all numbers (0-9) from text instantly.",
    keywords: "remove numbers, clean digits text",
    canonicalUrl: "https://tools.pixocraft.in/tools/remove-numbers",
  });

  const removeNumbers = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter some text to remove numbers from",
        variant: "destructive",
      });
      return;
    }

    const cleaned = inputText.replace(/\d/g, "");
    setCleanedText(cleaned);
    
    const numbersRemoved = inputText.length - cleaned.length;
    toast({
      title: "Removed!",
      description: `Removed ${numbersRemoved} digits`,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(cleanedText);
    toast({
      title: "Copied!",
      description: "Cleaned text copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter text containing numbers" },
    { step: 2, title: "Remove", description: "Click remove to delete all digits" },
    { step: 3, title: "Copy", description: "Copy the cleaned text" },
  ];

  const benefits = [
    { icon: <Eraser className="h-5 w-5" />, title: "Clean Text", description: "Remove all digits 0-9 from your text" },
    { icon: <Copy className="h-5 w-5" />, title: "Instant", description: "Process text instantly in your browser" },
    { icon: <Eraser className="h-5 w-5" />, title: "Offline", description: "Works completely offline" },
  ];

  const faqs = [
    {
      question: "What gets removed?",
      answer: "All individual digits (0-9) are removed from the text while preserving letters and other characters.",
    },
    {
      question: "Are spaces preserved?",
      answer: "Yes, spaces and all non-digit characters are preserved in the output.",
    },
    {
      question: "Can I remove specific numbers only?",
      answer: "This tool removes all digits. For selective removal, you can manually edit the text after processing.",
    },
  ];

  return (
    <ToolLayout
      title="Remove Numbers"
      description="Remove all numbers (0-9) from text instantly."
      icon={<Eraser className="h-8 w-8" />}
      toolId="remove-numbers"
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
            onClick={removeNumbers}
            size="lg"
            disabled={!inputText}
            data-testid="button-remove"
          >
            <Eraser className="mr-2 h-5 w-5" />
            Remove Numbers
          </Button>
        </div>

        {cleanedText && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Cleaned Text
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
              value={cleanedText}
              readOnly
              className="min-h-[150px]"
              data-testid="textarea-output"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
