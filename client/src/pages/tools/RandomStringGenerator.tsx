import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shuffle, Copy, RefreshCw, Zap, Lock } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function RandomStringGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Random String Generator | Create Secure Unique Strings | Pixocraft Tools",
    description: "Generate random strings of any length using letters, numbers & symbols. Offline & secure.",
    keywords: "random string generator, random text generator, secure string generator, random password, unique string",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-string-generator",
  });

  const generateString = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let randomString = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      randomString += chars[array[i] % chars.length];
    }

    setResult(randomString);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Random string copied to clipboard",
      });
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — uses browser crypto for randomness."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Privacy Tools", url: "/tools/privacy" },
            { label: "Random String Generator" },
          ]}
        />
      </div>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shuffle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Random String Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate secure random strings instantly for IDs, passwords, testing & coding
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Secure</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Cryptographically Random</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Generate Random String</CardTitle>
                <CardDescription>
                  Customize length and character types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Length: {length}</Label>
                  <Input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(Math.max(1, Math.min(128, parseInt(e.target.value) || 16)))}
                    min={1}
                    max={128}
                    data-testid="input-length"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Include Characters</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="uppercase"
                        checked={includeUppercase}
                        onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                        data-testid="checkbox-uppercase"
                      />
                      <label htmlFor="uppercase" className="text-sm cursor-pointer">
                        Uppercase Letters (A-Z)
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="lowercase"
                        checked={includeLowercase}
                        onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                        data-testid="checkbox-lowercase"
                      />
                      <label htmlFor="lowercase" className="text-sm cursor-pointer">
                        Lowercase Letters (a-z)
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="numbers"
                        checked={includeNumbers}
                        onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                        data-testid="checkbox-numbers"
                      />
                      <label htmlFor="numbers" className="text-sm cursor-pointer">
                        Numbers (0-9)
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="symbols"
                        checked={includeSymbols}
                        onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                        data-testid="checkbox-symbols"
                      />
                      <label htmlFor="symbols" className="text-sm cursor-pointer">
                        Symbols (!@#$%^&*)
                      </label>
                    </div>
                  </div>
                </div>

                <Button onClick={generateString} className="w-full" size="lg" data-testid="button-generate">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Random String
                </Button>

                {result && (
                  <div className="space-y-2">
                    <Label>Generated String</Label>
                    <div className="flex gap-2">
                      <Input
                        value={result}
                        readOnly
                        className="font-mono"
                        data-testid="input-result"
                      />
                      <Button onClick={copyResult} size="icon" variant="outline" data-testid="button-copy">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Use Cases</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Testing & Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Generate test data, unique IDs, and mock values for development
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Lock className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Secure Passwords</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create strong, cryptographically random passwords and tokens
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Shuffle className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Unique Identifiers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Generate unique session IDs, API keys, and reference codes
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
                    <CardTitle className="text-lg">Is it secure?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! This tool uses the Web Crypto API (crypto.getRandomValues()) which provides cryptographically strong random numbers. This is suitable for generating passwords and secure tokens.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's the maximum length?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You can generate strings up to 128 characters long. This is enough for most use cases including passwords, API keys, and unique identifiers.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does it work offline?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! All random string generation happens locally in your browser. No internet connection is required after the page loads.
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
