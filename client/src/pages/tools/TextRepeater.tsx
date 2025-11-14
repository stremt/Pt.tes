import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Repeat, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function TextRepeater() {
  const [inputText, setInputText] = useState<string>("");
  const [repeatCount, setRepeatCount] = useState<number>(10);
  const [separator, setSeparator] = useState<string>("\n");
  const [repeatedText, setRepeatedText] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Text Repeater Online | Repeat Text Unlimited Times | Pixocraft Tools",
    description: "Repeat any text multiple times instantly. Fast, free, offline and perfect for creators.",
    keywords: "text repeater, repeat text tool, repeat generator, duplicate text",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-repeater",
  });

  const handleRepeat = () => {
    if (!inputText) {
      toast({
        title: "Enter Text",
        description: "Please enter some text to repeat",
        variant: "destructive",
      });
      return;
    }

    const count = Math.min(Math.max(1, repeatCount), 10000);
    const repeated = Array(count).fill(inputText).join(separator);
    setRepeatedText(repeated);
    
    toast({
      title: "Text Repeated!",
      description: `Repeated ${count} times`,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(repeatedText);
    toast({
      title: "Copied!",
      description: "Repeated text copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Enter Text", description: "Type the text you want to repeat" },
    { step: 2, title: "Set Count", description: "Choose how many times to repeat (1-10,000)" },
    { step: 3, title: "Customize", description: "Select separator (newline, space, or custom)" },
  ];

  const benefits = [
    { icon: <Repeat className="h-5 w-5" />, title: "Unlimited Repeats", description: "Repeat up to 10,000 times instantly" },
    { icon: <Copy className="h-5 w-5" />, title: "Custom Separator", description: "Choose newline, space, or any custom separator" },
    { icon: <Repeat className="h-5 w-5" />, title: "Instant Results", description: "Generate repeated text in milliseconds" },
  ];

  const faqs = [
    {
      question: "What is the maximum repeat count?",
      answer: "You can repeat text up to 10,000 times. This limit ensures optimal browser performance.",
    },
    {
      question: "Can I use custom separators?",
      answer: "Yes! You can use newline (default), space, comma, or any custom text as a separator.",
    },
    {
      question: "What can I use this for?",
      answer: "Text repetition is useful for social media posts, testing, data generation, creative writing, and more.",
    },
  ];

  return (
    <ToolLayout
      title="Text Repeater"
      description="Repeat any text multiple times instantly. Fast, free, offline and perfect for creators."
      icon={<Repeat className="h-8 w-8" />}
      toolId="text-repeater"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-text" className="text-base font-semibold">
              Text to Repeat
            </Label>
            <Textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to repeat..."
              className="min-h-[100px]"
              data-testid="textarea-input"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="repeat-count" className="text-base font-semibold">
                Repeat Count (1-10,000)
              </Label>
              <Input
                id="repeat-count"
                type="number"
                min="1"
                max="10000"
                value={repeatCount}
                onChange={(e) => setRepeatCount(parseInt(e.target.value) || 1)}
                data-testid="input-count"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="separator" className="text-base font-semibold">
                Separator
              </Label>
              <Input
                id="separator"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                placeholder="Separator (e.g., newline, space)"
                data-testid="input-separator"
              />
            </div>
          </div>

          <Button
            onClick={handleRepeat}
            size="lg"
            disabled={!inputText}
            data-testid="button-repeat"
          >
            <Repeat className="mr-2 h-5 w-5" />
            Repeat Text
          </Button>
        </div>

        {repeatedText && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Repeated Text ({repeatedText.length} characters)
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
              value={repeatedText}
              readOnly
              className="min-h-[300px] font-mono text-sm"
              data-testid="textarea-output"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
