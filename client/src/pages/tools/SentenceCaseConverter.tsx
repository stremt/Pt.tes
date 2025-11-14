import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Type, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function SentenceCaseConverter() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Sentence Case Converter | Fix Capitalization Instantly | Pixocraft Tools",
    description: "Convert long paragraphs into proper sentence case in one click. Offline supported and free.",
    keywords: "sentence case converter, text formatter, capitalization tool, sentence case",
    canonicalUrl: "https://tools.pixocraft.in/tools/sentence-case-converter",
  });

  const convertToSentenceCase = () => {
    let result = inputText.toLowerCase();
    
    // Capitalize first letter of text
    result = result.charAt(0).toUpperCase() + result.slice(1);
    
    // Capitalize after sentence endings (. ! ?)
    result = result.replace(/([.!?]\s+)([a-z])/g, (match, p1, p2) => {
      return p1 + p2.toUpperCase();
    });
    
    // Capitalize "I" when standalone
    result = result.replace(/\bi\b/g, 'I');
    
    setOutputText(result);
    toast({
      title: "Converted!",
      description: "Text converted to sentence case",
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Sentence case text copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter or paste any text or paragraph" },
    { step: 2, title: "Convert", description: "Click to apply proper sentence case formatting" },
    { step: 3, title: "Copy Result", description: "Get properly capitalized text" },
  ];

  const benefits = [
    { icon: <Type className="h-5 w-5" />, title: "Smart Capitalization", description: "Automatically capitalizes sentence beginnings" },
    { icon: <Type className="h-5 w-5" />, title: "Instant", description: "Convert entire paragraphs in one click" },
    { icon: <Copy className="h-5 w-5" />, title: "Writer-Friendly", description: "Perfect for students, writers & editors" },
  ];

  const faqs = [
    {
      question: "What is sentence case?",
      answer: "Sentence case means only the first letter of each sentence is capitalized, along with proper nouns and the pronoun 'I'.",
    },
    {
      question: "Does it preserve proper nouns?",
      answer: "The tool converts to lowercase first, then capitalizes sentence beginnings. For proper nouns, you may need to manually adjust.",
    },
    {
      question: "Can I convert multiple paragraphs?",
      answer: "Yes! The tool handles multiple paragraphs and sentences at once.",
    },
  ];

  return (
    <ToolLayout
      title="Sentence Case Converter"
      description="Convert long paragraphs into proper sentence case in one click. Offline supported and free."
      icon={<Type className="h-8 w-8" />}
      toolId="sentence-case-converter"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="input-text" className="text-base font-semibold">
            Input Text
          </Label>
          <Textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here to convert to sentence case..."
            className="min-h-[200px]"
            data-testid="textarea-input"
          />
          <Button
            onClick={convertToSentenceCase}
            size="lg"
            disabled={!inputText}
            data-testid="button-convert"
          >
            <Type className="mr-2 h-5 w-5" />
            Convert to Sentence Case
          </Button>
        </div>

        {outputText && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Sentence Case Output
              </Label>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                data-testid="button-copy"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea
              value={outputText}
              readOnly
              className="min-h-[200px]"
              data-testid="textarea-output"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
