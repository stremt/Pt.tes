import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Lock, Unlock, Copy, Check, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { TEXTAREA_HEIGHTS, SCROLLABLE_OUTPUT } from "@/lib/ui-constants";

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  
  const baseKey = await crypto.subtle.importKey(
    'raw',
    passwordData,
    'PBKDF2',
    false,
    ['deriveKey']
  );
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptTextData(text: string, password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  
  const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  combined.set(salt);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(encrypted), salt.length + iv.length);
  
  return btoa(String.fromCharCode.apply(null, Array.from(combined)));
}

async function decryptTextData(encryptedText: string, password: string): Promise<string> {
  const decoder = new TextDecoder();
  
  const combined = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
  
  if (combined.length < 28) {
    throw new Error('Invalid encrypted data');
  }
  
  const salt = combined.slice(0, 16);
  const iv = combined.slice(16, 28);
  const encrypted = combined.slice(28);
  
  const key = await deriveKey(password, salt);
  
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  );
  
  return decoder.decode(decrypted);
}

export default function TextEncryptDecrypt() {
  const [encryptText, setEncryptText] = useState("");
  const [encryptPassword, setEncryptPassword] = useState("");
  const [encryptedResult, setEncryptedResult] = useState("");
  const [showEncryptPassword, setShowEncryptPassword] = useState(false);
  
  const [decryptText, setDecryptText] = useState("");
  const [decryptPassword, setDecryptPassword] = useState("");
  const [decryptedResult, setDecryptedResult] = useState("");
  const [showDecryptPassword, setShowDecryptPassword] = useState(false);
  
  const [copied, setCopied] = useState(false);
  const [encrypting, setEncrypting] = useState(false);
  const [decrypting, setDecrypting] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Text Encrypt & Decrypt | Secure AES Text Encryption (Offline) | Pixocraft Tools",
    description: "Encrypt or decrypt text with a password using offline browser crypto. Zero data storage.",
    keywords: "text encrypt, text decrypt, offline encryption, aes encrypt text, secure text encryption",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-encrypt-decrypt",
  });

  const relatedTools = getRelatedTools("text-encrypt-decrypt", 6);

  const handleEncrypt = async () => {
    if (!encryptText.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter text to encrypt",
        variant: "destructive",
      });
      return;
    }
    
    if (!encryptPassword.trim()) {
      toast({
        title: "Invalid Password",
        description: "Please enter a password",
        variant: "destructive",
      });
      return;
    }

    if (encryptPassword.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password should be at least 6 characters long for better security",
        variant: "destructive",
      });
      return;
    }

    setEncrypting(true);
    try {
      const result = await encryptTextData(encryptText, encryptPassword);
      setEncryptedResult(result);
      toast({
        title: "Encrypted Successfully",
        description: `Your text (${encryptText.length} characters) has been encrypted`,
      });
    } catch (error) {
      toast({
        title: "Encryption Failed",
        description: error instanceof Error ? error.message : "An error occurred during encryption",
        variant: "destructive",
      });
    } finally {
      setEncrypting(false);
    }
  };

  const handleDecrypt = async () => {
    if (!decryptText.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter encrypted text",
        variant: "destructive",
      });
      return;
    }
    
    if (!decryptPassword.trim()) {
      toast({
        title: "Invalid Password",
        description: "Please enter the password",
        variant: "destructive",
      });
      return;
    }

    setDecrypting(true);
    try {
      const result = await decryptTextData(decryptText, decryptPassword);
      setDecryptedResult(result);
      toast({
        title: "Decrypted Successfully",
        description: `Your text has been decrypted (${result.length} characters)`,
      });
    } catch (error) {
      setDecryptedResult("");
      const errorMessage = error instanceof Error ? error.message : '';
      toast({
        title: "Decryption Failed",
        description: errorMessage.includes('Invalid') 
          ? "Invalid encrypted data format. Please make sure you copied the complete encrypted text."
          : "Wrong password or corrupted data. Please verify your password and try again.",
        variant: "destructive",
      });
    } finally {
      setDecrypting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Is this safe?",
      answer: "Yes — AES encryption inside your device. All encryption happens in your browser using the Web Crypto API. Your text and password are never sent to any server."
    },
    {
      question: "Can I decrypt text encrypted with a different password?",
      answer: "No. You must use the exact same password that was used to encrypt the text. There is no way to decrypt without the correct password."
    },
    {
      question: "Is my password stored?",
      answer: "No. Your password is only used temporarily to encrypt/decrypt and is never stored anywhere. Make sure to remember your password!"
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
            <span className="text-foreground">Text Encrypt/Decrypt</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Text Encrypt & Decrypt</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Secure AES encryption & decryption with password protection
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">AES-256</Badge>
              <Badge variant="secondary">Private</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Encrypt or Decrypt Text</CardTitle>
                <CardDescription>
                  Use AES-256 encryption to secure your text with a password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="encrypt" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="encrypt" data-testid="tab-encrypt">
                      <Lock className="mr-2 h-4 w-4" />
                      Encrypt
                    </TabsTrigger>
                    <TabsTrigger value="decrypt" data-testid="tab-decrypt">
                      <Unlock className="mr-2 h-4 w-4" />
                      Decrypt
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="encrypt" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="encrypt-text">Text to Encrypt</Label>
                        <Textarea
                          id="encrypt-text"
                          value={encryptText}
                          onChange={(e) => setEncryptText(e.target.value)}
                          placeholder="Enter your secret text..."
                          className={`${TEXTAREA_HEIGHTS.MEDIUM} ${SCROLLABLE_OUTPUT} mt-2`}
                          data-testid="input-encrypt-text"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {encryptText.length} characters
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="encrypt-password">Password</Label>
                        <div className="relative mt-2">
                          <Input
                            id="encrypt-password"
                            type={showEncryptPassword ? "text" : "password"}
                            value={encryptPassword}
                            onChange={(e) => setEncryptPassword(e.target.value)}
                            placeholder="Enter a strong password (min 6 characters)"
                            className="pr-10"
                            data-testid="input-encrypt-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowEncryptPassword(!showEncryptPassword)}
                            data-testid="button-toggle-encrypt-password"
                          >
                            {showEncryptPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        onClick={handleEncrypt} 
                        className="w-full" 
                        disabled={encrypting}
                        data-testid="button-encrypt"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        {encrypting ? "Encrypting..." : "Encrypt Text"}
                      </Button>

                      {encryptedResult && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Encrypted Text</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(encryptedResult)}
                              data-testid="button-copy-encrypted"
                            >
                              {copied ? (
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
                          <Textarea
                            value={encryptedResult}
                            readOnly
                            className={`${TEXTAREA_HEIGHTS.MEDIUM} ${SCROLLABLE_OUTPUT} bg-muted/50 font-mono text-sm`}
                            data-testid="output-encrypted"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Encrypted length: {encryptedResult.length} characters
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="decrypt" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="decrypt-text">Encrypted Text</Label>
                        <Textarea
                          id="decrypt-text"
                          value={decryptText}
                          onChange={(e) => setDecryptText(e.target.value)}
                          placeholder="Paste encrypted text here..."
                          className={`${TEXTAREA_HEIGHTS.MEDIUM} ${SCROLLABLE_OUTPUT} mt-2 font-mono text-sm`}
                          data-testid="input-decrypt-text"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {decryptText.length} characters
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="decrypt-password">Password</Label>
                        <div className="relative mt-2">
                          <Input
                            id="decrypt-password"
                            type={showDecryptPassword ? "text" : "password"}
                            value={decryptPassword}
                            onChange={(e) => setDecryptPassword(e.target.value)}
                            placeholder="Enter the password used for encryption"
                            className="pr-10"
                            data-testid="input-decrypt-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowDecryptPassword(!showDecryptPassword)}
                            data-testid="button-toggle-decrypt-password"
                          >
                            {showDecryptPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        onClick={handleDecrypt} 
                        className="w-full" 
                        disabled={decrypting}
                        data-testid="button-decrypt"
                      >
                        <Unlock className="mr-2 h-4 w-4" />
                        {decrypting ? "Decrypting..." : "Decrypt Text"}
                      </Button>

                      {decryptedResult && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Decrypted Text</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(decryptedResult)}
                              data-testid="button-copy-decrypted"
                            >
                              {copied ? (
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
                          <Textarea
                            value={decryptedResult}
                            readOnly
                            className={`${TEXTAREA_HEIGHTS.MEDIUM} ${SCROLLABLE_OUTPUT} bg-muted/50`}
                            data-testid="output-decrypted"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Decrypted length: {decryptedResult.length} characters
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">About Text Encrypt/Decrypt</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Enter text + password → encrypt or decrypt instantly. Ideal for private notes & secure message sharing.
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
