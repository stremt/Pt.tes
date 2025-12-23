import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Binary, ArrowLeftRight, Copy, Trash2 } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/layout/ToolLayout";

export default function ASCIIConverter() {
  const [textInput, setTextInput] = useState("");
  const [asciiOutput, setAsciiOutput] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "ASCII to Text Converter | Convert Text ↔ ASCII Instantly | Pixocraft Tools",
    description: "Convert plain text to ASCII codes or decode ASCII to readable text instantly. Clean & offline tool.",
    keywords: "ascii converter, text to ascii, ascii decoder online, ascii encoder, ascii to text",
    canonicalUrl: "https://tools.pixocraft.in/tools/ascii-converter",
  });

  const textToAscii = () => {
    if (!textInput.trim()) {
      toast({ title: "Error", description: "Please enter some text", variant: "destructive" });
      return;
    }
    const ascii = textInput.split('').map(char => char.charCodeAt(0)).join(' ');
    setAsciiOutput(ascii);
  };

  const asciiToText = () => {
    if (!textInput.trim()) {
      toast({ title: "Error", description: "Please enter ASCII codes", variant: "destructive" });
      return;
    }
    try {
      const codes = textInput.split(/\s+/).map(code => parseInt(code));
      const text = codes.map(code => String.fromCharCode(code)).join('');
      setAsciiOutput(text);
    } catch (error) {
      toast({ title: "Error", description: "Invalid ASCII format", variant: "destructive" });
    }
  };

  const copyOutput = () => {
    if (asciiOutput) {
      navigator.clipboard.writeText(asciiOutput);
      toast({ title: "Copied!", description: "Output copied to clipboard" });
    }
  };

  const swap = () => {
    setTextInput(asciiOutput);
    setAsciiOutput("");
  };

  const clear = () => {
    setTextInput("");
    setAsciiOutput("");
  };

  const howItWorks = [
    { step: 1, title: "Enter Text or ASCII", description: "Input text or ASCII codes (space-separated)" },
    { step: 2, title: "Convert", description: "Click Text→ASCII or ASCII→Text" },
    { step: 3, title: "Copy Result", description: "Copy output to clipboard" },
  ];

  const benefits = [
    { icon: <Binary className="h-5 w-5" />, title: "Bidirectional", description: "Convert both ways" },
    { icon: <Copy className="h-5 w-5" />, title: "One-Click Copy", description: "Copy instantly" },
    { icon: <Binary className="h-5 w-5" />, title: "Developer Friendly", description: "Perfect for coding" },
  ];

  const faqs = [
    { question: "What is ASCII?", answer: "ASCII assigns numbers to characters (A=65, B=66, etc.)" },
    { question: "How do I use this?", answer: "Enter text and click Text→ASCII, or enter ASCII codes and click ASCII→Text" },
    { question: "Is it offline?", answer: "Yes! All processing happens in your browser." },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <ToolLayout
        title="ASCII ⇄ Text Converter"
        description="Convert text ↔ ASCII codes in one click. Perfect for developers, debugging & programming"
        icon={<Binary className="h-8 w-8" />}
        toolId="ascii-converter"
        category="text"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Convert Text & ASCII</CardTitle>
              <CardDescription>Enter text or ASCII codes to convert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Input</Label>
                <Textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter text or ASCII codes (space-separated numbers)"
                  className="min-h-[150px] font-mono"
                  data-testid="textarea-input"
                />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={textToAscii} data-testid="button-text-to-ascii">
                  Text → ASCII
                </Button>
                <Button onClick={asciiToText} variant="secondary" data-testid="button-ascii-to-text">
                  ASCII → Text
                </Button>
                <Button onClick={swap} variant="outline" data-testid="button-swap">
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Swap
                </Button>
                <Button onClick={clear} variant="outline" data-testid="button-clear">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Output</Label>
                  <Button
                    onClick={copyOutput}
                    variant="outline"
                    size="sm"
                    disabled={!asciiOutput}
                    data-testid="button-copy"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={asciiOutput}
                  readOnly
                  placeholder="Output will appear here..."
                  className="min-h-[150px] font-mono"
                  data-testid="textarea-output"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
