import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Shuffle, Copy } from "lucide-react";

const WORD_BANK = [
  'adventure', 'amazing', 'beautiful', 'brilliant', 'creative', 'dynamic', 'elegant', 'fantastic',
  'gorgeous', 'incredible', 'joyful', 'magnificent', 'outstanding', 'perfect', 'radiant', 'spectacular',
  'stunning', 'wonderful', 'apple', 'banana', 'cherry', 'dragon', 'elephant', 'forest', 'galaxy',
  'harmony', 'island', 'jungle', 'kingdom', 'lighthouse', 'mountain', 'nebula', 'ocean', 'paradise',
  'quantum', 'rainbow', 'sunshine', 'thunder', 'universe', 'velocity', 'whisper', 'xylophone', 'yellow',
  'zenith', 'challenge', 'discover', 'explore', 'freedom', 'growth', 'happiness', 'innovation', 'journey',
  'knowledge', 'learning', 'mindful', 'natural', 'optimism', 'peaceful', 'quality', 'resilient', 'serenity',
  'transform', 'unique', 'vibrant', 'wisdom', 'excellence', 'zeal', 'acoustic', 'brilliant', 'cascade',
  'digital', 'ethereal', 'fusion', 'gradient', 'horizon', 'illuminate', 'jubilant', 'kinetic', 'luminous',
];

export default function RandomWordGenerator() {
  const [wordCount, setWordCount] = useState([3]);
  const [words, setWords] = useState<string[]>([]);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Random Word Generator | Generate Random Words | Pixocraft Tools",
    description: "Generate random words instantly for brainstorming & creativity.",
    keywords: "random word generator, word randomizer",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-word-generator",
  });

  const generateWords = () => {
    const newWords: string[] = [];
    for (let i = 0; i < wordCount[0]; i++) {
      const randomWord = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
      newWords.push(randomWord);
    }
    setWords(newWords);
  };

  const wordsText = words.join(', ');

  return (
    <ToolLayout
      title="Random Word Generator"
      description="Generate random words for brainstorming and inspiration."
      icon={<Shuffle className="h-10 w-10 text-primary" />}
      toolId="random-word-generator"
      category="Text & Writing"
      howItWorks={[
        { step: 1, title: "Choose Count", description: "Select how many words to generate." },
        { step: 2, title: "Generate", description: "Click to get random words instantly." },
        { step: 3, title: "Copy & Use", description: "Use for brainstorming or creativity!" },
      ]}
      benefits={[
        { icon: <Shuffle className="h-6 w-6 text-primary" />, title: "Inspiration", description: "Perfect for writing prompts and ideas." },
      ]}
      faqs={[
        { question: "How many words can I generate?", answer: "Generate from 1 to 10 words at a time." },
        { question: "Are the words real?", answer: "Yes! All words come from a curated dictionary of common English words." },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Generator Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Number of Words: {wordCount[0]}</Label>
              <Slider
                value={wordCount}
                onValueChange={setWordCount}
                min={1}
                max={10}
                step={1}
                className="mt-2"
                data-testid="slider-word-count"
              />
            </div>
            <Button size="lg" onClick={generateWords} className="w-full" data-testid="button-generate">
              <Shuffle className="h-5 w-5 mr-2" />
              Generate Random Words
            </Button>
          </CardContent>
        </Card>

        {words.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Words</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(wordsText, "Words copied!")}
                  data-testid="button-copy"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {words.map((word, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-primary/10 border border-primary rounded-lg text-lg font-medium"
                    data-testid={`word-${index}`}
                  >
                    {word}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-mono" data-testid="words-text">{wordsText}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
