import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Code, ArrowRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function HTMLEncoderDecoder() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { toast } = useToast();

  useSEO({
    title: "HTML Encoder Decoder Online | Convert HTML Entities Instantly | Pixocraft Tools",
    description: "Encode or decode HTML characters instantly. Perfect for developers, SEO and editors.",
    keywords: "html encoder, html decoder, html escape characters, encode html, decode html",
    canonicalUrl: "https://tools.pixocraft.in/tools/html-encoder-decoder",
  });

  const encodeHTML = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const decodeHTML = (text: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  const handleEncode = () => {
    const encoded = encodeHTML(inputText);
    setOutputText(encoded);
    setMode('encode');
    toast({
      title: "HTML Encoded!",
      description: "Your text has been HTML encoded",
    });
  };

  const handleDecode = () => {
    const decoded = decodeHTML(inputText);
    setOutputText(decoded);
    setMode('decode');
    toast({
      title: "HTML Decoded!",
      description: "Your text has been HTML decoded",
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste HTML", description: "Enter or paste your HTML text or code" },
    { step: 2, title: "Choose Action", description: "Select encode to escape or decode to restore" },
    { step: 3, title: "Get Result", description: "Copy the converted HTML instantly" },
  ];

  const benefits = [
    { icon: <Code className="h-5 w-5" />, title: "Bidirectional", description: "Both encode and decode HTML entities" },
    { icon: <ArrowRight className="h-5 w-5" />, title: "Instant", description: "Real-time conversion as you type" },
    { icon: <Copy className="h-5 w-5" />, title: "Developer-Friendly", description: "Perfect for web development and SEO" },
  ];

  const faqs = [
    {
      question: "When should I encode HTML?",
      answer: "Encode HTML when you need to display code as text on a webpage, or when inserting user content to prevent XSS attacks.",
    },
    {
      question: "What characters are encoded?",
      answer: "Common characters like <, >, &, quotes, and apostrophes are converted to their HTML entity equivalents (&lt;, &gt;, &amp;, etc.).",
    },
    {
      question: "Is this tool safe to use?",
      answer: "Yes, all processing happens in your browser. Nothing is sent to any server.",
    },
  ];

  return (
    <ToolLayout
      title="HTML Encoder/Decoder"
      description="Encode or decode HTML characters instantly. Perfect for developers, SEO and editors."
      icon={<Code className="h-8 w-8" />}
      toolId="html-encoder-decoder"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="input-text" className="text-base font-semibold">
            Input Text
          </Label>
          <Textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter or paste your HTML text here..."
            className="min-h-[200px] font-mono text-sm"
            data-testid="textarea-input"
          />
          <div className="flex gap-3">
            <Button
              onClick={handleEncode}
              size="lg"
              disabled={!inputText}
              data-testid="button-encode"
            >
              Encode HTML
            </Button>
            <Button
              onClick={handleDecode}
              size="lg"
              variant="outline"
              disabled={!inputText}
              data-testid="button-decode"
            >
              Decode HTML
            </Button>
          </div>
        </div>

        {outputText && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Output ({mode === 'encode' ? 'Encoded' : 'Decoded'})
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
              value={outputText}
              readOnly
              className="min-h-[200px] font-mono text-sm"
              data-testid="textarea-output"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
