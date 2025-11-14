import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { List, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sort, setSort] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Duplicate Lines Remover | Clean Text Lines Instantly | Pixocraft Tools",
    description: "Remove duplicate lines, sort lines & clean text in seconds. Fast & offline.",
    keywords: "remove duplicate lines, delete repeated lines, clean text lines",
    canonicalUrl: "https://tools.pixocraft.in/tools/remove-duplicate-lines",
  });

  const removeDuplicates = () => {
    const lines = input.split("\n");
    const seen = new Set<string>();
    const unique = lines.filter(line => {
      const trimmed = line.trim();
      if (!trimmed || seen.has(trimmed)) return false;
      seen.add(trimmed);
      return true;
    });

    let result = unique;
    if (sort) {
      result = unique.sort((a, b) => a.localeCompare(b));
    }
    
    setOutput(result.join("\n"));
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Clean lines copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const howItWorks = [
    { step: 1, title: "Paste Lines", description: "Enter text with duplicate lines" },
    { step: 2, title: "Remove & Sort", description: "Clean duplicates & optionally sort" },
    { step: 3, title: "Copy Result", description: "Sorted/clean output immediately" },
  ];

  const benefits = [
    { icon: <List className="h-5 w-5" />, title: "Sorting Available", description: "Ascending & descending sort options" },
    { icon: <List className="h-5 w-5" />, title: "Trim Whitespace", description: "Auto removes extra spaces" },
    { icon: <List className="h-5 w-5" />, title: "Fast Processing", description: "Handles thousands of lines instantly" },
    { icon: <List className="h-5 w-5" />, title: "100% Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Sorting available?",
      answer: "Yes — ascending & descending. You can optionally sort all unique lines alphabetically after removing duplicates for better organization."
    },
    {
      question: "Does it preserve order?",
      answer: "By default, yes! Lines appear in the order they first appear in your text. Enable sorting if you want alphabetical order instead."
    },
    {
      question: "Can it handle empty lines?",
      answer: "Yes, empty lines and lines with only whitespace are automatically removed during the cleaning process."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Remove Duplicate Lines"
        description="Paste text → remove duplicate lines → sorted/clean output immediately."
        icon={<List className="h-8 w-8" />}
        toolId="remove-duplicate-lines"
        category="text"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Remove Duplicate Lines</span>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with duplicate lines..."
              rows={10}
              data-testid="input-text"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="sort-lines"
              checked={sort}
              onCheckedChange={setSort}
              data-testid="switch-sort"
            />
            <Label htmlFor="sort-lines" className="cursor-pointer">
              Sort lines alphabetically
            </Label>
          </div>

          <Button
            onClick={removeDuplicates}
            disabled={!input.trim()}
            size="lg"
            className="w-full"
            data-testid="button-remove-duplicates"
          >
            <List className="mr-2 h-5 w-5" />
            Remove Duplicate Lines
          </Button>

          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Clean Result</h3>
                <Button
                  onClick={copyOutput}
                  size="sm"
                  variant="outline"
                  data-testid="button-copy-output"
                >
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  Copy
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                rows={10}
                data-testid="output-text"
              />
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
