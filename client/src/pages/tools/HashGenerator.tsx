import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Hash, Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

async function generateHash(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  let hashBuffer: ArrayBuffer;
  switch (algorithm) {
    case 'MD5':
      return await generateMD5(text);
    case 'SHA-1':
      hashBuffer = await crypto.subtle.digest('SHA-1', data);
      break;
    case 'SHA-256':
      hashBuffer = await crypto.subtle.digest('SHA-256', data);
      break;
    default:
      throw new Error('Unsupported algorithm');
  }
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function generateMD5(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  function md5cycle(x: number[], k: number[]) {
    let a = x[0], b = x[1], c = x[2], d = x[3];
    
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }
  
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  
  function add32(a: number, b: number) {
    return (a + b) & 0xFFFFFFFF;
  }
  
  const n = ((((text.length + 8) >>> 6) + 1) << 4);
  const x = new Array(n);
  for (let i = 0; i < n; i++) x[i] = 0;
  for (let i = 0; i < text.length; i++) {
    x[i >> 2] |= text.charCodeAt(i) << ((i % 4) << 3);
  }
  x[text.length >> 2] |= 0x80 << ((text.length % 4) << 3);
  x[n - 2] = text.length * 8;
  
  const state = [1732584193, -271733879, -1732584194, 271733878];
  for (let i = 0; i < x.length; i += 16) {
    md5cycle(state, x.slice(i, i + 16));
  }
  
  return state.map(s => {
    let hex = '';
    for (let j = 0; j < 4; j++) {
      hex += ((s >> (j * 8)) & 0xFF).toString(16).padStart(2, '0');
    }
    return hex;
  }).join('');
}

export default function HashGenerator() {
  const [inputText, setInputText] = useState("");
  const [md5Hash, setMd5Hash] = useState("");
  const [sha1Hash, setSha1Hash] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");
  const [copiedHash, setCopiedHash] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Hash Generator Online | MD5, SHA1, SHA256 Hash Tool | Pixocraft Tools",
    description: "Generate MD5, SHA1 & SHA256 hashes instantly. Developer-friendly, offline & secure.",
    keywords: "md5 generator, sha256 hash tool, hash calculator, sha1 online, hash generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/hash-generator",
  });

  const relatedTools = getRelatedTools("hash-generator", 6);

  const generateHashes = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter text to hash",
        variant: "destructive",
      });
      return;
    }

    try {
      const [md5, sha1, sha256] = await Promise.all([
        generateHash(inputText, 'MD5'),
        generateHash(inputText, 'SHA-1'),
        generateHash(inputText, 'SHA-256')
      ]);
      
      setMd5Hash(md5);
      setSha1Hash(sha1);
      setSha256Hash(sha256);
      
      toast({
        title: "Hashes Generated",
        description: "All hashes generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hashes",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(type);
    toast({
      title: "Copied!",
      description: `${type} hash copied to clipboard`,
    });
    setTimeout(() => setCopiedHash(""), 2000);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Is hashing offline?",
      answer: "Yes, browser crypto only. All hash generation happens in your browser using the Web Crypto API and pure JavaScript. Your data never leaves your device."
    },
    {
      question: "What's the difference between MD5, SHA1, and SHA256?",
      answer: "MD5 and SHA1 are older, faster, but less secure. SHA256 is more secure and recommended for security-critical applications. All are one-way hashing algorithms."
    },
    {
      question: "Can I use this for password hashing?",
      answer: "While you can, it's not recommended to use these hashes alone for passwords. Use proper password hashing algorithms like bcrypt or Argon2 for production systems."
    }
  ];

  return (
    <>
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Hash Generator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Hash className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Hash Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate MD5, SHA1 & SHA256 hashes instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">MD5</Badge>
              <Badge variant="secondary">SHA1</Badge>
              <Badge variant="secondary">SHA256</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Generate Hashes</CardTitle>
                <CardDescription>
                  Enter text to generate MD5, SHA1, and SHA256 hashes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text to hash..."
                    className="min-h-[150px]"
                    data-testid="input-text"
                  />
                </div>

                <Button onClick={generateHashes} className="w-full" size="lg" data-testid="button-generate">
                  <Hash className="mr-2 h-5 w-5" />
                  Generate Hashes
                </Button>

                {(md5Hash || sha1Hash || sha256Hash) && (
                  <div className="space-y-4">
                    {md5Hash && (
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-semibold">MD5</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(md5Hash, 'MD5')}
                              data-testid="button-copy-md5"
                            >
                              {copiedHash === 'MD5' ? (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                          <p className="font-mono text-sm break-all" data-testid="hash-md5">{md5Hash}</p>
                        </CardContent>
                      </Card>
                    )}

                    {sha1Hash && (
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-semibold">SHA-1</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(sha1Hash, 'SHA-1')}
                              data-testid="button-copy-sha1"
                            >
                              {copiedHash === 'SHA-1' ? (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                          <p className="font-mono text-sm break-all" data-testid="hash-sha1">{sha1Hash}</p>
                        </CardContent>
                      </Card>
                    )}

                    {sha256Hash && (
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-semibold">SHA-256</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(sha256Hash, 'SHA-256')}
                              data-testid="button-copy-sha256"
                            >
                              {copiedHash === 'SHA-256' ? (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                          <p className="font-mono text-sm break-all" data-testid="hash-sha256">{sha256Hash}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">About Hash Generator</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Paste text → get MD5, SHA1, SHA256 hash instantly. Perfect for coding, security & verification.
                </p>
              </div>

              <div className="text-center space-y-4 mb-12 mt-16">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                {faqItems.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {relatedTools.length > 0 && (
            <section className="py-16">
              <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedTools.map((tool) => {
                    const Icon = getToolIcon(tool.icon);
                    return (
                      <Link key={tool.id} href={tool.path}>
                        <Card className="hover-elevate active-elevate-2 h-full cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            <CardDescription>{tool.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center text-primary font-medium">
                              Try it now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
