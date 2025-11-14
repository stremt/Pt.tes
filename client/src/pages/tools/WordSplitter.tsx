import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Split, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function WordSplitter() {
  const [inputText, setInputText] = useState<string>("");
  const [splitType, setSplitType] = useState<"chars" | "length">("chars");
  const [splitValue, setSplitValue] = useState<number>(1);
  const [splitText, setSplitText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Word Splitter | Split Words by Character or Length",
    description: "Split long words into smaller segments. Perfect for formatting & coding.",
    keywords: "word splitter, split words tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/word-splitter",
  });

  const handleSplit = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter text to split",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    if (splitType === "chars") {
      result = inputText.split('').join(' ');
    } else {
      const words = inputText.split(/\s+/);
      result = words.map(word => {
        if (word.length <= splitValue) return word;
        const chunks = [];
        for (let i = 0; i < word.length; i += splitValue) {
          chunks.push(word.substring(i, i + splitValue));
        }
        return chunks.join('-');
      }).join(' ');
    }

    setSplitText(result);
    toast({
      title: "Split Complete!",
      description: "Text has been split",
    });
  };

  const copyToClipboard = async () => {
    if (!splitText) return;
    await navigator.clipboard.writeText(splitText);
    toast({
      title: "Copied!",
      description: "Split text copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Enter Text", description: "Type or paste your words" },
    { step: 2, title: "Choose Split Type", description: "Split by characters or by length" },
    { step: 3, title: "Split", description: "Get formatted output instantly" },
  ];

  const benefits = [
    { icon: <Split className="h-5 w-5" />, title: "Two Modes", description: "Split by chars or fixed length" },
    { icon: <Copy className="h-5 w-5" />, title: "Flexible", description: "Customize split length" },
    { icon: <Split className="h-5 w-5" />, title: "Instant Results", description: "Split in milliseconds" },
  ];

  const faqs = [
    {
      question: "What's the difference between the split types?",
      answer: "Character split separates every character. Length split breaks words into chunks of specified length.",
    },
    {
      question: "What separator is used?",
      answer: "Character split uses spaces. Length split uses hyphens between chunks.",
    },
    {
      question: "Why would I use this?",
      answer: "Useful for formatting long strings, creating acronyms, or breaking up text for design purposes.",
    },
  ];

  const toolContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="split-type" data-testid="label-type">Split Type</Label>
            <Select value={splitType} onValueChange={(value: "chars" | "length") => setSplitType(value)}>
              <SelectTrigger id="split-type" data-testid="select-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chars">By Characters</SelectItem>
                <SelectItem value="length">By Length</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {splitType === "length" && (
            <div>
              <Label htmlFor="split-length" data-testid="label-length">Chunk Length</Label>
              <Input
                id="split-length"
                data-testid="input-length"
                type="number"
                min="1"
                value={splitValue}
                onChange={(e) => setSplitValue(parseInt(e.target.value) || 1)}
              />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="input-text" data-testid="label-input">Input Text</Label>
          <Textarea
            id="input-text"
            data-testid="input-text"
            placeholder="Enter words to split..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <Button 
          onClick={handleSplit} 
          className="w-full" 
          data-testid="button-split"
        >
          <Split className="mr-2 h-4 w-4" />
          Split Words
        </Button>

        {splitText && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Split Result</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={splitText}
              readOnly
              className="min-h-[120px]"
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
      title="Word Splitter"
      description="Split long words into smaller segments. Perfect for formatting & coding."
      icon={<Split className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
