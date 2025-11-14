import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Shuffle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const SENTENCE_TEMPLATES = [
  "The quick brown fox jumps over the lazy dog.",
  "Every cloud has a silver lining.",
  "Actions speak louder than words.",
  "Time flies when you're having fun.",
  "Knowledge is power.",
  "Practice makes perfect.",
  "Where there's a will, there's a way.",
  "The early bird catches the worm.",
  "You can't judge a book by its cover.",
  "All that glitters is not gold.",
  "Better late than never.",
  "Don't put all your eggs in one basket.",
  "Fortune favors the bold.",
  "The pen is mightier than the sword.",
  "A picture is worth a thousand words.",
  "When in Rome, do as the Romans do.",
  "Absence makes the heart grow fonder.",
  "Birds of a feather flock together.",
  "Curiosity killed the cat.",
  "Every dog has its day.",
];

export default function RandomSentenceGenerator() {
  const [generatedSentence, setGeneratedSentence] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Random Sentence Generator | AI-Free Static Sentences",
    description: "Generate random sentences from pre-loaded static templates. Zero AI, fully offline.",
    keywords: "random sentence, sentence generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-sentence-generator",
  });

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * SENTENCE_TEMPLATES.length);
    const sentence = SENTENCE_TEMPLATES[randomIndex];
    setGeneratedSentence(sentence);
    
    toast({
      title: "Generated!",
      description: "Random sentence generated",
    });
  };

  const copyToClipboard = async () => {
    if (!generatedSentence) return;
    await navigator.clipboard.writeText(generatedSentence);
    toast({
      title: "Copied!",
      description: "Sentence copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Click the button to get a random sentence" },
    { step: 2, title: "View Result", description: "See your randomly selected sentence" },
    { step: 3, title: "Copy", description: "Copy to clipboard if needed" },
  ];

  const benefits = [
    { icon: <Shuffle className="h-5 w-5" />, title: "Instant Generation", description: "Get sentences in milliseconds" },
    { icon: <Copy className="h-5 w-5" />, title: "No AI", description: "Pre-loaded templates, no API calls" },
    { icon: <Shuffle className="h-5 w-5" />, title: "Fully Offline", description: "Works without internet connection" },
  ];

  const faqs = [
    {
      question: "How many sentences are available?",
      answer: "We have 20 pre-loaded sentence templates including famous quotes and common phrases.",
    },
    {
      question: "Is this AI-generated?",
      answer: "No, all sentences are pre-written static templates. No AI or API calls are used.",
    },
    {
      question: "Can I generate multiple at once?",
      answer: "Currently generates one sentence at a time. Click generate multiple times for more sentences.",
    },
  ];

  const toolContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <Button 
          onClick={handleGenerate} 
          className="w-full" 
          size="lg"
          data-testid="button-generate"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Generate Random Sentence
        </Button>

        {generatedSentence && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Generated Sentence</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={generatedSentence}
              readOnly
              className="min-h-[100px] text-lg"
            />
            <Button 
              onClick={copyToClipboard} 
              variant="outline" 
              className="w-full mt-2"
              data-testid="button-copy"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-semibold mb-2">Sample Sentences Available:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Famous quotes and proverbs</li>
            <li>Common English phrases</li>
            <li>Pangrams and typing practice sentences</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Random Sentence Generator"
      description="Generate random sentences from pre-loaded static templates. Zero AI, fully offline."
      icon={<Shuffle className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
