import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FileText, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const PARAGRAPH_TEMPLATES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "In a world where technology evolves at lightning speed, staying ahead of the curve requires constant learning and adaptation. The digital landscape offers endless opportunities for those willing to embrace change and innovation.",
  "The art of communication has transformed dramatically in recent years. From handwritten letters to instant messages, the way we connect with one another continues to evolve, shaping our relationships and society as a whole.",
  "Nature has an incredible ability to heal and restore balance. Whether it's a walk in the forest, the sound of ocean waves, or the sight of a mountain vista, the natural world provides solace and inspiration to those who seek it.",
  "Creativity is not just about artistic expression; it's a vital skill in problem-solving and innovation. By thinking outside the box and challenging conventional wisdom, we can discover new solutions to age-old problems.",
  "The journey of a thousand miles begins with a single step. This ancient wisdom reminds us that every great achievement starts with small, consistent actions. Progress may be gradual, but perseverance ultimately leads to success.",
  "Education is the foundation of personal growth and societal advancement. Through learning, we expand our horizons, challenge our assumptions, and develop the skills necessary to navigate an ever-changing world.",
  "Collaboration brings together diverse perspectives and talents to achieve common goals. When people work together, combining their unique strengths and ideas, they can accomplish far more than any individual could alone.",
  "Time is our most valuable resource, yet we often take it for granted. How we choose to spend our days ultimately shapes our lives, making mindful time management essential for achieving our dreams and maintaining balance.",
  "The power of a positive mindset cannot be underestimated. Our thoughts shape our reality, influencing how we perceive challenges and opportunities. By cultivating optimism and resilience, we can overcome obstacles and thrive.",
];

export default function RandomParagraphGenerator() {
  const [generatedParagraph, setGeneratedParagraph] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Random Paragraph Generator | Offline Text Creator",
    description: "Create random paragraphs using offline static placeholder text.",
    keywords: "paragraph generator, lorem ipsum generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-paragraph-generator",
  });

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * PARAGRAPH_TEMPLATES.length);
    const paragraph = PARAGRAPH_TEMPLATES[randomIndex];
    setGeneratedParagraph(paragraph);
    
    toast({
      title: "Generated!",
      description: "Random paragraph created",
    });
  };

  const copyToClipboard = async () => {
    if (!generatedParagraph) return;
    await navigator.clipboard.writeText(generatedParagraph);
    toast({
      title: "Copied!",
      description: "Paragraph copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get a random paragraph instantly" },
    { step: 2, title: "View Result", description: "See your generated placeholder text" },
    { step: 3, title: "Copy", description: "Use it in your projects" },
  ];

  const benefits = [
    { icon: <FileText className="h-5 w-5" />, title: "Instant Creation", description: "Generate paragraphs in milliseconds" },
    { icon: <Copy className="h-5 w-5" />, title: "Variety", description: "Multiple paragraph styles available" },
    { icon: <FileText className="h-5 w-5" />, title: "Offline Ready", description: "Works without internet connection" },
  ];

  const faqs = [
    {
      question: "What types of paragraphs are generated?",
      answer: "We offer a mix of Lorem Ipsum and meaningful placeholder text on various topics like technology, nature, creativity, and more.",
    },
    {
      question: "Is this AI-generated?",
      answer: "No, all paragraphs are pre-written static templates. No AI or API calls are used.",
    },
    {
      question: "Can I use this for commercial projects?",
      answer: "Yes! These paragraphs are free to use as placeholder text in any project.",
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
          <FileText className="mr-2 h-4 w-4" />
          Generate Random Paragraph
        </Button>

        {generatedParagraph && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Generated Paragraph</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={generatedParagraph}
              readOnly
              className="min-h-[150px]"
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
          <p className="font-semibold mb-2">Paragraph Types:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Classic Lorem Ipsum</li>
            <li>Technology and innovation themed</li>
            <li>Nature and wellness focused</li>
            <li>Motivational and inspirational</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Random Paragraph Generator"
      description="Create random paragraphs using offline static placeholder text."
      icon={<FileText className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
