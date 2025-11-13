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
    title: "Base64 Encoder Decoder | Convert Text Instantly",
    description: "Convert text to Base64 or decode Base64 to text instantly. 100% offline, secure & fast.",
    keywords: "base64 encoder, base64 decoder online, encode text, decode base64",
    canonicalUrl: "https://tools.pixocraft.in/tools/base64-encoder",
  });

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      setOutput("Error encoding text - contains invalid characters for Base64");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
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
      title="Base64 Encoder/Decoder"
      description="Convert Base64 ↔ Text instantly. No server, no data collection — full privacy guaranteed."
      icon={<Binary className="h-10 w-10 text-primary" />}
      toolId="base64-encoder"
      category="Developer Tool"
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
        { question: "What is Base64 encoding?", answer: "Base64 is a binary-to-text encoding scheme that converts binary data into an ASCII string format. It's commonly used to encode data in email systems, URLs, and to embed images in HTML/CSS." },
        { question: "When do I need Base64 encoding?", answer: "Use Base64 when you need to encode binary data for transmission over text-based protocols, embed images in CSS/HTML, encode data in JSON/XML, or store binary data in databases that only support text." },
        { question: "Is Base64 encryption?", answer: "No, Base64 is NOT encryption. It's an encoding method that converts data to a different format. Anyone can easily decode Base64 - it provides no security or privacy. Never use it to protect sensitive information." },
        { question: "Can I encode any text?", answer: "You can encode most text, but be aware that standard Base64 works with ASCII characters. For special characters or emojis, they'll first be converted to UTF-8 bytes before encoding." },
        { question: "Is my data safe?", answer: "Yes, all encoding and decoding happens entirely in your browser using JavaScript. No data is sent to our servers or stored anywhere." },
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
