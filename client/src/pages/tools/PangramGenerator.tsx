import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { CheckCircle, Copy, Shuffle } from "lucide-react";

const PANGRAMS = [
  "The quick brown fox jumps over the lazy dog",
  "Pack my box with five dozen liquor jugs",
  "How vexingly quick daft zebras jump",
  "The five boxing wizards jump quickly",
  "Sphinx of black quartz, judge my vow",
  "Two driven jocks help fax my big quiz",
  "Five quacking zephyrs jolt my wax bed",
  "The jay, pig, fox, zebra and my wolves quack",
  "Crazy Fredrick bought many very exquisite opal jewels",
  "We promptly judged antique ivory buckles for the next prize",
];

export default function PangramGenerator() {
  const [currentPangram, setCurrentPangram] = useState(PANGRAMS[0]);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Pangram Generator | Famous Pangram Collection | Pixocraft Tools",
    description: "Browse famous pangrams (sentences with all alphabet letters).",
    keywords: "pangram generator, alphabet sentences",
    canonicalUrl: "https://tools.pixocraft.in/tools/pangram-generator",
  });

  const getRandomPangram = () => {
    const randomPangram = PANGRAMS[Math.floor(Math.random() * PANGRAMS.length)];
    setCurrentPangram(randomPangram);
  };

  const getUniqueLetters = (text: string): Set<string> => {
    return new Set(text.toLowerCase().replace(/[^a-z]/g, '').split(''));
  };

  const uniqueLetters = getUniqueLetters(currentPangram);
  const isPerfectPangram = uniqueLetters.size === 26;

  return (
    <ToolLayout
      title="Pangram Generator"
      description="Explore famous pangrams and sentences using all alphabet letters."
      icon={<CheckCircle className="h-10 w-10 text-primary" />}
      toolId="pangram-generator"
      category="Text & Writing"
      howItWorks={[
        { step: 1, title: "Click Shuffle", description: "Get a random pangram from the collection." },
        { step: 2, title: "View Pangram", description: "See sentences that use all 26 letters." },
        { step: 3, title: "Copy & Use", description: "Perfect for font testing and design!" },
      ]}
      benefits={[
        { icon: <CheckCircle className="h-6 w-6 text-primary" />, title: "Font Testing", description: "Test all letters in your font designs." },
      ]}
      faqs={[
        { question: "What is a pangram?", answer: "A pangram is a sentence that contains every letter of the alphabet at least once." },
        { question: "Why are pangrams useful?", answer: "Perfect for testing fonts, keyboards, and displaying all alphabet characters." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>Current Pangram</span>
                {isPerfectPangram && (
                  <Badge variant="default">Perfect Pangram</Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(currentPangram, "Pangram copied!")} data-testid="button-copy">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button size="sm" onClick={getRandomPangram} data-testid="button-shuffle">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-8 bg-muted/50 rounded-lg">
              <p className="text-2xl text-center" data-testid="pangram-text">{currentPangram}</p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground">
                Contains {uniqueLetters.size} unique letters
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Pangrams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {PANGRAMS.map((pangram, index) => (
                <div
                  key={index}
                  className={`p-3 rounded cursor-pointer hover-elevate ${
                    pangram === currentPangram ? 'bg-primary/10 border border-primary' : 'bg-muted/50'
                  }`}
                  onClick={() => setCurrentPangram(pangram)}
                  data-testid={`pangram-${index}`}
                >
                  <p className="text-sm">{pangram}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
