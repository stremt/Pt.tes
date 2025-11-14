import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function PalindromeChecker() {
  const [input, setInput] = useState("");
  const [ignoreSpaces, setIgnoreSpaces] = useState(true);
  const [result, setResult] = useState<boolean | null>(null);

  useSEO({
    title: "Palindrome Checker Online | Check Word or Sentence | Pixocraft Tools",
    description: "Check if a word or sentence is palindrome. Fast, offline & accurate.",
    keywords: "palindrome checker, word palindrome, check palindrome",
    canonicalUrl: "https://tools.pixocraft.in/tools/palindrome-checker",
  });

  const checkPalindrome = () => {
    let text = input.toLowerCase();
    
    if (ignoreSpaces) {
      text = text.replace(/[^a-z0-9]/g, "");
    }

    const reversed = text.split("").reverse().join("");
    setResult(text === reversed && text.length > 0);
  };

  const howItWorks = [
    { step: 1, title: "Enter Text", description: "Type word or sentence to check" },
    { step: 2, title: "Check Options", description: "Choose to ignore spaces/punctuation" },
    { step: 3, title: "Get Result", description: "Instantly see if it's a palindrome" },
  ];

  const benefits = [
    { icon: <Repeat2 className="h-5 w-5" />, title: "Ignore Spaces", description: "Optional space & punctuation ignore" },
    { icon: <Repeat2 className="h-5 w-5" />, title: "Fast Check", description: "Instant palindrome detection" },
    { icon: <Repeat2 className="h-5 w-5" />, title: "Fun & Educational", description: "Perfect for students & word games" },
    { icon: <Repeat2 className="h-5 w-5" />, title: "100% Accurate", description: "Reliable palindrome checking" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it ignore spaces?",
      answer: "Yes — optional ignore mode. You can check palindromes with or without ignoring spaces and punctuation. 'A man a plan a canal Panama' is a palindrome when spaces are ignored."
    },
    {
      question: "What are some examples of palindromes?",
      answer: "Single words: 'racecar', 'level', 'radar', 'noon'. Sentences: 'Was it a car or a cat I saw?', 'Madam', 'Never odd or even'. Numbers: 121, 12321."
    },
    {
      question: "Is the check case-sensitive?",
      answer: "No, our palindrome checker is case-insensitive. 'RaceCar' and 'racecar' are both recognized as palindromes."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Palindrome Checker"
        description="Enter a word/sentence → check instantly if it's a palindrome. Perfect for students & fun word games."
        icon={<Repeat2 className="h-8 w-8" />}
        toolId="palindrome-checker"
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
          <span className="text-foreground">Palindrome Checker</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkPalindrome()}
              placeholder="Enter word or sentence to check..."
              data-testid="input-text"
            />

            <div className="flex items-center gap-2">
              <Switch
                id="ignore-spaces"
                checked={ignoreSpaces}
                onCheckedChange={setIgnoreSpaces}
                data-testid="switch-ignore-spaces"
              />
              <Label htmlFor="ignore-spaces" className="cursor-pointer">
                Ignore spaces and punctuation
              </Label>
            </div>

            <Button
              onClick={checkPalindrome}
              disabled={!input.trim()}
              size="lg"
              className="w-full"
              data-testid="button-check"
            >
              <Repeat2 className="mr-2 h-5 w-5" />
              Check Palindrome
            </Button>
          </div>

          {result !== null && (
            <Card>
              <CardContent className="p-8 text-center">
                {result ? (
                  <div className="space-y-4">
                    <div className="text-6xl">✅</div>
                    <h3 className="text-2xl font-bold text-chart-3" data-testid="text-result-yes">
                      Yes, it's a palindrome!
                    </h3>
                    <p className="text-muted-foreground">
                      "{input}" reads the same forwards and backwards
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-6xl">❌</div>
                    <h3 className="text-2xl font-bold text-destructive" data-testid="text-result-no">
                      Not a palindrome
                    </h3>
                    <p className="text-muted-foreground">
                      "{input}" does not read the same forwards and backwards
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
