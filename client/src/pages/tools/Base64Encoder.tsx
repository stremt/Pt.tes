import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Binary, Copy, RotateCcw, Zap, Lock, Sparkles, Globe } from "lucide-react";

export default function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "Free Base64 Encoder Decoder - Encode Text Online",
    description: "Convert text to Base64 or decode Base64 strings instantly. 100% free, offline, and private. No server uploads. Works completely in your browser.",
    keywords: "base64 encoder, base64 decoder online, encode text, decode base64, base64 conversion, text to base64, online encoder, base64 encode decode, free base64 tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/base64-encoder",
  });

  const handleEncode = () => {
    try {
      // Convert text to UTF-8 then to Base64
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
    } catch (error) {
      setOutput("Error encoding text - please try again");
    }
  };

  const handleDecode = () => {
    try {
      // Decode Base64 then convert from UTF-8
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch (error) {
      setOutput("Error decoding Base64 - invalid Base64 string");
    }
  };

  const handleProcess = () => {
    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
  };

  return (
    <ToolLayout
      title="Free Base64 Encoder/Decoder - Encode and Decode Online"
      description="Instantly convert text to Base64 or decode Base64 strings back to plain text. 100% offline, completely private, and free. No server uploads or data collection."
      icon={<Binary className="h-10 w-10 text-primary" />}
      toolId="base64-encoder"
      category="developer"
      howItWorks={[
        { step: 1, title: "Choose Mode", description: "Select whether you want to encode or decode Base64." },
        { step: 2, title: "Enter Text", description: "Paste your text or Base64 string into the input field." },
        { step: 3, title: "Get Result", description: "Click the button and copy your encoded/decoded result." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Processing", description: "Encode or decode Base64 with a single click." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Secure & Private", description: "All processing happens in your browser. No data sent to servers." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "Both Directions", description: "Encode text to Base64 or decode Base64 back to plain text." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Works Offline", description: "After first load, works completely offline. No internet needed." },
      ]}
      faqs={[
        { question: "What is Base64 encoding and why is it used?", answer: "Base64 is a binary-to-text encoding scheme that converts binary data into an ASCII string using 64 safe characters. It's essential for transmitting binary data over text-only protocols like email, JSON, and HTTP headers." },
        { question: "How do I encode text to Base64 online?", answer: "Simply paste your text into the input field, select 'Encode to Base64', click the Encode button, and copy the result. It's instant and works completely offline in your browser." },
        { question: "How do I decode Base64 back to plain text?", answer: "Paste your Base64 string into the input field, select 'Decode from Base64', click the Decode button, and copy the result. The tool automatically detects valid Base64 and converts it back to readable text." },
        { question: "Is Base64 encryption or just encoding?", answer: "Base64 is encoding, NOT encryption. Anyone can easily decode Base64—it provides zero security. Use it for data transmission, not for protecting sensitive information. For security, use proper encryption algorithms." },
        { question: "What characters can I encode with Base64?", answer: "You can encode any text, but Base64 uses 64 safe characters (A-Z, a-z, 0-9, +, /). Special characters and emojis are first converted to UTF-8 bytes before Base64 encoding, so they work fine." },
        { question: "Is my data safe and private when using this tool?", answer: "Absolutely. All encoding and decoding happens entirely in your browser using JavaScript. No data is sent to servers, stored, or tracked. Complete offline privacy guaranteed." },
        { question: "What are real-world uses for Base64 encoding?", answer: "Common uses include embedding images in CSS/HTML (data URLs), encoding authentication credentials, transmitting binary data in JSON/XML, email attachment encoding, and API request/response encoding." },
        { question: "Can I use this tool on mobile phones?", answer: "Yes, this Base64 encoder/decoder works on any device with a modern browser—iPhone, Android, Windows, Mac, or Linux. It works offline once loaded, so no internet required." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs value={mode} onValueChange={(value) => setMode(value as "encode" | "decode")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode" data-testid="tab-encode">Encode to Base64</TabsTrigger>
            <TabsTrigger value="decode" data-testid="tab-decode">Decode from Base64</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Input {mode === "encode" ? "(Plain Text)" : "(Base64 String)"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 string to decode..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] text-base font-mono"
              data-testid="input-base64"
            />
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleProcess} disabled={!input} data-testid="button-process">
                <Binary className="h-4 w-4 mr-2" />
                {mode === "encode" ? "Encode" : "Decode"}
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={!input && !output} data-testid="button-clear">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              {output && (
                <Button variant="outline" onClick={handleSwap} data-testid="button-swap">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Use Output as Input
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {output && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Result {mode === "encode" ? "(Base64)" : "(Plain Text)"}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(output)}
                  data-testid="button-copy-output"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-lg border bg-muted">
                <div className="p-4 font-mono text-sm break-all" data-testid="text-output">
                  {output}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Common Use Cases</h3>
                <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                  <li>• Encoding data for API requests and responses</li>
                  <li>• Embedding images in HTML/CSS (data URLs)</li>
                  <li>• Encoding authentication tokens and credentials</li>
                  <li>• Converting binary data to text for transmission</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
