import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Flame, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ROAST_POOL = [
  "You're like a software update - nobody asked for you, but you're here anyway.",
  "I'd agree with you, but then we'd both be wrong.",
  "You're proof that evolution can go in reverse.",
  "If laughter is the best medicine, your face must be curing the world.",
  "You're not stupid; you just have bad luck when thinking.",
  "I'm not saying you're dumb, but you have the intellectual capacity of a rock.",
  "You bring everyone so much joy... when you leave the room.",
  "I'd explain it to you, but I left my crayons at home.",
  "You're like a cloud. When you disappear, it's a beautiful day.",
  "Somewhere out there is a tree tirelessly producing oxygen so you can breathe. I think you owe it an apology.",
  "You're not the dumbest person alive, but you better hope they don't die.",
  "I would challenge you to a battle of wits, but I see you came unarmed.",
  "You're the human equivalent of a participation award.",
  "I'm jealous of people who don't know you.",
  "You have the perfect face for radio.",
  "If I had a dollar for every smart thing you say, I'd be broke.",
  "You're like a penny: two-faced and worthless.",
  "I was going to give you a nasty look, but I see you already have one.",
  "You're so fake, even Barbie is jealous.",
  "Light travels faster than sound, which is why you seemed bright until you spoke.",
];

export default function FunnyRoastGenerator() {
  const [generatedRoast, setGeneratedRoast] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Roast Generator | Funny Roast Lines",
    description: "Generate fun roast lines from a static offline list.",
    keywords: "roast generator, funny roast lines",
    canonicalUrl: "https://tools.pixocraft.in/tools/funny-roast-generator",
  });

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * ROAST_POOL.length);
    const roast = ROAST_POOL[randomIndex];
    setGeneratedRoast(roast);
    
    toast({
      title: "Roasted! 🔥",
      description: "Use with caution!",
    });
  };

  const copyToClipboard = async () => {
    if (!generatedRoast) return;
    await navigator.clipboard.writeText(generatedRoast);
    toast({
      title: "Copied!",
      description: "Roast copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get a random roast line" },
    { step: 2, title: "Read & Laugh", description: "Enjoy the witty comeback" },
    { step: 3, title: "Share (Carefully)", description: "Use in friendly banter" },
  ];

  const benefits = [
    { icon: <Flame className="h-5 w-5" />, title: "Witty Lines", description: "Clever and funny roasts" },
    { icon: <RefreshCw className="h-5 w-5" />, title: "Variety", description: "20+ different roast styles" },
    { icon: <Copy className="h-5 w-5" />, title: "Offline Fun", description: "No internet needed" },
  ];

  const faqs = [
    {
      question: "Are these roasts mean?",
      answer: "These are lighthearted, funny roasts meant for friendly banter. Use them responsibly and only with friends who appreciate humor!",
    },
    {
      question: "Can I generate multiple roasts?",
      answer: "Yes! Click generate as many times as you want to get different roasts.",
    },
    {
      question: "Should I use these on strangers?",
      answer: "No! These are meant for playful, friendly exchanges with people who understand the humor. Be respectful!",
    },
  ];

  const toolContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-sm">
          <p className="font-semibold text-warning mb-1">⚠️ Friendly Reminder</p>
          <p className="text-muted-foreground">
            These roasts are for fun and friendly banter only. Always be kind and respectful!
          </p>
        </div>

        <Button 
          onClick={handleGenerate} 
          className="w-full" 
          size="lg"
          data-testid="button-generate"
        >
          <Flame className="mr-2 h-4 w-4" />
          Generate Roast
        </Button>

        {generatedRoast && (
          <div>
            <Label htmlFor="output-text" data-testid="label-output">Your Roast 🔥</Label>
            <Textarea
              id="output-text"
              data-testid="output-text"
              value={generatedRoast}
              readOnly
              className="min-h-[120px] text-lg"
            />
            <Button 
              onClick={copyToClipboard} 
              variant="outline" 
              className="w-full mt-2"
              data-testid="button-copy"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Roast
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Funny Roast Generator"
      description="Generate fun roast lines from a static offline list."
      icon={<Flame className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
