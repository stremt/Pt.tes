import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Eraser, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function RemovePunctuation() {
  const [inputText, setInputText] = useState<string>("");
  const [cleanedText, setCleanedText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Remove Punctuation Online | Clean Text Tool",
    description: "Remove commas, dots, question marks and other punctuation instantly.",
    keywords: "remove punctuation, clean text tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/remove-punctuation",
  });

  const handleRemovePunctuation = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter some text to remove punctuation",
        variant: "destructive",
      });
      return;
    }

    const cleaned = inputText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\[\]"'<>]/g, '');
    setCleanedText(cleaned);
    
    toast({
      title: "Punctuation Removed!",
      description: "All punctuation marks have been removed",
    });
  };

  const copyToClipboard = async () => {
    if (!cleanedText) return;
    await navigator.clipboard.writeText(cleanedText);
    toast({
      title: "Copied!",
      description: "Clean text copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter text containing punctuation" },
    { step: 2, title: "Remove", description: "Click to remove all punctuation marks" },
    { step: 3, title: "Copy", description: "Get your clean text instantly" },
  ];

  const benefits = [
    { icon: <Eraser className="h-5 w-5" />, title: "All Punctuation", description: "Removes commas, dots, quotes, and more" },
    { icon: <Copy className="h-5 w-5" />, title: "Preserve Spaces", description: "Keeps spaces and line breaks intact" },
    { icon: <Eraser className="h-5 w-5" />, title: "Instant Clean", description: "Clean text in milliseconds" },
  ];

  const faqs = [
    {
      question: "What punctuation is removed?",
      answer: "All common punctuation: periods, commas, semicolons, colons, quotes, parentheses, brackets, dashes, question marks, exclamation points, and more.",
    },
    {
      question: "Are spaces preserved?",
      answer: "Yes, spaces and line breaks are kept intact. Only punctuation marks are removed.",
    },
    {
      question: "What about numbers?",
      answer: "Numbers are preserved. This tool only removes punctuation characters, not alphanumeric content.",
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
            placeholder="Enter text with punctuation..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <Button 
          onClick={handleRemovePunctuation} 
          className="w-full" 
          data-testid="button-remove"
        >
          <Eraser className="mr-2 h-4 w-4" />
          Remove Punctuation
        </Button>

        {cleanedText && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Clean Text</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={cleanedText}
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
      title="Remove Punctuation"
      description="Remove commas, dots, question marks and other punctuation instantly."
      icon={<Eraser className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
