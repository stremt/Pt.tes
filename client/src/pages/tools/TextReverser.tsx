import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FlipHorizontal, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function TextReverser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Text Reverser Online | Reverse Words & Sentences | Pixocraft Tools",
    description: "Reverse text, words or full sentences instantly. Offline & fun.",
    keywords: "text reverser, reverse words, reverse text tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-reverser",
  });

  const reverseText = () => {
    setOutput(input.split("").reverse().join(""));
  };

  const reverseWords = () => {
    const words = input.split(/\s+/);
    setOutput(words.reverse().join(" "));
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Reversed text copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const howItWorks = [
    { step: 1, title: "Enter Text", description: "Type or paste your text" },
    { step: 2, title: "Choose Mode", description: "Reverse full text or just words" },
    { step: 3, title: "Copy Result", description: "Copy output instantly" },
  ];

  const benefits = [
    { icon: <FlipHorizontal className="h-5 w-5" />, title: "Two Modes", description: "Reverse characters or words" },
    { icon: <FlipHorizontal className="h-5 w-5" />, title: "Instant", description: "Process text immediately" },
    { icon: <FlipHorizontal className="h-5 w-5" />, title: "Fun & Useful", description: "Great for puzzles & games" },
    { icon: <FlipHorizontal className="h-5 w-5" />, title: "100% Offline", description: "No internet needed" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it reverse only words?",
      answer: "Both — words or full sentence. You can reverse the entire text character by character, or reverse just the word order while keeping each word intact."
    },
    {
      question: "What's the difference between the two modes?",
      answer: "'Reverse Text' flips all characters: 'Hello World' → 'dlroW olleH'. 'Reverse Words' only flips word order: 'Hello World' → 'World Hello'."
    },
    {
      question: "Can I use this for palindrome creation?",
      answer: "Yes! This tool is perfect for creating palindromes, mirror text, or fun word puzzles. Try reversing text and comparing it to the original."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Text Reverser"
        description="Paste text → reverse → copy output instantly."
        icon={<FlipHorizontal className="h-8 w-8" />}
        toolId="text-reverser"
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
          <span className="text-foreground">Text Reverser</span>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to reverse..."
              rows={8}
              data-testid="input-text"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={reverseText}
              disabled={!input.trim()}
              className="flex-1"
              data-testid="button-reverse-text"
            >
              <FlipHorizontal className="mr-2 h-4 w-4" />
              Reverse Text
            </Button>
            <Button
              onClick={reverseWords}
              disabled={!input.trim()}
              variant="secondary"
              className="flex-1"
              data-testid="button-reverse-words"
            >
              <FlipHorizontal className="mr-2 h-4 w-4" />
              Reverse Words
            </Button>
          </div>

          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Reversed Result</h3>
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
