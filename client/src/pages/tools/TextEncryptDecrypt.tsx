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
import { Lock, Unlock, Copy, Check, ArrowRight, Eye, EyeOff, Shield, WifiOff } from "lucide-react";
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
    title: "Free Text Encrypt Decrypt - Secure Your Data Online",
    description: "Encrypt and decrypt text with AES-256. Keep your data private and secure. Free, offline tool—works in your browser.",
    keywords: "text encrypt, text decrypt, encrypt text online, decrypt text, message encryption, secure text tool, offline encryption, password protected text, aes-256 encrypt, private encryption tool",
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
      question: "Is this 100% private and secure?",
      answer: "Yes, absolutely. All encryption happens locally in your browser using military-grade AES-256 standards. Your text and password never leave your device—no servers, no logging, no data collection."
    },
    {
      question: "Can I decrypt text encrypted with a different password?",
      answer: "No. The exact password used for encryption is required to decrypt the text. Without the correct password, the encrypted text remains locked. This is why choosing a strong password matters."
    },
    {
      question: "Is my password stored anywhere?",
      answer: "No, never. Passwords exist only during encryption/decryption and are never saved, stored in databases, or transmitted. Keep your password safe—losing it means losing access to encrypted text forever."
    },
    {
      question: "What makes AES-256 encryption so strong?",
      answer: "AES-256 uses 256-bit encryption keys with 100,000+ iteration rounds for maximum security. This is the same encryption standard used by governments, banks, and military organizations worldwide."
    },
    {
      question: "Can I use this for sensitive or confidential information?",
      answer: "Yes, absolutely. This tool is perfect for securing passwords, API keys, personal notes, business secrets, client information, or any data you need to keep private and protected."
    },
    {
      question: "Does this work completely offline?",
      answer: "Yes. Once loaded, the tool works 100% offline. All encryption and decryption happens locally in your browser—perfect for secure environments or when internet access isn't available."
    },
    {
      question: "Can I share encrypted text with someone else?",
      answer: "Yes. Copy the encrypted text and share it via email, messages, or cloud storage. The recipient can decrypt it with the same password. The encrypted text is safe to share publicly—only the correct password can unlock it."
    },
    {
      question: "What happens if I forget my encryption password?",
      answer: "If you forget the password, the encrypted text cannot be recovered—it's permanently inaccessible. This is by design for maximum security. Always keep your passwords in a safe place like a password manager."
    }
  ];

  return (
    <>
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Encrypt & Decrypt Text - Free, Secure, 100% Private</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encrypt and decrypt your sensitive text with military-grade AES-256 encryption. 100% free, completely offline, no data uploads.
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

          {/* On-Page Content Section */}
          <section className="prose prose-sm dark:prose-invert max-w-none space-y-6 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">What Is Text Encryption and Why Does It Matter?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Text encryption is a way to scramble your sensitive information so only someone with the correct password can read it. Think of it like locking your diary with a unique key—only the person with that key can open it and read what's inside. Encryption uses complex mathematical algorithms to transform readable text into unreadable code. Without the password, the encrypted text is meaningless and cannot be reversed or deciphered.
                </p>
                <p>
                  In today's digital world, privacy matters more than ever. Whether you're storing confidential business notes, protecting personal information, securing API keys for development, or sharing sensitive data with trusted contacts, encryption keeps your information safe from unauthorized access, hackers, and data breaches. This tool uses AES-256, the same encryption standard trusted by governments and financial institutions.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Who Should Use This Tool?</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">•</div>
                  <div>
                    <span className="font-semibold text-foreground">Developers & Programmers:</span> Encrypt API keys, database credentials, configuration files, and sensitive secrets before sharing with team members or storing in repositories. Keep production secrets safe and secure.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">•</div>
                  <div>
                    <span className="font-semibold text-foreground">Business Professionals:</span> Protect confidential business documents, client information, financial data, passwords, and sensitive communication. Keep proprietary information secure from competitors and unauthorized access.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">•</div>
                  <div>
                    <span className="font-semibold text-foreground">Students & Researchers:</span> Encrypt exam notes, research data, dissertation content, and academic work. Protect intellectual property before sharing with professors, peers, or publishing online.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">•</div>
                  <div>
                    <span className="font-semibold text-foreground">Anyone Concerned with Privacy:</span> Keep personal passwords, banking information, health data, and private notes secure. Encrypt anything you wouldn't want others to read or access.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Real-Life Use Cases</h3>
              <div className="space-y-3 text-muted-foreground">
                <div>
                  <span className="font-semibold text-foreground">Scenario 1: Sharing Passwords Securely</span>
                  <p className="text-sm mt-1">You need to share your WiFi password, bank PIN, or account credentials with a family member or colleague. Instead of sending it in plain text via email or text message (risky!), encrypt it here. Share the encrypted text via any channel. Only the person who knows the password can decrypt and read it.</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Scenario 2: Protecting API Keys and Secrets</span>
                  <p className="text-sm mt-1">You're a developer managing multiple API keys for different services. Store them in encrypted format. When a teammate needs access, decrypt and share only what they need. This prevents accidental leaks if your device gets hacked or files are accessed without permission.</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Scenario 3: Securing Confidential Notes</span>
                  <p className="text-sm mt-1">You have personal notes with sensitive information—medical details, financial records, or private thoughts. Encrypt them and save the encrypted text in your cloud storage (Google Drive, Dropbox, etc.). Even if someone accesses your cloud account, they can't read the encrypted notes without the password.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Privacy & Security Guarantee</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your privacy is guaranteed 100%. This encryption tool runs completely in your browser—nothing is uploaded to servers, stored in databases, or logged by anyone. Your data never leaves your device.
                </p>
                <p>
                  <span className="font-semibold text-foreground">How it works:</span> When you type text and click "Encrypt," the AES-256 algorithm runs locally using your browser's processing power. Your password is used to generate encryption keys instantly. The moment you close this page, everything is erased from memory. No traces remain. True offline processing—complete privacy.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Why this matters:</span> You can safely encrypt passwords, API keys, personal information, and confidential business data without any risk. Unlike other online encryption tools that upload your data to servers and could be compromised by hackers, this tool never touches your information with servers. Your encryption happens entirely on your device.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Use Text Encryption?</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Protect sensitive information from unauthorized access. Whether storing confidential notes, sharing passwords securely, or keeping personal data private—encryption keeps it safe.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">For Students & Researchers</h3>
                        <p className="text-sm text-muted-foreground">Secure exam notes, research data, or confidential project details before sharing or storing online.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">For Professionals</h3>
                        <p className="text-sm text-muted-foreground">Protect sensitive client information, API keys, API credentials, or confidential business communication.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">For Developers</h3>
                        <p className="text-sm text-muted-foreground">Encrypt database backups, secure configuration files, or temporarily lock down secrets before sharing with teammates.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="max-w-4xl mx-auto mb-12 bg-primary/5 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Your Privacy is Guaranteed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Unlock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">No Server Uploads</h4>
                        <p className="text-sm text-muted-foreground">All encryption happens locally in your browser. Your data never touches our servers or any external system.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <WifiOff className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Works Offline</h4>
                        <p className="text-sm text-muted-foreground">Once loaded, this tool runs completely offline. Perfect for secure environments or when internet isn't available.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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

          {/* Category Footer */}
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/privacy" className="text-primary hover:text-primary/80 transition-colors">Privacy Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
