import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FilterX, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function RemoveDuplicateWords() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Duplicate Word Remover | Clean Repeated Words | Pixocraft Tools",
    description: "Remove repeated words or duplicates from text instantly. Offline & easy.",
    keywords: "remove duplicate words, text cleaner, delete duplicates",
    canonicalUrl: "https://tools.pixocraft.in/tools/remove-duplicate-words",
  });

  const removeDuplicates = () => {
    const words = input.split(/\s+/).filter(w => w.length > 0);
    const seen = new Set<string>();
    const unique = words.filter(word => {
      const lower = word.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
    setOutput(unique.join(" "));
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Clean text copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter text with duplicate words" },
    { step: 2, title: "Remove Duplicates", description: "Click to clean repeated words" },
    { step: 3, title: "Copy Clean Text", description: "Get clean output instantly" },
  ];

  const benefits = [
    { icon: <FilterX className="h-5 w-5" />, title: "Keeps First", description: "Keeps first appearance of each word" },
    { icon: <FilterX className="h-5 w-5" />, title: "Case Insensitive", description: "Treats 'Word' and 'word' as same" },
    { icon: <FilterX className="h-5 w-5" />, title: "Instant", description: "Clean thousands of words in seconds" },
    { icon: <FilterX className="h-5 w-5" />, title: "100% Free", description: "Offline & unlimited use" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it keep first appearance?",
      answer: "Yes. The tool keeps the first occurrence of each unique word and removes all subsequent duplicates while maintaining the original order."
    },
    {
      question: "Is it case-sensitive?",
      answer: "No, it's case-insensitive by default. Words like 'Hello', 'hello', and 'HELLO' are treated as the same word, and only the first appearance is kept."
    },
    {
      question: "Can it handle large text?",
      answer: "Absolutely! You can paste thousands of words and the tool will process them instantly. No size limits or restrictions."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Remove Duplicate Words"
        description="Paste your text → remove duplicates → get clean output instantly."
        icon={<FilterX className="h-8 w-8" />}
        toolId="remove-duplicate-words"
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
          <span className="text-foreground">Remove Duplicate Words</span>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with duplicate words..."
              rows={8}
              data-testid="input-text"
            />
          </div>

          <Button
            onClick={removeDuplicates}
            disabled={!input.trim()}
            size="lg"
            className="w-full"
            data-testid="button-remove-duplicates"
          >
            <FilterX className="mr-2 h-5 w-5" />
            Remove Duplicate Words
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
                rows={8}
                data-testid="output-text"
              />
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
