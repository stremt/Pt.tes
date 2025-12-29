import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Link2, Copy, RotateCcw, Zap, Lock, Sparkles, Globe, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function URLEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "Free URL Encoder Decoder Tool - Encode & Decode Online",
    description: "Easily encode and decode URLs with special characters instantly. 100% free, offline, and completely private. No signup needed. Works in your browser.",
    keywords: "url encoder, url decoder, encode url, decode url, url escape, percent encoding, uri encoding, url conversion, special characters, free url encoder online",
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
    <>
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Developer Tools", url: "/tools/developer" },
            { label: "URL Encoder/Decoder" },
          ]}
        />
      </div>
      <ToolLayout
      title="Free URL Encoder & Decoder Tool - Encode and Decode URLs Online"
      description="Instantly encode and decode URLs with special characters for safe transmission. 100% free, completely private, and works offline. Perfect for developers, students, and anyone working with URLs."
      icon={<Link2 className="h-10 w-10 text-primary" />}
      toolId="url-encoder"
      category="developer"
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
        { question: "What is URL encoding and how does it work?", answer: "URL encoding (percent encoding) converts special characters into a safe format for internet transmission. Spaces become %20, and other special characters become %XX where XX is their hexadecimal code. This allows URLs to safely carry spaces, ampersands, and other characters." },
        { question: "When do I need to URL encode text or parameters?", answer: "Encode URLs when building API requests with parameters, creating shareable links with special characters, encoding form data, passing data in query strings, or when special characters (like spaces, &, ?, =, #) need safe transmission over HTTP." },
        { question: "How do I encode special characters in URLs?", answer: "Simply paste your URL or text into this tool, select 'Encode', and click the button. All special characters including spaces, punctuation, and symbols are automatically converted to their percent-encoded format (%XX representation)." },
        { question: "Which characters need to be encoded in URLs?", answer: "Characters that need encoding include: spaces (%20), & (%26), ? (%3F), = (%3D), # (%23), and other special symbols. Letters (A-Z, a-z) and numbers (0-9) generally don't need encoding, but this tool safely encodes everything for maximum compatibility." },
        { question: "Can I decode URL-encoded text back to readable format?", answer: "Yes, absolutely. Switch to 'Decode' mode, paste your percent-encoded URL (with %20, %26, etc.), click decode, and the tool converts it back to readable plain text instantly. You can also decode multiple times if a URL was encoded multiple times." },
        { question: "Is my URL data safe and private when using this tool?", answer: "Completely safe. All encoding and decoding happens 100% in your browser using JavaScript. No URLs are sent to servers, logged, stored, or tracked. Your privacy is fully guaranteed with zero data collection." },
        { question: "Can I use this URL encoder tool on my phone?", answer: "Yes, this tool works perfectly on any device—iPhone, Android, tablets, or computers. It's responsive and works in any modern browser. Once loaded, it also works completely offline without needing internet." },
        { question: "What's the difference between encoding and escaping URLs?", answer: "URL encoding and URL escaping are essentially the same thing. Both convert unsafe characters into percent-encoded format for safe transmission. This tool handles both encode and decode operations for complete URL management." },
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
              <ScrollArea className="h-[200px] w-full rounded-lg border bg-muted">
                <div className="p-4 font-mono text-sm break-all" data-testid="text-output">
                  {output}
                </div>
              </ScrollArea>
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

        {/* Related Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Related Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/tools/base64-encoder">
                <Button variant="outline" className="w-full justify-between" data-testid="link-base64-encoder">
                  Base64 Encoder/Decoder
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools/html-encoder">
                <Button variant="outline" className="w-full justify-between" data-testid="link-html-encoder">
                  HTML Encoder/Decoder
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools/url-parser">
                <Button variant="outline" className="w-full justify-between" data-testid="link-url-parser">
                  URL Parser
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools/hash-generator">
                <Button variant="outline" className="w-full justify-between" data-testid="link-hash-generator">
                  Hash Generator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools/qr-maker">
                <Button variant="outline" className="w-full justify-between" data-testid="link-qr-maker">
                  QR Code Maker
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8 pt-6 border-t">
          Category: <Link href="/tools/privacy" className="text-primary hover:text-primary/80 transition-colors">Privacy Tools</Link>
        </p>
      </div>
    </ToolLayout>
    </>
  );
}
