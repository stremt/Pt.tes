import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Shuffle, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/layout/ToolLayout";

export default function CaseRandomizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<'random' | 'alternating'>('random');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Random Case Generator | cRaZy TeXt / Alternating Case Tool | Pixocraft Tools",
    description: "Convert text into random case or alternating case instantly. Fun, fast & offline.",
    keywords: "random case generator, crazy text, alternating case, mixed case generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/case-randomizer",
  });

  const randomizeCase = () => {
    if (!inputText.trim()) {
      toast({ title: "Invalid Input", description: "Please enter some text", variant: "destructive" });
      return;
    }

    let result = '';
    if (mode === 'random') {
      result = inputText.split('').map(char => {
        if (!/[a-zA-Z]/.test(char)) return char;
        return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
      }).join('');
    } else {
      let shouldBeUpper = true;
      result = inputText.split('').map(char => {
        if (!/[a-zA-Z]/.test(char)) return char;
        const newChar = shouldBeUpper ? char.toUpperCase() : char.toLowerCase();
        shouldBeUpper = !shouldBeUpper;
        return newChar;
      }).join('');
    }

    setOutputText(result);
    toast({ title: "Text Randomized", description: `Generated ${mode} case text` });
  };

  const copyToClipboard = () => {
    if (!outputText.trim()) {
      toast({ title: "Nothing to Copy", description: "Please generate text first", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast({ title: "Copied!", description: "Randomized text copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqItems: FAQItem[] = [
    { question: "Can I copy output?", answer: "Yes — one-click copy. The generated text can be copied to your clipboard with a single click for easy sharing." },
    { question: "What's the difference between random and alternating?", answer: "Random mode randomly capitalizes each letter. Alternating mode switches between uppercase and lowercase for each letter in sequence." },
    { question: "Does it work offline?", answer: "Yes! The case randomizer works completely offline in your browser with no internet connection required." }
  ];

  const howItWorks = [
    { step: 1, title: "Enter Text", description: "Type or paste your text" },
    { step: 2, title: "Choose Mode", description: "Select random or alternating case" },
    { step: 3, title: "Generate", description: "Click to generate randomized text" },
  ];

  const benefits = [
    { icon: <Shuffle className="h-5 w-5" />, title: "Random Mix", description: "Each letter randomly uppercase or lowercase" },
    { icon: <Copy className="h-5 w-5" />, title: "Two Modes", description: "Random or alternating case" },
    { icon: <Shuffle className="h-5 w-5" />, title: "Instant Results", description: "Generate mixed case text instantly" },
  ];

  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(generateFAQSchema(faqItems))}</script>
      <ToolLayout
        title="cAsE RaNdOmIzEr"
        description="Generate fun random or alternating case text instantly"
        icon={<Shuffle className="h-8 w-8" />}
        toolId="case-randomizer"
        category="text"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="max-w-3xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Randomize Text Case</CardTitle>
              <CardDescription>Choose random or alternating mode and generate mixed-case text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="input-text">Input Text</Label>
                <Textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="min-h-[150px]"
                  data-testid="input-text"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  variant={mode === 'random' ? 'default' : 'outline'}
                  onClick={() => setMode('random')}
                  className="flex-1"
                  data-testid="button-random-mode"
                >
                  <Shuffle className="mr-2 h-4 w-4" />
                  Random Case
                </Button>
                <Button
                  variant={mode === 'alternating' ? 'default' : 'outline'}
                  onClick={() => setMode('alternating')}
                  className="flex-1"
                  data-testid="button-alternating-mode"
                >
                  Alternating Case
                </Button>
              </div>

              <Button onClick={randomizeCase} className="w-full" size="lg" data-testid="button-generate">
                <Shuffle className="mr-2 h-5 w-5" />
                Generate
              </Button>

              {outputText && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="output-text">Result</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      data-testid="button-copy"
                    >
                      {copied ? (
                        <><Check className="mr-2 h-4 w-4" />Copied!</>
                      ) : (
                        <><Copy className="mr-2 h-4 w-4" />Copy</>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    id="output-text"
                    value={outputText}
                    readOnly
                    className="min-h-[150px] bg-muted/50"
                    data-testid="output-text"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
