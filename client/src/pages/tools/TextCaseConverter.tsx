import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import {
  toUpperCase,
  toLowerCase,
  toSentenceCase,
  toCapitalCase,
  toTitleCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
} from "@/lib/text-utils";
import { TEXTAREA_HEIGHTS, SCROLLABLE_OUTPUT, BUTTON_LABELS } from "@/lib/ui-constants";
import { Type, Copy, RotateCcw, Zap, Lock, Sparkles, Globe, Check } from "lucide-react";

export default function TextCaseConverter() {
  const [inputText, setInputText] = useState("");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Free Text Case Converter - Convert Text to Any Case",
    description: "Convert text to uppercase, lowercase, title case, camelCase, snake_case, and more. 100% free, instant, offline. Works in your browser.",
    keywords: "text case converter, uppercase, lowercase, title case, camel case, snake case, kebab case, text transform, case converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-case-converter",
  });

  const conversions = [
    { label: "Uppercase", value: toUpperCase(inputText), icon: "ABC" },
    { label: "Lowercase", value: toLowerCase(inputText), icon: "abc" },
    { label: "Sentence case", value: toSentenceCase(inputText), icon: "Abc" },
    { label: "Capital Case", value: toCapitalCase(inputText), icon: "Each Word" },
    { label: "Title Case", value: toTitleCase(inputText), icon: "Title" },
    { label: "camelCase", value: toCamelCase(inputText), icon: "camelCase" },
    { label: "snake_case", value: toSnakeCase(inputText), icon: "snake_case" },
    { label: "kebab-case", value: toKebabCase(inputText), icon: "kebab-case" },
  ];

  return (
    <ToolLayout
      title="Text Case Converter"
      description="Transform your text into any case format instantly. Perfect for developers, writers, and content creators."
      icon={<Type className="h-10 w-10 text-primary" />}
      toolId="text-case-converter"
      category="Writing & Utility"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type or paste your text into the input box." },
        { step: 2, title: "View Conversions", description: "All case formats are generated instantly as you type." },
        { step: 3, title: "Copy Result", description: "Click any conversion to copy it to your clipboard." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Conversion", description: "All formats generated in real-time as you type." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Privacy Focused", description: "All processing happens in your browser. No data sent to servers." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "8+ Formats", description: "Support for uppercase, lowercase, camelCase, snake_case, and more." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Free Forever", description: "No limits, no signup, completely free to use." },
      ]}
      faqs={[
        { question: "What is text case conversion?", answer: "Text case conversion transforms text between different capitalization formats like uppercase (ABC), lowercase (abc), title case (Every Word), camelCase, snake_case, and kebab-case." },
        { question: "What's the difference between Title Case and Capital Case?", answer: "Capital Case capitalizes every word, while Title Case only capitalizes important words (skipping articles like 'a', 'the', 'and', etc.)." },
        { question: "When should I use snake_case vs camelCase?", answer: "snake_case is commonly used in Python, Ruby, and database naming. camelCase is popular in JavaScript, Java, and C#. kebab-case is used in URLs and CSS." },
        { question: "Is my text data safe?", answer: "Yes! All text conversion happens entirely in your browser. No data is sent to our servers or stored anywhere." },
        { question: "Can I convert large amounts of text?", answer: "Yes, there's no limit on the amount of text you can convert. However, very large texts may slow down your browser." },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Enter Your Text</span>
              {inputText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInputText("")}
                  data-testid="button-clear-text"
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
              className={`${TEXTAREA_HEIGHTS.MEDIUM} ${SCROLLABLE_OUTPUT} text-base`}
              data-testid="input-text-case"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {inputText.length} characters • {inputText.trim().split(/\s+/).filter(w => w.length > 0).length} words
            </p>
          </CardContent>
        </Card>

        {/* Conversions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conversions.map((conversion) => (
            <Card
              key={conversion.label}
              className="hover-elevate cursor-pointer transition-all"
              onClick={() => conversion.value && copyToClipboard(conversion.value, `${conversion.label} copied!`)}
              data-testid={`card-conversion-${conversion.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {conversion.label}
                  </Badge>
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-sm font-mono break-words min-h-[60px] max-h-[200px] ${SCROLLABLE_OUTPUT} text-foreground`}>
                  {conversion.value || <span className="text-muted-foreground italic">No text entered</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Box */}
        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Pro Tip</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Click on any converted text box to instantly copy it to your clipboard. Perfect for quickly transforming variable names, file names, or formatting text for different programming languages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
          {/* Category Footer */}
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/text" className="text-primary hover:text-primary/80 transition-colors">Text Tools</Link>
          </p>
      </div>
        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/text" className="text-primary hover:text-primary/80 transition-colors">Text Tools</Link>
        </p>
    </ToolLayout>
  );
}
