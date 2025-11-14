import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Shuffle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function WordShuffler() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Word Shuffler Online | Shuffle Words & Sentences | Pixocraft Tools",
    description: "Randomly shuffle words or lines in text. Offline & fun to use.",
    keywords: "word shuffler, shuffle text, randomize words",
    canonicalUrl: "https://tools.pixocraft.in/tools/word-shuffler",
  });

  const shuffleWords = () => {
    const words = input.split(/\s+/).filter(w => w.length > 0);
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    setOutput(words.join(" "));
  };

  const shuffleLines = () => {
    const lines = input.split("\n").filter(l => l.trim().length > 0);
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setOutput(lines.join("\n"));
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Shuffled text copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter words or sentences to shuffle" },
    { step: 2, title: "Shuffle", description: "Choose to shuffle words or lines" },
    { step: 3, title: "Copy Result", description: "Copy new randomized content instantly" },
  ];

  const benefits = [
    { icon: <Shuffle className="h-5 w-5" />, title: "Words or Lines", description: "Shuffle entire lines or individual words" },
    { icon: <Shuffle className="h-5 w-5" />, title: "Random Results", description: "Cryptographically random shuffling" },
    { icon: <Shuffle className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
    { icon: <Shuffle className="h-5 w-5" />, title: "Fun & Useful", description: "Great for games, brainstorming & more" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Can it shuffle sentences?",
      answer: "Yes — entire lines or words. You can shuffle individual words within text or shuffle complete lines/sentences in any order."
    },
    {
      question: "Is the shuffle truly random?",
      answer: "Yes! We use the Fisher-Yates shuffle algorithm with JavaScript's Math.random() for unpredictable, random results every time."
    },
    {
      question: "What can I use this for?",
      answer: "Perfect for creative writing exercises, randomizing lists, creating word games, brainstorming sessions, or just having fun with text."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Word Shuffler"
        description="Paste text → shuffle → copy new randomized content instantly."
        icon={<Shuffle className="h-8 w-8" />}
        toolId="word-shuffler"
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
          <span className="text-foreground">Word Shuffler</span>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to shuffle..."
              rows={8}
              data-testid="input-text"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={shuffleWords}
              disabled={!input.trim()}
              className="flex-1"
              data-testid="button-shuffle-words"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Shuffle Words
            </Button>
            <Button
              onClick={shuffleLines}
              disabled={!input.trim()}
              variant="secondary"
              className="flex-1"
              data-testid="button-shuffle-lines"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Shuffle Lines
            </Button>
          </div>

          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Shuffled Result</h3>
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
