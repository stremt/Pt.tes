import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { WrapText, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function LineBreakRemover() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Line Break Remover | Delete New Lines Instantly | Pixocraft Tools",
    description: "Remove line breaks and join text into one clean paragraph. Offline & simple.",
    keywords: "remove line breaks, delete new lines, text formatter",
    canonicalUrl: "https://tools.pixocraft.in/tools/line-break-remover",
  });

  const removeLineBreaks = () => {
    const result = input.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    setOutput(result);
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter text with multiple line breaks" },
    { step: 2, title: "Remove Breaks", description: "Click to join into single paragraph" },
    { step: 3, title: "Copy Result", description: "Clean single-line output instantly" },
  ];

  const benefits = [
    { icon: <WrapText className="h-5 w-5" />, title: "Huge Text Support", description: "Handles thousands of lines" },
    { icon: <WrapText className="h-5 w-5" />, title: "Clean Output", description: "Removes extra spaces too" },
    { icon: <WrapText className="h-5 w-5" />, title: "Instant", description: "Process text in milliseconds" },
    { icon: <WrapText className="h-5 w-5" />, title: "100% Offline", description: "No internet required" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it handle huge text?",
      answer: "Yes — thousands of lines. Paste any amount of text and we'll process it instantly, converting all line breaks into a single continuous paragraph."
    },
    {
      question: "Does it remove extra spaces?",
      answer: "Yes! The tool not only removes line breaks but also cleans up multiple consecutive spaces, leaving only single spaces between words."
    },
    {
      question: "Will it preserve my text content?",
      answer: "Absolutely. Only line breaks and extra spaces are removed. All your actual text content remains exactly the same, just formatted as one continuous line."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Line Break Remover"
        description="Paste text → remove line breaks → clean single-line output instantly."
        icon={<WrapText className="h-8 w-8" />}
        toolId="line-break-remover"
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
          <span className="text-foreground">Line Break Remover</span>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with line breaks..."
              rows={10}
              data-testid="input-text"
            />
          </div>

          <Button
            onClick={removeLineBreaks}
            disabled={!input.trim()}
            size="lg"
            className="w-full"
            data-testid="button-remove-breaks"
          >
            <WrapText className="mr-2 h-5 w-5" />
            Remove Line Breaks
          </Button>

          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Result</h3>
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
                rows={6}
                data-testid="output-text"
              />
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
