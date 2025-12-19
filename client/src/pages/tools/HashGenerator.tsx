import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Hash, Copy, Check, ArrowRight, Shield, WifiOff, Lock, Key, FileCheck, Server, GraduationCap, AlertTriangle } from "lucide-react";
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
    title: "Free Hash Generator - MD5, SHA1, SHA256 Online & Offline",
    description: "Generate MD5, SHA1, SHA256 hashes instantly. 100% free, runs offline in your browser. Perfect for file verification, APIs, and security checks.",
    keywords: "hash generator online, md5 hash generator, sha256 hash generator, hash from text, offline hash generator, md5 vs sha256, sha1 generator, free hash tool, file checksum",
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
      question: "Is MD5 still safe to use?",
      answer: "MD5 is safe for non-security purposes like checksums and file verification. However, for security-critical applications like digital signatures or certificates, use SHA-256 instead, as MD5 has known collision vulnerabilities."
    },
    {
      question: "Can hashes be reversed to get the original text?",
      answer: "No. Hashing is a one-way function—you cannot reverse a hash to recover the original input. This is by design. Attackers use lookup tables or brute force, but the hash itself cannot be decrypted."
    },
    {
      question: "Is this tool safe for passwords?",
      answer: "This tool is safe for generating hashes, but MD5/SHA1/SHA256 alone are not recommended for password storage. Use dedicated password hashing algorithms with salting for storing user passwords securely."
    },
    {
      question: "Does this tool upload my data?",
      answer: "No. All hashing happens entirely in your browser. Your input never leaves your device—no data is sent to any server, stored, or logged. The tool works completely offline once loaded."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Hash Generator",
    description: "Free online tool to generate MD5, SHA1, and SHA256 hashes instantly. Runs entirely in your browser with no data uploads. Perfect for developers and file verification.",
    url: "https://tools.pixocraft.in/tools/hash-generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (Browser-based)",
    offers: { price: "0", priceCurrency: "INR" }
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareSchema} />
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
            <h1 className="text-4xl md:text-5xl font-bold">Generate Hashes Instantly—MD5, SHA1, SHA256 All in One</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate MD5, SHA1, and SHA256 hashes instantly—100% free, offline, and private.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">MD5</Badge>
              <Badge variant="secondary">SHA1</Badge>
              <Badge variant="secondary">SHA256</Badge>
              <Badge variant="secondary">Works Offline</Badge>
              <Badge variant="secondary">No Data Uploads</Badge>
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
                          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
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
                          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
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
                          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
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

          {/* What Is This Hash Generator Used For? */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">What Is This Hash Generator Used For?</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Hashes are one-way fingerprints of data. They're used to verify integrity, sign requests, and check consistency—without exposing the original content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">File Integrity Verification</h3>
                      <p className="text-sm text-muted-foreground">Compare hashes before and after download to ensure files weren't corrupted or tampered with.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Server className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">API Request Signing</h3>
                      <p className="text-sm text-muted-foreground">Many APIs use hashes to verify request authenticity and prevent tampering during transmission.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Data Consistency Checks</h3>
                      <p className="text-sm text-muted-foreground">Quickly verify that data hasn't changed between systems or over time using hash comparisons.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Learning & Education</h3>
                      <p className="text-sm text-muted-foreground">Understand how hashing works by experimenting with different inputs and comparing outputs.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Important Clarification */}
            <Card className="max-w-4xl mx-auto mt-8 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-yellow-900 dark:text-yellow-200">Important: What Hashing Is NOT</h3>
                    <ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1">
                      <li><strong>Hashing is not encryption.</strong> Encrypted data can be decrypted with a key. Hashes cannot be reversed.</li>
                      <li><strong>Hashing alone is not a password storage solution.</strong> Use dedicated password hashing with salting for secure storage.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* MD5 vs SHA1 vs SHA256 Comparison */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">MD5 vs SHA1 vs SHA256: Which Should You Use?</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Different hashing algorithms have different strengths. Here's a simple comparison to help you choose the right one.
            </p>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Algorithm</th>
                        <th className="text-left py-3 px-4 font-semibold">Speed</th>
                        <th className="text-left py-3 px-4 font-semibold">Security</th>
                        <th className="text-left py-3 px-4 font-semibold">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">MD5</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Fastest</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Weak</Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">Quick checksums, cache keys, non-security uses</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">SHA-1</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Fast</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Deprecated</Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">Legacy systems, git commits (transitioning away)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">SHA-256</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Moderate</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Strong</Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">Digital signatures, certificates, blockchain, security-critical apps</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4 pt-4 border-t">
                  <strong>Recommendation:</strong> Use SHA-256 for anything security-related. Use MD5 only for quick checksums where security doesn't matter.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Privacy & Safety Section */}
          <section className="mb-16">
            <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Privacy & Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Runs Entirely in Browser</h4>
                      <p className="text-sm text-muted-foreground">All hashing is done locally using your browser's built-in capabilities. Nothing is processed on external servers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <WifiOff className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Works Completely Offline</h4>
                      <p className="text-sm text-muted-foreground">Once the page loads, you can disconnect from the internet and continue generating hashes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">No Data Storage or Logs</h4>
                      <p className="text-sm text-muted-foreground">Your input is never saved, logged, or transmitted. It exists only in your browser's memory while you use the tool.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Safe for Sensitive Input</h4>
                      <p className="text-sm text-muted-foreground">You can safely hash sensitive strings for verification purposes, knowing nothing leaves your device.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Internal Linking Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Link href="/tools/password-generator" className="block" data-testid="link-password-generator">
                <Card className="h-full hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold">Need a Strong Password?</h3>
                        <p className="text-sm text-muted-foreground">Generate random, secure passwords.</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/tools/password-strength-checker" className="block" data-testid="link-password-checker">
                <Card className="h-full hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold">Check Password Strength</h3>
                        <p className="text-sm text-muted-foreground">Test if your password is secure enough.</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/tools/temp-mail" className="block" data-testid="link-temp-mail">
                <Card className="h-full hover-elevate cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold">Need Privacy for Testing?</h3>
                        <p className="text-sm text-muted-foreground">Use a temporary email address.</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
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
