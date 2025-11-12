import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Link2, Copy, RotateCcw, Zap, Lock, Sparkles, Globe } from "lucide-react";

export default function URLEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "URL Encoder/Decoder | Encode & Decode URLs Online | Pixocraft Tools",
    description: "Free online URL encoder and decoder. Convert special characters for safe URL transmission. Encode and decode URLs instantly in your browser.",
    keywords: "url encoder, url decoder, encode url, decode url, url escape, percent encoding, uri encoding",
    canonicalUrl: "https://tools.pixocraft.in/tools/url-encoder",
  });

  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (error) {
      setOutput("Error encoding URL");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (error) {
      setOutput("Error decoding URL - invalid format");
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
      title="URL Encoder/Decoder"
      description="Encode and decode URLs instantly. Convert special characters for safe URL transmission and decode percent-encoded URLs back to readable text."
      icon={<Link2 className="h-10 w-10 text-primary" />}
      toolId="url-encoder"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Choose Mode", description: "Select whether you want to encode or decode a URL." },
        { step: 2, title: "Enter URL", description: "Paste your URL or text into the input field." },
        { step: 3, title: "Get Result", description: "Click the button and copy your encoded/decoded URL." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Processing", description: "Encode or decode URLs with a single click." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Secure & Private", description: "All encoding happens in your browser. No data sent to servers." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "Both Directions", description: "Encode URLs for transmission or decode them back to readable text." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Free to Use", description: "No limits, no registration, completely free forever." },
      ]}
      faqs={[
        { question: "What is URL encoding?", answer: "URL encoding (also called percent encoding) converts special characters into a format that can be safely transmitted over the internet. Characters like spaces become %20, and special characters are represented as %XX where XX is their hexadecimal value." },
        { question: "When do I need to encode URLs?", answer: "You should encode URLs when passing parameters with special characters (spaces, &, ?, =, etc.), building API requests, or creating shareable links with query parameters." },
        { question: "What's the difference between encodeURI and encodeURIComponent?", answer: "This tool uses encodeURIComponent, which encodes all special characters including /, ?, &, and =. This is ideal for encoding query parameters and form data." },
        { question: "Can I decode multiple times?", answer: "Yes! You can decode URLs that have been encoded multiple times. The tool handles standard percent encoding and will decode one level at a time." },
        { question: "Is my URL data safe?", answer: "Yes, all encoding and decoding happens entirely in your browser using JavaScript. No URLs are sent to our servers or stored anywhere." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Mode Tabs */}
        <Tabs value={mode} onValueChange={(value) => setMode(value as "encode" | "decode")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode" data-testid="tab-encode">Encode URL</TabsTrigger>
            <TabsTrigger value="decode" data-testid="tab-decode">Decode URL</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>Input {mode === "encode" ? "(Plain Text)" : "(Encoded URL)"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={mode === "encode" ? "Enter text or URL to encode..." : "Enter encoded URL to decode..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] text-base font-mono"
              data-testid="input-url"
            />
            <div className="flex gap-2 flex-wrap">
              <Button onClick={handleProcess} disabled={!input} data-testid="button-process">
                <Link2 className="h-4 w-4 mr-2" />
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

        {/* Output Card */}
        {output && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Result {mode === "encode" ? "(Encoded)" : "(Decoded)"}</span>
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
              <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all" data-testid="text-output">
                {output}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Box */}
        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Common Use Cases</h3>
                <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                  <li>• Building API requests with query parameters</li>
                  <li>• Creating shareable URLs with special characters</li>
                  <li>• Encoding form data for HTTP requests</li>
                  <li>• Decoding URLs from web analytics or logs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
