import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Minimize2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function HTMLMinifier() {
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [minifiedHTML, setMinifiedHTML] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "HTML Minifier | Remove Whitespace from HTML",
    description: "Minify HTML by removing whitespace, tabs and blank lines.",
    keywords: "html minifier, compress html",
    canonicalUrl: "https://tools.pixocraft.in/tools/html-minifier",
  });

  const minifyHTML = () => {
    if (!htmlInput) {
      toast({
        title: "Enter HTML",
        description: "Please enter HTML code to minify",
        variant: "destructive",
      });
      return;
    }

    const minified = htmlInput
      .replace(/\n/g, "")
      .replace(/[\t ]+</g, "<")
      .replace(/>[\t ]+</g, "><")
      .replace(/>[\t ]+$/g, ">")
      .replace(/^\s+/g, "")
      .replace(/\s+$/g, "");

    setMinifiedHTML(minified);
    
    const originalSize = new Blob([htmlInput]).size;
    const minifiedSize = new Blob([minified]).size;
    const reduction = Math.round(((originalSize - minifiedSize) / originalSize) * 100);
    
    toast({
      title: "Minified!",
      description: `Reduced by ${reduction}%`,
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(minifiedHTML);
    toast({
      title: "Copied!",
      description: "Minified HTML copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Paste HTML", description: "Enter your HTML code" },
    { step: 2, title: "Minify", description: "Click minify to remove whitespace" },
    { step: 3, title: "Copy", description: "Copy the minified code" },
  ];

  const benefits = [
    { icon: <Minimize2 className="h-5 w-5" />, title: "Reduce Size", description: "Remove unnecessary whitespace and tabs" },
    { icon: <Copy className="h-5 w-5" />, title: "Fast", description: "Instant minification in your browser" },
    { icon: <Minimize2 className="h-5 w-5" />, title: "Offline", description: "Works completely offline" },
  ];

  const faqs = [
    {
      question: "What does HTML minification do?",
      answer: "HTML minification removes whitespace, tabs, and line breaks from HTML code to reduce file size while preserving functionality.",
    },
    {
      question: "Will this break my HTML?",
      answer: "No, minification only removes whitespace and doesn't change the structure or functionality of your HTML.",
    },
    {
      question: "How much can I reduce file size?",
      answer: "Typically 10-30% reduction depending on how much whitespace your original HTML contains.",
    },
  ];

  return (
    <ToolLayout
      title="HTML Minifier"
      description="Minify HTML by removing whitespace, tabs and blank lines."
      icon={<Minimize2 className="h-8 w-8" />}
      toolId="html-minifier"
      category="text"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="html-input" className="text-base font-semibold">
              HTML Input
            </Label>
            <Textarea
              id="html-input"
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="<div>&#10;  <p>Hello World</p>&#10;</div>"
              className="min-h-[200px] font-mono"
              data-testid="textarea-html-input"
            />
          </div>

          <Button
            onClick={minifyHTML}
            size="lg"
            disabled={!htmlInput}
            data-testid="button-minify"
          >
            <Minimize2 className="mr-2 h-5 w-5" />
            Minify HTML
          </Button>
        </div>

        {minifiedHTML && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Minified HTML ({minifiedHTML.length} characters)
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
              value={minifiedHTML}
              readOnly
              className="min-h-[200px] font-mono"
              data-testid="textarea-output"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
