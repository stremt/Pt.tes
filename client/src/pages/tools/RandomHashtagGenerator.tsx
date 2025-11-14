import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Hash, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const HASHTAG_POOL = [
  "#instagood", "#photooftheday", "#fashion", "#beautiful", "#happy", 
  "#cute", "#tbt", "#like4like", "#followme", "#picoftheday", "#follow",
  "#me", "#selfie", "#summer", "#art", "#instadaily", "#friends", "#repost",
  "#nature", "#fun", "#style", "#smile", "#food", "#instalike", "#family",
  "#travel", "#fitness", "#igers", "#tagsforlikes", "#follow4follow",
  "#nofilter", "#life", "#beauty", "#amazing", "#instamood", "#instagram",
  "#photography", "#vsco", "#sun", "#photo", "#music", "#beach", "#followforfollow",
  "#bestoftheday", "#sky", "#sunset", "#dog", "#motivation", "#design",
  "#lifestyle", "#inspiration", "#goals", "#entrepreneur", "#love", "#trending",
  "#viral", "#explore", "#fyp", "#foryou", "#mood", "#vibes"
];

export default function RandomHashtagGenerator() {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const { toast } = useToast();

  useSEO({
    title: "Hashtag Generator | Random Trending Hashtags",
    description: "Generate random hashtags from a preloaded static list.",
    keywords: "hashtag generator, random hashtags",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-hashtag-generator",
  });

  const handleGenerate = () => {
    const shuffled = [...HASHTAG_POOL].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    setHashtags(selected);
    
    toast({
      title: "Generated!",
      description: "10 random hashtags selected",
    });
  };

  const copyToClipboard = async () => {
    if (hashtags.length === 0) return;
    const text = hashtags.join(' ');
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Hashtags copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get 10 random hashtags instantly" },
    { step: 2, title: "View Selection", description: "See your randomly selected hashtags" },
    { step: 3, title: "Copy", description: "Copy all hashtags with one click" },
  ];

  const benefits = [
    { icon: <Hash className="h-5 w-5" />, title: "Trending Tags", description: "Popular and trending hashtags" },
    { icon: <RefreshCw className="h-5 w-5" />, title: "Instant Selection", description: "10 hashtags in milliseconds" },
    { icon: <Copy className="h-5 w-5" />, title: "Easy Copy", description: "Copy all at once" },
  ];

  const faqs = [
    {
      question: "How many hashtags are generated?",
      answer: "Each click generates 10 random hashtags from our curated list of popular tags.",
    },
    {
      question: "Can I generate more?",
      answer: "Simply click generate again to get a new random set of 10 hashtags.",
    },
    {
      question: "Are these real trending hashtags?",
      answer: "Yes, these are popular and commonly used hashtags across social media platforms.",
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
          Generate 10 Random Hashtags
        </Button>

        {hashtags.length > 0 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label data-testid="label-output">Generated Hashtags</Label>
                <div className="flex flex-wrap gap-2 mt-3" data-testid="list-hashtags">
                  {hashtags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                      data-testid={`hashtag-${index}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Button 
                onClick={copyToClipboard} 
                variant="outline" 
                className="w-full"
                data-testid="button-copy"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy All Hashtags
              </Button>
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="font-semibold mb-2">Pool includes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>60+ popular hashtags</li>
            <li>Trending social media tags</li>
            <li>General purpose tags for engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Random Hashtag Generator"
      description="Generate random hashtags from a preloaded static list."
      icon={<Hash className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
