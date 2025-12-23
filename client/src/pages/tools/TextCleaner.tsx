import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Eraser, Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function TextCleaner() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    extraSpaces: true,
    lineBreaks: false,
    symbols: false,
    numbers: false,
    emojis: false,
    toLowerCase: false,
    toUpperCase: false,
  });
  const { toast } = useToast();

  useSEO({
    title: "Free Text Cleaner - Remove Spaces, Symbols & Duplicates",
    description: "Clean messy text by removing extra spaces, symbols, line breaks, and duplicates. 100% free, offline, private. Works in your browser instantly.",
    keywords: "text cleaner, remove spaces, clean text online, remove symbols, text formatter, duplicate remover, text cleanup tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-cleaner",
  });

  const relatedTools = getRelatedTools("text-cleaner", 6);

  const cleanText = () => {
    let result = inputText;

    if (options.extraSpaces) {
      result = result.replace(/\s+/g, ' ').trim();
    }

    if (options.lineBreaks) {
      result = result.replace(/\n+/g, ' ');
    }

    if (options.symbols) {
      result = result.replace(/[^\w\s]/g, '');
    }

    if (options.numbers) {
      result = result.replace(/\d/g, '');
    }

    if (options.emojis) {
      result = result.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\uD83C-\uD83E][\uDC00-\uDFFF])/g, '');
    }

    if (options.toLowerCase) {
      result = result.toLowerCase();
    }

    if (options.toUpperCase) {
      result = result.toUpperCase();
    }

    setOutputText(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Cleaned text copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => {
      const newOptions = { ...prev, [key]: !prev[key] };
      
      if (key === 'toLowerCase' && newOptions.toLowerCase) {
        newOptions.toUpperCase = false;
      }
      if (key === 'toUpperCase' && newOptions.toUpperCase) {
        newOptions.toLowerCase = false;
      }
      
      return newOptions;
    });
  };

  const faqItems: FAQItem[] = [
    {
      question: "Does it remove emojis?",
      answer: "Yes, if you select emoji removal. The text cleaner can remove all emojis and special Unicode characters from your text while preserving the actual content."
    },
    {
      question: "Is my text saved or uploaded?",
      answer: "No! Everything happens in your browser. Your text is never uploaded to any server or saved anywhere. It's 100% private and offline."
    },
    {
      question: "Can I combine multiple cleaning options?",
      answer: "Yes! You can select any combination of cleaning options to process your text exactly how you want it."
    },
    {
      question: "What cleaning options are available?",
      answer: "You can remove: extra spaces, line breaks, symbols, numbers, emojis, and convert to uppercase or lowercase. Mix and match options to clean your text exactly how you need it."
    },
    {
      question: "When should I use text cleaning?",
      answer: "Use it to clean data extracted from PDFs, remove formatting from copied text, prepare content for databases, clean social media posts, or organize messy text data."
    },
    {
      question: "Does cleaning affect my original text?",
      answer: "No! Your original text stays unchanged. The tool shows the cleaned version separately. You can copy the cleaned text or clear and start over."
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
            <span className="text-foreground">Text Cleaner</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eraser className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Text Cleaner</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Remove extra spaces, symbols, line breaks & clean messy text instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Private</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Clean Your Text</CardTitle>
                <CardDescription>
                  Paste text and choose cleaning options to get instant clean output
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your messy text here..."
                    className="min-h-[200px]"
                    data-testid="input-text"
                  />
                  <p className="text-sm text-muted-foreground">
                    {inputText.length} characters
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Cleaning Options</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="extra-spaces"
                        checked={options.extraSpaces}
                        onCheckedChange={() => toggleOption('extraSpaces')}
                        data-testid="checkbox-extra-spaces"
                      />
                      <label
                        htmlFor="extra-spaces"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Remove extra spaces
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="line-breaks"
                        checked={options.lineBreaks}
                        onCheckedChange={() => toggleOption('lineBreaks')}
                        data-testid="checkbox-line-breaks"
                      />
                      <label
                        htmlFor="line-breaks"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Remove line breaks
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="symbols"
                        checked={options.symbols}
                        onCheckedChange={() => toggleOption('symbols')}
                        data-testid="checkbox-symbols"
                      />
                      <label
                        htmlFor="symbols"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Remove symbols
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="numbers"
                        checked={options.numbers}
                        onCheckedChange={() => toggleOption('numbers')}
                        data-testid="checkbox-numbers"
                      />
                      <label
                        htmlFor="numbers"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Remove numbers
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emojis"
                        checked={options.emojis}
                        onCheckedChange={() => toggleOption('emojis')}
                        data-testid="checkbox-emojis"
                      />
                      <label
                        htmlFor="emojis"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Remove emojis
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="lowercase"
                        checked={options.toLowerCase}
                        onCheckedChange={() => toggleOption('toLowerCase')}
                        data-testid="checkbox-lowercase"
                      />
                      <label
                        htmlFor="lowercase"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Convert to lowercase
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="uppercase"
                        checked={options.toUpperCase}
                        onCheckedChange={() => toggleOption('toUpperCase')}
                        data-testid="checkbox-uppercase"
                      />
                      <label
                        htmlFor="uppercase"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Convert to UPPERCASE
                      </label>
                    </div>
                  </div>
                </div>

                <Button onClick={cleanText} className="w-full" size="lg" data-testid="button-clean">
                  <Eraser className="mr-2 h-5 w-5" />
                  Clean Text
                </Button>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="output-text">Cleaned Text</Label>
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
                      className="min-h-[200px] bg-muted/50"
                      data-testid="output-text"
                    />
                    <p className="text-sm text-muted-foreground">
                      {outputText.length} characters
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">About Text Cleaner</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Paste text → choose cleaning options → get instant clean output. Perfect for writers, editors & students.
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
        </div>
      </div>
    </>
  );
}
