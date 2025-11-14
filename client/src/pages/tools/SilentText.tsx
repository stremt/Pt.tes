import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { VolumeX, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function SilentText() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Silent Text Generator | Remove Vowels from Text | Pixocraft Tools",
    description: "Remove vowels from text instantly. Fun tool for coding, puzzles & learning.",
    keywords: "remove vowels, silent text, fun text tools",
    canonicalUrl: "https://tools.pixocraft.in/tools/silent-text",
  });

  const removeVowels = () => {
    const result = input.replace(/[aeiouAEIOU]/g, "");
    setOutput(result);
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Silent text copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const howItWorks = [
    { step: 1, title: "Enter Text", description: "Type or paste any text" },
    { step: 2, title: "Remove Vowels", description: "Click to remove all A, E, I, O, U" },
    { step: 3, title: "Copy Result", description: "Generate silent puzzle-style text" },
  ];

  const benefits = [
    { icon: <VolumeX className="h-5 w-5" />, title: "All Vowels", description: "Removes A, E, I, O, U (uppercase & lowercase)" },
    { icon: <VolumeX className="h-5 w-5" />, title: "Fun & Educational", description: "Perfect for puzzles & word games" },
    { icon: <VolumeX className="h-5 w-5" />, title: "Coding Practice", description: "Great for programming challenges" },
    { icon: <VolumeX className="h-5 w-5" />, title: "Instant", description: "Process text immediately" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "AEIOU remove karta hai?",
      answer: "Yes — all vowels. Removes all instances of A, E, I, O, U in both uppercase and lowercase from your text, leaving only consonants."
    },
    {
      question: "What can I use this for?",
      answer: "Perfect for word puzzles, coding challenges, educational games, creating riddles, or just having fun with text. Also useful for creating abbreviations or testing text readability."
    },
    {
      question: "Can people still read the text?",
      answer: "Often yes! The human brain is amazing at filling in missing vowels. Try it: 'Ths s mzng!' (This is amazing!) is still quite readable."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Silent Text Generator"
        description="Paste text → remove vowels → generate silent puzzle-style text."
        icon={<VolumeX className="h-8 w-8" />}
        toolId="silent-text"
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
          <span className="text-foreground">Silent Text Generator</span>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to remove vowels..."
              rows={8}
              data-testid="input-text"
            />
          </div>

          <Button
            onClick={removeVowels}
            disabled={!input.trim()}
            size="lg"
            className="w-full"
            data-testid="button-remove-vowels"
          >
            <VolumeX className="mr-2 h-5 w-5" />
            Remove Vowels
          </Button>

          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Silent Text Result</h3>
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
