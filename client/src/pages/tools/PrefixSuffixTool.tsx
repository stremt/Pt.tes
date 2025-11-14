import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Plus, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function PrefixSuffixTool() {
  const [inputText, setInputText] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const [resultText, setResultText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Add Prefix or Suffix to Text Lines Instantly",
    description: "Add custom prefix or suffix to every line of text. Offline, simple and fast.",
    keywords: "add prefix tool, add suffix generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/prefix-suffix-tool",
  });

  const handleApply = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter some text to modify",
        variant: "destructive",
      });
      return;
    }

    if (!prefix && !suffix) {
      toast({
        title: "Enter Prefix or Suffix",
        description: "Please enter at least a prefix or suffix",
        variant: "destructive",
      });
      return;
    }

    const lines = inputText.split('\n');
    const modified = lines.map(line => `${prefix}${line}${suffix}`).join('\n');
    
    setResultText(modified);
    toast({
      title: "Applied!",
      description: `Modified ${lines.length} lines`,
    });
  };

  const copyToClipboard = async () => {
    if (!resultText) return;
    await navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied!",
      description: "Modified text copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Enter Text", description: "Paste your multi-line text" },
    { step: 2, title: "Set Prefix/Suffix", description: "Type prefix, suffix, or both" },
    { step: 3, title: "Apply", description: "Get modified text instantly" },
  ];

  const benefits = [
    { icon: <Plus className="h-5 w-5" />, title: "Flexible", description: "Add prefix, suffix, or both" },
    { icon: <Copy className="h-5 w-5" />, title: "Bulk Edit", description: "Modify thousands of lines instantly" },
    { icon: <Plus className="h-5 w-5" />, title: "Simple", description: "No complex regex required" },
  ];

  const faqs = [
    {
      question: "Can I add both prefix and suffix?",
      answer: "Yes! You can add a prefix, suffix, or both at the same time to every line.",
    },
    {
      question: "What are common use cases?",
      answer: "Adding quotes to strings, wrapping lines in HTML tags, adding bullet points, or formatting lists.",
    },
    {
      question: "Does it preserve empty lines?",
      answer: "Yes, empty lines are preserved and will also receive the prefix and suffix.",
    },
  ];

  const toolContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="prefix" data-testid="label-prefix">Prefix (Optional)</Label>
            <Input
              id="prefix"
              data-testid="input-prefix"
              placeholder="e.g., - "
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="suffix" data-testid="label-suffix">Suffix (Optional)</Label>
            <Input
              id="suffix"
              data-testid="input-suffix"
              placeholder="e.g., ;"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="input-text" data-testid="label-input">Input Text</Label>
          <Textarea
            id="input-text"
            data-testid="input-text"
            placeholder="Enter text (one item per line)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <Button 
          onClick={handleApply} 
          className="w-full" 
          data-testid="button-apply"
        >
          <Plus className="mr-2 h-4 w-4" />
          Apply Prefix/Suffix
        </Button>

        {resultText && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Result</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={resultText}
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
      title="Add Prefix or Suffix"
      description="Add custom prefix or suffix to every line of text. Offline, simple and fast."
      icon={<Plus className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
