import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Smile, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function EmojiCounter() {
  const [inputText, setInputText] = useState<string>("");
  const [emojiCount, setEmojiCount] = useState<number>(0);
  const [uniqueEmojis, setUniqueEmojis] = useState<string[]>([]);
  const { toast } = useToast();

  useSEO({
    title: "Emoji Counter Online | Count Emojis in Text",
    description: "Count how many emojis your text contains. Offline emoji detection.",
    keywords: "emoji counter, count emojis",
    canonicalUrl: "https://tools.pixocraft.in/tools/emoji-counter",
  });

  const handleCount = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter text to count emojis",
        variant: "destructive",
      });
      return;
    }

    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
    const matches = inputText.match(emojiRegex) || [];
    const unique = [...new Set(matches)];
    
    setEmojiCount(matches.length);
    setUniqueEmojis(unique);
    
    toast({
      title: "Counted!",
      description: `Found ${matches.length} emoji${matches.length !== 1 ? 's' : ''}`,
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter text containing emojis" },
    { step: 2, title: "Count", description: "Click to detect and count all emojis" },
    { step: 3, title: "View Results", description: "See total count and unique emojis" },
  ];

  const benefits = [
    { icon: <Smile className="h-5 w-5" />, title: "Accurate Detection", description: "Counts all Unicode emojis" },
    { icon: <Hash className="h-5 w-5" />, title: "Unique List", description: "Shows all unique emojis found" },
    { icon: <Smile className="h-5 w-5" />, title: "Instant Analysis", description: "Count in milliseconds" },
  ];

  const faqs = [
    {
      question: "What emojis are detected?",
      answer: "All standard Unicode emojis including faces, animals, food, flags, symbols, and more are detected.",
    },
    {
      question: "Does it count duplicates?",
      answer: "Yes, the total count includes all emoji occurrences. We also show a list of unique emojis separately.",
    },
    {
      question: "What about emoticons like :) ?",
      answer: "Emoticons (text-based faces) are not counted. Only actual Unicode emoji characters are detected.",
    },
  ];

  const toolContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="input-text" data-testid="label-input">Input Text</Label>
          <Textarea
            id="input-text"
            data-testid="input-text"
            placeholder="Enter or paste text with emojis... 😀 🎉 ❤️"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <Button 
          onClick={handleCount} 
          className="w-full" 
          data-testid="button-count"
        >
          <Hash className="mr-2 h-4 w-4" />
          Count Emojis
        </Button>

        {emojiCount > 0 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2" data-testid="text-total">Total Emojis</h3>
                <p className="text-4xl font-bold text-primary" data-testid="count-total">{emojiCount}</p>
              </div>

              {uniqueEmojis.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-unique">
                    Unique Emojis ({uniqueEmojis.length})
                  </h3>
                  <div className="flex flex-wrap gap-2" data-testid="list-unique">
                    {uniqueEmojis.map((emoji, index) => (
                      <span 
                        key={index} 
                        className="text-3xl bg-muted p-2 rounded"
                        data-testid={`emoji-${index}`}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Text Tools", url: "/tools/text" },
            { label: "Emoji Counter" },
          ]}
        />
      </div>
      <ToolLayout
        title="Emoji Counter"
        description="Count how many emojis your text contains. Offline emoji detection."
        icon={<Smile className="h-6 w-6" />}
        toolId="emoji-counter"
        category="Text & Writing"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        {toolContent}
      </ToolLayout>
    </>
  );
}
