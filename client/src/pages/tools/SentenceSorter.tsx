import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { ArrowUpDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function SentenceSorter() {
  const [inputText, setInputText] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedText, setSortedText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Sentence Sorter | Sort Sentences Alphabetically",
    description: "Sort sentences alphabetically in ascending or descending order.",
    keywords: "sentence sorter, sort sentences",
    canonicalUrl: "https://tools.pixocraft.in/tools/sentence-sorter",
  });

  const handleSort = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter sentences to sort",
        variant: "destructive",
      });
      return;
    }

    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim());
    const sorted = [...sentences].sort((a, b) => {
      const trimA = a.trim().toLowerCase();
      const trimB = b.trim().toLowerCase();
      return sortOrder === "asc" 
        ? trimA.localeCompare(trimB)
        : trimB.localeCompare(trimA);
    });

    const result = sorted.map(s => s.trim()).join('. ') + '.';
    setSortedText(result);
    
    toast({
      title: "Sorted!",
      description: `Sorted ${sentences.length} sentences ${sortOrder === "asc" ? "A-Z" : "Z-A"}`,
    });
  };

  const copyToClipboard = async () => {
    if (!sortedText) return;
    await navigator.clipboard.writeText(sortedText);
    toast({
      title: "Copied!",
      description: "Sorted sentences copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste Sentences", description: "Enter your sentences separated by periods" },
    { step: 2, title: "Choose Order", description: "Select A-Z (ascending) or Z-A (descending)" },
    { step: 3, title: "Sort", description: "Get alphabetically sorted sentences" },
  ];

  const benefits = [
    { icon: <ArrowUpDown className="h-5 w-5" />, title: "Both Directions", description: "Sort A-Z or Z-A" },
    { icon: <Copy className="h-5 w-5" />, title: "Smart Detection", description: "Recognizes periods, exclamations, questions" },
    { icon: <ArrowUpDown className="h-5 w-5" />, title: "Instant Sort", description: "Alphabetically sorted in milliseconds" },
  ];

  const faqs = [
    {
      question: "How are sentences detected?",
      answer: "Sentences are split by periods (.), exclamation marks (!), and question marks (?). Empty sentences are automatically removed.",
    },
    {
      question: "Is sorting case-sensitive?",
      answer: "No, sorting is case-insensitive. 'Apple' and 'apple' are treated the same for sorting purposes.",
    },
    {
      question: "What about numbers in sentences?",
      answer: "Sentences starting with numbers are sorted before those starting with letters.",
    },
  ];

  const toolContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="input-text" data-testid="label-input">Input Sentences</Label>
          <Textarea
            id="input-text"
            data-testid="input-text"
            placeholder="Enter sentences separated by periods, exclamation marks, or question marks..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <div>
          <Label htmlFor="sort-order" data-testid="label-order">Sort Order</Label>
          <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
            <SelectTrigger id="sort-order" data-testid="select-order">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">A-Z (Ascending)</SelectItem>
              <SelectItem value="desc">Z-A (Descending)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSort} 
          className="w-full" 
          data-testid="button-sort"
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort Sentences
        </Button>

        {sortedText && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Sorted Sentences</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={sortedText}
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
      title="Sentence Sorter"
      description="Sort sentences alphabetically in ascending or descending order."
      icon={<ArrowUpDown className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
