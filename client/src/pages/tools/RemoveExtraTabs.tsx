import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Eraser, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function RemoveExtraTabs() {
  const [inputText, setInputText] = useState<string>("");
  const [cleanedText, setCleanedText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Remove Tabs Online | Clean Tabs & Indentation",
    description: "Remove all tab characters and convert to clean spacing.",
    keywords: "remove tabs, clean indentation",
    canonicalUrl: "https://tools.pixocraft.in/tools/remove-extra-tabs",
  });

  const handleRemoveTabs = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter text to remove tabs",
        variant: "destructive",
      });
      return;
    }

    const cleaned = inputText.replace(/\t/g, ' ');
    setCleanedText(cleaned);
    
    toast({
      title: "Tabs Removed!",
      description: "All tab characters have been replaced with spaces",
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
    { step: 1, title: "Paste Text", description: "Enter text with tab characters" },
    { step: 2, title: "Remove Tabs", description: "Click to replace all tabs with spaces" },
    { step: 3, title: "Copy", description: "Get your clean text" },
  ];

  const benefits = [
    { icon: <Eraser className="h-5 w-5" />, title: "Clean Formatting", description: "Remove all tab indentation" },
    { icon: <Copy className="h-5 w-5" />, title: "Convert to Spaces", description: "Tabs replaced with single spaces" },
    { icon: <Eraser className="h-5 w-5" />, title: "Preserve Content", description: "Only tabs are affected" },
  ];

  const faqs = [
    {
      question: "What happens to tabs?",
      answer: "All tab characters (\\t) are replaced with a single space character.",
    },
    {
      question: "Are line breaks preserved?",
      answer: "Yes, line breaks and all other whitespace except tabs remain unchanged.",
    },
    {
      question: "Why remove tabs?",
      answer: "Useful for cleaning code formatting, converting between indentation styles, or preparing text for systems that don't handle tabs well.",
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
            placeholder="Paste text with tabs here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <Button 
          onClick={handleRemoveTabs} 
          className="w-full" 
          data-testid="button-remove"
        >
          <Eraser className="mr-2 h-4 w-4" />
          Remove Tabs
        </Button>

        {cleanedText && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Clean Text</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={cleanedText}
              readOnly
              className="min-h-[200px] font-mono text-sm"
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
      title="Remove Tabs"
      description="Remove all tab characters and convert to clean spacing."
      icon={<Eraser className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
