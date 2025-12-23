import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Shuffle, Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

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

  const relatedTools = getRelatedTools("case-randomizer", 6);

  const randomizeCase = () => {
    if (!inputText.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter some text",
        variant: "destructive",
      });
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
    toast({
      title: "Text Randomized",
      description: `Generated ${mode} case text`,
    });
  };

  const copyToClipboard = () => {
    if (!outputText.trim()) {
      toast({
        title: "Nothing to Copy",
        description: "Please generate text first",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Randomized text copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Can I copy output?",
      answer: "Yes — one-click copy. The generated text can be copied to your clipboard with a single click for easy sharing."
    },
    {
      question: "What's the difference between random and alternating?",
      answer: "Random mode randomly capitalizes each letter. Alternating mode switches between uppercase and lowercase for each letter in sequence."
    },
    {
      question: "Does it work offline?",
      answer: "Yes! The case randomizer works completely offline in your browser with no internet connection required."
    }
  ];

  return (
    <>
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Case Randomizer</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shuffle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">cAsE RaNdOmIzEr</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate fun random or alternating case text instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Fun</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Randomize Text Case</CardTitle>
                <CardDescription>
                  Choose random or alternating mode and generate mixed-case text
                </CardDescription>
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
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </>
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

                <Card className="bg-muted/30">
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-2">Examples:</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Input:</span> Hello World
                      </div>
                      <div>
                        <span className="text-muted-foreground">Random:</span> HeLlO wOrLd
                      </div>
                      <div>
                        <span className="text-muted-foreground">Alternating:</span> HeLlO WoRlD
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">About Case Randomizer</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Paste your text → choose random / alternating mode → generate fun mixed-case text instantly.
                </p>
              </div>

              <div className="text-center space-y-4 mb-12 mt-16">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                {faqItems.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {relatedTools.length > 0 && (
            <section className="py-16">
              <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedTools.map((tool) => {
                    const Icon = getToolIcon(tool.icon);
                    return (
                      <Link key={tool.id} href={tool.path}>
                        <Card className="hover-elevate active-elevate-2 h-full cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            <CardDescription>{tool.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center text-primary font-medium">
                              Try it now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Footer Category Links */}
          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold">More Text Tools</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore other tools in the Text Tools category
                </p>
                <Link href="/tools/text">
                  <Button variant="default" size="lg" data-testid="button-category-link">
                    View All Text Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
