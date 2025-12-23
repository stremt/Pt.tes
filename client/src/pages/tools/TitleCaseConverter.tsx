import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { ALargeSmall, Copy, RotateCcw, Zap, Lock, Sparkles } from "lucide-react";

export default function TitleCaseConverter() {
  const [inputText, setInputText] = useState("");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Title Case Converter | Convert Text to Proper Case Instantly | Pixocraft Tools",
    description: "Convert your text into clean and professional Title Case instantly. Offline & secure.",
    keywords: "title case converter, proper case generator, text capitalizer",
    canonicalUrl: "https://tools.pixocraft.in/tools/title-case-converter",
  });

  const toTitleCase = (text: string): string => {
    const smallWords = /^(a|an|and|as|at|but|by|for|if|in|nor|of|on|or|so|the|to|up|yet)$/i;
    return text
      .toLowerCase()
      .split(' ')
      .map((word, index, arr) => {
        if (index === 0 || index === arr.length - 1 || !smallWords.test(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(' ');
  };

  const outputText = toTitleCase(inputText);

  return (
    <ToolLayout
      title="Title Case Converter"
      description="Paste text → convert to perfect Title Case instantly for headings & captions."
      icon={<ALargeSmall className="h-10 w-10 text-primary" />}
      toolId="title-case-converter"
      category="text"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Paste or type your text into the input box." },
        { step: 2, title: "Instant Conversion", description: "Text is automatically converted to Title Case." },
        { step: 3, title: "Copy Result", description: "Click to copy the converted text." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Conversion", description: "Real-time title case transformation." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Private", description: "Everything happens in your browser." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "Smart Capitalization", description: "Automatically handles articles and conjunctions." },
      ]}
      faqs={[
        { question: "Can I convert to sentence case?", answer: "Yes, this tool properly handles title case where first letter of each major word is capitalized." },
        { question: "Is my data safe?", answer: "Yes! All processing happens locally in your browser. No data is sent to servers." },
        { question: "Does it work offline?", answer: "Yes, once loaded, this tool works completely offline." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Input Text</span>
              {inputText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInputText("")}
                  data-testid="button-clear"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type or paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[150px] text-base"
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Title Case Output</span>
              {outputText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(outputText, "Title case copied!")}
                  data-testid="button-copy"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg min-h-[150px] text-base font-mono">
              {outputText || <span className="text-muted-foreground italic">Your title case text will appear here...</span>}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
