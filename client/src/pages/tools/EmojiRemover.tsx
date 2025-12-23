import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Smile, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function EmojiRemover() {
  const [inputText, setInputText] = useState<string>("");
  const [cleanedText, setCleanedText] = useState<string>("");
  const [emojiCount, setEmojiCount] = useState<number>(0);
  const { toast } = useToast();

  useSEO({
    title: "Emoji Remover Online | Clean Text Free & Fast | Pixocraft Tools",
    description: "Paste or type text and remove all emojis instantly. Perfect for professionals & writers.",
    keywords: "emoji remover, remove emojis, clean text tool, emoji delete, strip emojis",
    canonicalUrl: "https://tools.pixocraft.in/tools/emoji-remover",
  });

  const removeEmojis = () => {
    // Regex to match emojis and emoji modifiers
    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\uD83C-\uD83E][\uDC00-\uDFFF]/g;
    
    const originalLength = (inputText.match(emojiRegex) || []).length;
    const cleaned = inputText.replace(emojiRegex, '');
    
    setCleanedText(cleaned);
    setEmojiCount(originalLength);
    
    toast({
      title: "Emojis Removed!",
      description: `Removed ${originalLength} emoji${originalLength !== 1 ? 's' : ''}`,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(cleanedText);
    toast({
      title: "Copied!",
      description: "Clean text copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter or paste text containing emojis" },
    { step: 2, title: "Remove Emojis", description: "Click to strip all emojis from your text" },
    { step: 3, title: "Copy Clean Text", description: "Get emoji-free text ready for professional use" },
  ];

  const benefits = [
    { icon: <Smile className="h-5 w-5" />, title: "All Emojis", description: "Removes all Unicode emojis including latest versions" },
    { icon: <Trash2 className="h-5 w-5" />, title: "Instant Clean", description: "Remove emojis in milliseconds" },
    { icon: <Copy className="h-5 w-5" />, title: "Professional", description: "Perfect for resumes, articles, and documents" },
  ];

  const faqs = [
    {
      question: "What types of emojis are removed?",
      answer: "All Unicode emojis including smileys, symbols, flags, and emoji combinations are removed.",
    },
    {
      question: "Will other characters be affected?",
      answer: "No, only emojis are removed. All other text, numbers, punctuation, and special characters remain intact.",
    },
    {
      question: "Can I remove specific emojis only?",
      answer: "Currently the tool removes all emojis. For selective removal, you can manually edit the output text.",
    },
  ];

  return (
    <ToolLayout
      title="Emoji Remover"
      description="Paste or type text and remove all emojis instantly. Perfect for professionals & writers."
      icon={<Smile className="h-8 w-8" />}
      toolId="emoji-remover"
      category="text"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="input-text" className="text-base font-semibold">
            Text with Emojis
          </Label>
          <Textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text with emojis here... 😊🎉✨"
            className="min-h-[200px]"
            data-testid="textarea-input"
          />
          <Button
            onClick={removeEmojis}
            size="lg"
            disabled={!inputText}
            data-testid="button-remove-emojis"
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Remove All Emojis
          </Button>
        </div>

        {cleanedText && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Clean Text ({emojiCount} emoji{emojiCount !== 1 ? 's' : ''} removed)
              </Label>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                data-testid="button-copy"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea
              value={cleanedText}
              readOnly
              className="min-h-[200px]"
              data-testid="textarea-output"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
