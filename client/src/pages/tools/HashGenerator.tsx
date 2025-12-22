import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Hash, Copy, Check, Shield, WifiOff, Lock, Key, FileCheck, Server, GraduationCap, AlertTriangle, Copy as CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

async function generateHash(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  switch (algorithm) {
    case 'MD5':
      return await generateMD5(text);
    case 'SHA-1':
    case 'SHA1':
      return digestToHex(await crypto.subtle.digest('SHA-1', data));
    case 'SHA-224':
      return digestToHex(await crypto.subtle.digest('SHA-256', data)).substring(0, 56);
    case 'SHA-256':
    case 'SHA256':
      return digestToHex(await crypto.subtle.digest('SHA-256', data));
    case 'SHA-384':
    case 'SHA384':
      return digestToHex(await crypto.subtle.digest('SHA-384', data));
    case 'SHA-512':
    case 'SHA512':
      return digestToHex(await crypto.subtle.digest('SHA-512', data));
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
}

function digestToHex(buffer: ArrayBuffer): string {
  const hashArray = Array.from(new Uint8Array(buffer));
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

interface HashResult {
  algorithm: string;
  value: string;
  length: number;
}

const ALGORITHMS = [
  { id: 'MD5', name: 'MD5', length: 32 },
  { id: 'SHA1', name: 'SHA-1', length: 40 },
  { id: 'SHA-224', name: 'SHA-224', length: 56 },
  { id: 'SHA-256', name: 'SHA-256', length: 64 },
  { id: 'SHA-384', name: 'SHA-384', length: 96 },
  { id: 'SHA-512', name: 'SHA-512', length: 128 },
];

export default function HashGenerator() {
  const [inputText, setInputText] = useState("");
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedHash, setCopiedHash] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Free Online Hash Generator - MD5, SHA1, SHA256, SHA384, SHA512",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 and other hash values instantly. 100% free, offline, private. Works in your browser.",
    keywords: "hash generator, md5 hash generator, sha256 hash generator, sha-1 hash, generate hash online, hash from text, offline hash generator, hash online tool",
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

    setLoading(true);
    try {
      const results = await Promise.all(
        ALGORITHMS.map(async (algo) => ({
          algorithm: algo.name,
          value: await generateHash(inputText, algo.id),
          length: algo.length,
        }))
      );
      
      setHashes(results);
      toast({
        title: "Hashes Generated",
        description: `Generated ${results.length} hashes successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hashes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
      question: "Is MD5 still safe to use?",
      answer: "MD5 is safe for non-security purposes like checksums and file verification. However, for security-critical applications, use SHA-256 instead, as MD5 has known collision vulnerabilities."
    },
    {
      question: "Can hashes be reversed to get the original text?",
      answer: "No. Hashing is a one-way function—you cannot reverse a hash to recover the original input. This is by design and a security feature."
    },
    {
      question: "Is this tool safe for passwords?",
      answer: "This tool is safe for generating hashes, but MD5/SHA alone are not recommended for password storage. Use dedicated password hashing algorithms like bcrypt or Argon2."
    },
    {
      question: "Does this tool upload my data?",
      answer: "No, absolutely not. All hashing happens entirely in your browser locally. Your input never leaves your device—nothing is sent to servers or logged."
    },
    {
      question: "What's the difference between hashing and encryption?",
      answer: "Hashing is one-way (irreversible). Encryption is two-way (reversible with a key). Hashing is for verification; encryption is for keeping data secret."
    },
    {
      question: "Why are SHA hashes longer than MD5?",
      answer: "Longer hashes = more security. MD5 is 128-bit (32 chars), SHA-256 is 256-bit (64 chars), SHA-512 is 512-bit (128 chars). Longer hashes are harder to crack."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Hash Generator",
    description: "Free online tool to generate MD5, SHA1, SHA256, SHA384, SHA512 and other hashes. Runs entirely in your browser with no data uploads.",
    url: "https://tools.pixocraft.in/tools/hash-generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (Browser-based)",
    offers: { price: "0", priceCurrency: "INR" }
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareSchema} />
      <div className="min-h-screen py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 and more hashes instantly. 100% free, offline, completely private.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge>MD5</Badge>
              <Badge>SHA-1</Badge>
              <Badge>SHA-256</Badge>
              <Badge>SHA-384</Badge>
              <Badge>SHA-512</Badge>
              <Badge>100% Offline</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle>Generate Hashes</CardTitle>
                <CardDescription>
                  Enter text to generate all hash values instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-text">Input Text</Label>
                  <Textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text, password, or data to hash..."
                    className="min-h-[150px] text-base"
                    data-testid="input-text"
                  />
                  <p className="text-xs text-muted-foreground">
                    {inputText.length} characters
                  </p>
                </div>

                <Button 
                  onClick={generateHashes} 
                  className="w-full h-11 text-base font-semibold" 
                  disabled={loading}
                  data-testid="button-generate"
                >
                  <Hash className="mr-2 h-5 w-5" />
                  {loading ? "Generating..." : "Generate All Hashes"}
                </Button>

                {hashes.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Results</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {hashes.map((hash) => (
                        <Card 
                          key={hash.algorithm} 
                          className="bg-muted/30 border hover-elevate overflow-hidden"
                        >
                          <CardContent className="pt-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <Label className="text-sm font-semibold text-foreground">
                                  {hash.algorithm}
                                </Label>
                                <Badge variant="outline" className="text-xs">
                                  {hash.length} chars
                                </Badge>
                              </div>
                              <div className="bg-background rounded-lg p-3 border border-border/50 break-all">
                                <p className="font-mono text-xs text-muted-foreground">{hash.value}</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(hash.value, hash.algorithm)}
                                className="w-full h-8 text-xs"
                                data-testid={`button-copy-${hash.algorithm}`}
                              >
                                {copiedHash === hash.algorithm ? (
                                  <>
                                    <Check className="mr-1 h-3 w-3" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="mr-1 h-3 w-3" />
                                    Copy
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Content Sections */}
          <section className="prose prose-sm dark:prose-invert max-w-none space-y-6 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">What is a Hash Generator and Why Does It Matter?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A hash generator converts any text or data into a fixed-length string using mathematical algorithms. The most common are MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), SHA-384 (384-bit), and SHA-512 (512-bit). Think of a hash as a unique fingerprint for data—identical input always produces identical output, but changing even one character completely changes the hash.
                </p>
                <p>
                  Hashing is used everywhere: verifying file integrity after downloads, securing API requests, checking data consistency, and protecting sensitive information. Unlike encryption (which can be reversed), hashing is one-way—you cannot get the original text back from a hash.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Who Should Use This Tool?</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-foreground">Developers:</span> Generate hashes for API requests, file verification, checksums, and data validation.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-foreground">System Administrators:</span> Verify software downloads haven't been corrupted or tampered with.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-foreground">Security Professionals:</span> Test password strength and verify digital signatures.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <div>
                    <span className="font-semibold text-foreground">Students:</span> Understand hashing through experimentation and see algorithm differences.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Real-Life Use Cases</h3>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <span className="font-semibold text-foreground">File Verification:</span>
                  <p className="text-sm mt-1">Download a software file and hash it. Compare with the official hash on their website to verify authenticity and integrity.</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground">API Authentication:</span>
                  <p className="text-sm mt-1">Many APIs require SHA-256 hashes of your requests. Use this tool to generate the correct hash for authentication.</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Data Consistency:</span>
                  <p className="text-sm mt-1">Hash data in different systems and compare. Matching hashes mean identical data; different hashes indicate changes.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Privacy & Security Guarantee</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your privacy is guaranteed. This tool runs 100% in your browser. Nothing is sent to servers, stored in databases, or logged. Your input never leaves your device.
                </p>
                <p>
                  <span className="font-semibold text-foreground">How it works:</span> All hashing algorithms run locally using your browser's processing power. The moment you close this page, everything is erased.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Related Tools */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Other Useful Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.slice(0, 6).map((tool) => (
                <Link key={tool.id} href={tool.path}>
                  <div className="p-4 rounded-lg border bg-card hover:border-primary hover-elevate transition-all cursor-pointer h-full">
                    <p className="font-semibold text-sm mb-1">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Category Footer */}
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/privacy" className="text-primary hover:text-primary/80 transition-colors">Privacy Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
