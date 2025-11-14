import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Instagram, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CAPTION_POOL = [
  "Living my best life 🌟",
  "Good vibes only ✨",
  "Making memories 📸",
  "Chasing dreams and sunsets 🌅",
  "Stay wild, moon child 🌙",
  "Collect moments, not things 💫",
  "Find me where the wild things are 🌿",
  "Adventure awaits 🗺️",
  "Sunshine mixed with a little hurricane ☀️",
  "Life is short, make it sweet 🍭",
  "Creating my own sunshine ☀️",
  "Just another magic Monday ✨",
  "Weekend vibes loading... 🎉",
  "Be a voice, not an echo 🎤",
  "Dream without fear, love without limits 💕",
  "Take only pictures, leave only footprints 👣",
  "She believed she could, so she did 💪",
  "Happiness looks gorgeous on me 😊",
  "Catch flights, not feelings ✈️",
  "Do more things that make you forget to check your phone 📵",
  "Life happens, coffee helps ☕",
  "Sunkissed and blessed 🌞",
  "But first, coffee ☕",
  "Confidence level: selfie with no filter 📸",
  "Living in my own little world 🌍",
  "Finding paradise wherever I go 🏝️",
  "Making today so awesome, yesterday gets jealous 🎯",
  "Less perfection, more authenticity 💯",
  "Focused on my goals 🎯",
  "Grateful for every moment 🙏",
];

export default function InstagramCaptionGenerator() {
  const [generatedCaption, setGeneratedCaption] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Instagram Caption Generator | Offline Caption Ideas",
    description: "Get static preloaded captions for Instagram posts. No AI required.",
    keywords: "caption generator, instagram captions",
    canonicalUrl: "https://tools.pixocraft.in/tools/instagram-caption-generator",
  });

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * CAPTION_POOL.length);
    const caption = CAPTION_POOL[randomIndex];
    setGeneratedCaption(caption);
    
    toast({
      title: "Caption Generated!",
      description: "Perfect for your next post",
    });
  };

  const copyToClipboard = async () => {
    if (!generatedCaption) return;
    await navigator.clipboard.writeText(generatedCaption);
    toast({
      title: "Copied!",
      description: "Caption copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get a random caption instantly" },
    { step: 2, title: "View Caption", description: "See your Instagram caption idea" },
    { step: 3, title: "Copy & Post", description: "Use it in your Instagram post" },
  ];

  const benefits = [
    { icon: <Instagram className="h-5 w-5" />, title: "Ready to Use", description: "Pre-written captions with emojis" },
    { icon: <RefreshCw className="h-5 w-5" />, title: "Variety", description: "30+ different caption styles" },
    { icon: <Copy className="h-5 w-5" />, title: "No AI", description: "Static templates, fully offline" },
  ];

  const faqs = [
    {
      question: "How many captions are available?",
      answer: "We have 30+ pre-written captions covering various moods and themes - from motivational to fun and casual.",
    },
    {
      question: "Can I customize the captions?",
      answer: "Yes! Copy the caption and edit it as needed before posting to Instagram.",
    },
    {
      question: "Are emojis included?",
      answer: "Yes, most captions include relevant emojis to make your posts more engaging.",
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
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Caption
        </Button>

        {generatedCaption && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Your Caption</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={generatedCaption}
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
              Copy Caption
            </Button>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-semibold mb-2">Caption Categories:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Motivational & Inspirational</li>
            <li>Travel & Adventure</li>
            <li>Lifestyle & Daily Vibes</li>
            <li>Fun & Casual</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Instagram Caption Generator"
      description="Get static preloaded captions for Instagram posts. No AI required."
      icon={<Instagram className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
