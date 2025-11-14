import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { ListOrdered, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function LineNumberAdder() {
  const [inputText, setInputText] = useState<string>("");
  const [startNumber, setStartNumber] = useState<number>(1);
  const [numberedText, setNumberedText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Add Line Numbers | Number Every Line of Text",
    description: "Add line numbers to text instantly. Useful for coding, scripts and documents.",
    keywords: "add line numbers, line number tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/line-number-adder",
  });

  const handleAddLineNumbers = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter some text to add line numbers",
        variant: "destructive",
      });
      return;
    }

    const lines = inputText.split('\n');
    const numbered = lines
      .map((line, index) => `${startNumber + index}. ${line}`)
      .join('\n');
    
    setNumberedText(numbered);
    toast({
      title: "Line Numbers Added!",
      description: `Added numbers to ${lines.length} lines`,
    });
  };

  const copyToClipboard = async () => {
    if (!numberedText) return;
    await navigator.clipboard.writeText(numberedText);
    toast({
      title: "Copied!",
      description: "Numbered text copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter your text with multiple lines" },
    { step: 2, title: "Set Start Number", description: "Choose the starting line number (default: 1)" },
    { step: 3, title: "Add Numbers", description: "Click to add line numbers and copy output" },
  ];

  const benefits = [
    { icon: <ListOrdered className="h-5 w-5" />, title: "Custom Start", description: "Choose any starting line number" },
    { icon: <Copy className="h-5 w-5" />, title: "Instant Output", description: "Numbers added in milliseconds" },
    { icon: <ListOrdered className="h-5 w-5" />, title: "Perfect Format", description: "Clean numbered list format" },
  ];

  const faqs = [
    {
      question: "Can I choose start number?",
      answer: "Yes, you can set any starting number. The default is 1, but you can start from any number you want.",
    },
    {
      question: "What format does it use?",
      answer: "The format is: [number]. [text]. For example: '1. First line', '2. Second line', etc.",
    },
    {
      question: "Does it work with code?",
      answer: "Yes! Perfect for numbering code snippets, scripts, or any text document.",
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
            placeholder="Enter text (each line will be numbered)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div>
          <Label htmlFor="start-number" data-testid="label-start">Starting Number</Label>
          <Input
            id="start-number"
            data-testid="input-start"
            type="number"
            min="1"
            value={startNumber}
            onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
          />
        </div>

        <Button 
          onClick={handleAddLineNumbers} 
          className="w-full" 
          data-testid="button-add"
        >
          <ListOrdered className="mr-2 h-4 w-4" />
          Add Line Numbers
        </Button>

        {numberedText && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Numbered Text</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={numberedText}
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
      title="Add Line Numbers"
      description="Add line numbers to text instantly. Useful for coding, scripts and documents."
      icon={<ListOrdered className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
