import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Binary, ArrowLeftRight, Copy, Trash2, Zap } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

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
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive",
      });
      return;
    }

    const ascii = textInput.split('').map(char => char.charCodeAt(0)).join(' ');
    setAsciiOutput(ascii);
  };

  const asciiToText = () => {
    if (!textInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter ASCII codes",
        variant: "destructive",
      });
      return;
    }

    try {
      const codes = textInput.split(/\s+/).map(code => parseInt(code));
      const text = codes.map(code => String.fromCharCode(code)).join('');
      setAsciiOutput(text);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid ASCII format",
        variant: "destructive",
      });
    }
  };

  const copyOutput = () => {
    if (asciiOutput) {
      navigator.clipboard.writeText(asciiOutput);
      toast({
        title: "Copied!",
        description: "Output copied to clipboard",
      });
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Developer friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — instantly converts ASCII, hex & text formats."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">ASCII Converter</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Binary className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">ASCII ⇄ Text Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert text ↔ ASCII codes in one click. Perfect for developers, debugging & programming
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Developer Friendly</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Convert Text & ASCII</CardTitle>
                <CardDescription>
                  Enter text or ASCII codes to convert
                </CardDescription>
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

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Perfect For</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Developers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Debug encoding issues and test character codes in your applications
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Binary className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Data Processing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Convert data between text and numeric representations
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Understand how characters are represented as numbers in computers
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What is ASCII?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      ASCII (American Standard Code for Information Interchange) is a character encoding standard that represents text characters as numbers. Each character has a unique number from 0 to 127.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do I use this converter?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To convert text to ASCII, enter your text and click "Text → ASCII". To convert ASCII to text, enter space-separated ASCII codes and click "ASCII → Text".
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is this developer friendly?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! This tool instantly converts ASCII, helps with debugging, and supports various text encodings. Perfect for programming tasks.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
