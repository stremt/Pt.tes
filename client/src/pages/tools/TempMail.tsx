import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Copy, RefreshCw, Mail, Check, Inbox, Clock, User, ArrowRight, X, Shield, Lock, AlertTriangle, CheckCircle, Timer, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const MAIL_TM_API = "https://api.mail.tm";

interface MailMessage {
  id: string;
  from: { address: string; name: string };
  subject: string;
  intro: string;
  createdAt: string;
  hasAttachments: boolean;
  text?: string;
  html?: string;
}

export default function TempMail() {
  const [email, setEmail] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("");
  const [accountToken, setAccountToken] = useState<string>("");
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MailMessage | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [copied, setCopied] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Free Temp Mail Generator - Instant Disposable Email, No Signup | Pixocraft Tools",
    description: "Get a free temporary email address instantly with no signup required. Receive messages online, avoid spam, and protect your privacy. 100% free disposable email generator from Pixocraft Tools.",
    keywords: "temp mail, temporary email generator, free disposable email, pixocraft mail, temporary email, free temp mail, privacy email, disposable email generator, fake email, no signup email, instant temp mail",
    canonicalUrl: "https://tools.pixocraft.in/tools/temp-mail",
    ogImage: OG_IMAGES.tempMail,
  });

  // Load saved session from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("tempmail_email");
    const savedId = localStorage.getItem("tempmail_id");
    const savedToken = localStorage.getItem("tempmail_token");

    if (savedEmail && savedId && savedToken) {
      setEmail(savedEmail);
      setAccountId(savedId);
      setAccountToken(savedToken);
      fetchMessages(savedId, savedToken);
    }
  }, []);

  // Auto-refresh every 10 seconds when enabled
  useEffect(() => {
    if (autoRefresh && accountId && accountToken) {
      const interval = setInterval(() => {
        fetchMessages(accountId, accountToken);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, accountId, accountToken]);

  const fetchMessages = async (id: string, token: string) => {
    setFetchingMessages(true);
    try {
      const response = await fetch(`${MAIL_TM_API}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          deleteSession();
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please generate a new email.",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      if (data && data["hydra:member"]) {
        setMessages(data["hydra:member"]);
      }
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Failed to fetch messages",
        description: "Could not retrieve inbox. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFetchingMessages(false);
    }
  };

  const generateEmail = async () => {
    setLoading(true);
    setError("");
    try {
      // Get available domains directly from Mail.tm API
      const domainsResponse = await fetch(`${MAIL_TM_API}/domains`);
      if (!domainsResponse.ok) {
        throw new Error("Failed to fetch domains from email service");
      }
      const domainsData = await domainsResponse.json();
      const domains = domainsData["hydra:member"];
      
      if (!domains || domains.length === 0) {
        throw new Error("No domains available from the email service");
      }

      const domain = domains[0].domain;
      const username = `user${Math.floor(Math.random() * 1000000)}`;
      const generatedEmail = `${username}@${domain}`;
      const password = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      // Create account directly with Mail.tm API
      const createResponse = await fetch(`${MAIL_TM_API}/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: generatedEmail,
          password: password,
        }),
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create account");
      }

      // Get token directly from Mail.tm API
      const authResponse = await fetch(`${MAIL_TM_API}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: generatedEmail,
          password: password,
        }),
      });

      if (!authResponse.ok) {
        throw new Error("Failed to authenticate");
      }

      const authData = await authResponse.json();
      const token = authData.token;
      
      if (!token) {
        throw new Error("Failed to receive authentication token");
      }
      
      // Get account info directly from Mail.tm API
      const accountResponse = await fetch(`${MAIL_TM_API}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!accountResponse.ok) {
        throw new Error("Failed to get account info");
      }

      const accountData = await accountResponse.json();
      const accountId = accountData.id;

      setEmail(generatedEmail);
      setAccountId(accountId);
      setAccountToken(token);

      // Save to localStorage
      localStorage.setItem("tempmail_email", generatedEmail);
      localStorage.setItem("tempmail_id", accountId);
      localStorage.setItem("tempmail_token", token);

      toast({
        title: "Email Generated",
        description: "Your temporary email is ready to use!",
      });
    } catch (error: any) {
      console.error("Error generating email:", error);
      const errorMessage = error.message || "Failed to generate email. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Email address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const deleteSession = () => {
    setEmail("");
    setAccountId("");
    setAccountToken("");
    setMessages([]);
    setSelectedMessage(null);
    setMessageDialogOpen(false);
    localStorage.removeItem("tempmail_email");
    localStorage.removeItem("tempmail_id");
    localStorage.removeItem("tempmail_token");
    toast({
      title: "Session Deleted",
      description: "Your temporary email session has been cleared",
    });
  };

  const openMessage = async (message: MailMessage) => {
    setLoadingMessage(true);
    setMessageDialogOpen(true);
    setSelectedMessage(message);
    
    try {
      const response = await fetch(`${MAIL_TM_API}/messages/${message.id}`, {
        headers: {
          Authorization: `Bearer ${accountToken}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setMessageDialogOpen(false);
          deleteSession();
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please generate a new email.",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to load message");
      }
      
      const data = await response.json();
      setSelectedMessage(data);
    } catch (error: any) {
      console.error("Error fetching message:", error);
      toast({
        title: "Failed to load message",
        description: "Could not load the full message.",
        variant: "destructive",
      });
    } finally {
      setLoadingMessage(false);
    }
  };

  const relatedTools = getRelatedTools("temp-mail");

  const faqItems: FAQItem[] = [
    {
      question: "Is temporary email legal and safe to use?",
      answer: "Yes, using temporary email is completely legal and safe. Disposable email addresses are a legitimate privacy tool used by millions of people worldwide. They help protect your real email from spam and potential data breaches. However, we encourage responsible use—temp mail should be used for legitimate purposes like free trials, one-time signups, and testing, not for fraudulent activities or bypassing legitimate restrictions."
    },
    {
      question: "How long does a temp email last?",
      answer: "Your temporary email session lasts as long as you keep it in your browser. We save your session locally, so you can return to check messages. However, the email service may delete the account after a period of inactivity (typically 24-48 hours). For permanent email needs, use your regular email provider."
    },
    {
      question: "Can websites detect temp mail addresses?",
      answer: "Some websites do block known temporary email domains. However, our service uses legitimate email domains that work with most websites. If you encounter a site that blocks your temp email, you may need to use a different domain or your regular email for that specific service."
    },
    {
      question: "Can I use temp mail for important accounts?",
      answer: "We don't recommend using temporary emails for important accounts or services you plan to use long-term. They're best for one-time signups, testing, or avoiding spam. For banking, social media, or work accounts, always use a permanent email address to ensure you can recover your account and receive important notifications."
    },
    {
      question: "What is a temporary email address?",
      answer: "A temporary email address (also called disposable email or temp mail) is a short-term email address that you can use to receive emails without exposing your real email. It's perfect for one-time signups, testing services, or avoiding spam. At Pixocraft Tools, we provide free temporary email addresses that work instantly without any registration."
    },
    {
      question: "Is my data secure with temp mail?",
      answer: "Yes! All email data is stored temporarily and we don't track or store any personal information. Your session is saved locally in your browser only. We use secure HTTPS connections and don't share your temporary email address or any received messages with third parties. However, avoid using temp mail for sensitive or confidential information."
    },
    {
      question: "Can I send emails from my temp mail?",
      answer: "No, temporary email addresses from Pixocraft Tools are designed to receive emails only. They cannot be used to send outgoing messages. This is a security feature that prevents spam and abuse. If you need to send emails, use your regular email account or a proper email service provider."
    },
    {
      question: "What are the best use cases for temporary email?",
      answer: "Temporary email is perfect for: signing up for free trials, downloading resources that require email verification, testing email functionality in your applications, registering for forums or communities you'll use once, avoiding spam from promotional newsletters, and protecting your privacy on untrusted websites. It's used by developers, digital marketers, and privacy-conscious users worldwide."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Temp Mail Generator</span>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Temp Mail Generator</h1>
          <h2 className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Free instant disposable email with no signup required. Protect your privacy, avoid spam, and receive verification emails safely.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary">100% Free</Badge>
            <Badge variant="secondary">No Signup</Badge>
            <Badge variant="secondary">Instant</Badge>
            <Badge variant="secondary">Privacy First</Badge>
          </div>
        </div>

        {/* Main Tool Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16">
          {/* Generator Section - 40% */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Email</CardTitle>
                <CardDescription>
                  Create a temporary email address instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!email ? (
                  <>
                    <Button
                      onClick={generateEmail}
                      disabled={loading}
                      className="w-full"
                      size="lg"
                      data-testid="button-generate-email"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Generate Email
                        </>
                      )}
                    </Button>
                    {error && (
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                        {error}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Your Temporary Email
                      </label>
                      <div className="flex gap-2">
                        <Input
                          value={email}
                          readOnly
                          className="font-mono text-sm"
                          data-testid="input-generated-email"
                        />
                        <Button
                          onClick={copyEmail}
                          size="icon"
                          variant="outline"
                          data-testid="button-copy-email"
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => fetchMessages(accountId, accountToken)}
                        variant="outline"
                        className="flex-1"
                        disabled={fetchingMessages}
                        data-testid="button-refresh-inbox"
                      >
                        <RefreshCw className={`mr-2 h-4 w-4 ${fetchingMessages ? 'animate-spin' : ''}`} />
                        {fetchingMessages ? 'Refreshing...' : 'Refresh'}
                      </Button>
                      <Button
                        onClick={deleteSession}
                        variant="destructive"
                        className="flex-1"
                        data-testid="button-delete-session"
                      >
                        Delete
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <span className="text-sm font-medium">Auto-refresh (10s)</span>
                      <Button
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        variant={autoRefresh ? "default" : "outline"}
                        size="sm"
                        data-testid="button-toggle-autorefresh"
                      >
                        {autoRefresh ? "ON" : "OFF"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Inbox Section - 60% */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Inbox className="h-5 w-5" />
                      Inbox
                    </CardTitle>
                    <CardDescription>
                      {messages.length} message{messages.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </div>
                  {autoRefresh && (
                    <Badge variant="secondary" className="animate-pulse">
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Live
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!email ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Generate an email to see your inbox</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Inbox className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p className="font-medium mb-1">No messages yet</p>
                    <p className="text-sm">New emails will appear here automatically</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <Card
                        key={message.id}
                        className="hover-elevate cursor-pointer"
                        onClick={() => openMessage(message)}
                        data-testid={`card-message-${message.id}`}
                      >
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="font-medium truncate">
                                {message.from.name || message.from.address}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(message.createdAt).toLocaleString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                          <p className="font-medium">{message.subject}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {message.intro}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-lg">Generate Email</h3>
              <p className="text-muted-foreground">
                Click the button to instantly create a temporary email address
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-lg">Use Anywhere</h3>
              <p className="text-muted-foreground">
                Copy the email and use it for signups, verification, or testing
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-lg">Receive Messages</h3>
              <p className="text-muted-foreground">
                Check your inbox for incoming emails. Auto-refresh keeps it live
              </p>
            </div>
          </div>
        </section>

        {/* Responsible Use Disclaimer */}
        <section className="mb-16">
          <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Responsible Use Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Temporary email is a powerful privacy tool, but it should be used responsibly. We encourage ethical use of our service:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Recommended Uses</p>
                    <p className="text-sm text-muted-foreground">Free trials, one-time signups, newsletter testing, development testing, and avoiding spam</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Not Recommended</p>
                    <p className="text-sm text-muted-foreground">Important accounts, fraud, bypassing legitimate restrictions, or any illegal activities</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Email Lifetime & Privacy Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Email Lifetime & Privacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-primary" />
                  Email Lifetime
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Your temporary email is designed for short-term use. Here's what you need to know:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    Session persists in your browser until cleared
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    Emails typically available for 24-48 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    Not suitable for account recovery
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    Don't use for banking or important accounts
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy & Data Handling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Your privacy is our priority. Here's how we protect your data:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    No signup or personal information required
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    No tracking, no cookies, no analytics
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Session stored locally in your browser only
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Secure HTTPS connections throughout
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Use Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Use Temp Mail from Pixocraft Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Protect Your Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Keep your real email address private and avoid exposing it to untrusted websites. In today's digital world, your email is a key to your identity. Temporary email addresses act as a shield, protecting your primary inbox from potential data breaches, tracking, and unwanted marketing campaigns.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avoid Spam</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Prevent spam and promotional emails from cluttering your primary inbox. Once you use your email on a website, it can be sold to marketers or leaked in data breaches. With disposable email from Pixocraft Tools, you maintain a clean inbox and only receive emails that matter to you.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>No Registration Required</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get started instantly without creating an account or providing personal information. Unlike other temp mail services, Pixocraft Tools doesn't ask for your details. Just click generate and you're ready to use your temporary email address immediately—it's that simple.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Perfect for Developers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ideal for testing email functionality or trying out new services. Developers use our temp mail tool to test registration flows, email verification systems, and notification features without using real email addresses or setting up test accounts.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="prose prose-lg max-w-4xl mx-auto space-y-4">
            <p className="text-muted-foreground">
              Whether you're signing up for a free trial, downloading a resource, or just browsing websites that require email verification, Pixocraft Tools' temporary email generator helps you stay safe online. Learn more about <Link href="/blogs/what-is-temp-mail" className="text-primary hover:underline">how temporary email works and why it's essential for online privacy</Link>.
            </p>
            <p className="text-muted-foreground">
              Need to create secure passwords for your accounts? Try our <Link href="/tools/password-generator" className="text-primary hover:underline inline-flex items-center gap-1"><Key className="h-4 w-4" />Password Generator</Link> to create strong, unique passwords for every site you sign up for.
            </p>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Free Trials & Downloads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Sign up for free trials without committing your real email. Download ebooks, templates, or resources that require email verification.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Testing & Development</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Test your app's email features, verify registration flows, and debug email-related functionality without creating multiple test accounts.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Forum Registrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Join online communities and forums for quick questions without exposing your primary email to potential spam from newsletters.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem key={`faq-${index}`} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Brand Authority Signal */}
        <section className="mb-16">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-8 text-center">
              <p className="text-lg font-medium mb-2">Trusted Privacy Tools</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Part of India's largest privacy-focused, offline-first tool hub with 200+ free tools. Join millions of users who trust Pixocraft Tools for their daily privacy and productivity needs.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((tool) => {
              const Icon = getToolIcon(tool.icon);
              return (
                <Card key={tool.id} className="hover-elevate">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{tool.description}</CardDescription>
                    <Link href={tool.path}>
                      <Button variant="outline" className="w-full" data-testid={`button-related-${tool.id}`}>
                        Use Tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>

    {/* Message Viewer Dialog */}
    <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto" data-testid="dialog-message-viewer">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-4">
            <span className="truncate">{selectedMessage?.subject || "Loading..."}</span>
          </DialogTitle>
        </DialogHeader>

        {loadingMessage ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : selectedMessage ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">From:</span>
                <span className="text-muted-foreground">
                  {selectedMessage.from.name || selectedMessage.from.address}
                  {selectedMessage.from.name && (
                    <span className="text-xs ml-1">({selectedMessage.from.address})</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Date:</span>
                <span className="text-muted-foreground">
                  {new Date(selectedMessage.createdAt).toLocaleString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            <Separator />

            <div className="prose prose-sm max-w-none dark:prose-invert">
              {selectedMessage.html ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: selectedMessage.html }}
                  className="bg-muted/30 p-4 rounded-lg"
                />
              ) : selectedMessage.text ? (
                <div className="whitespace-pre-wrap bg-muted/30 p-4 rounded-lg">
                  {selectedMessage.text}
                </div>
              ) : (
                <p className="text-muted-foreground italic">No message content available</p>
              )}
            </div>

            {selectedMessage.hasAttachments && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-lg">
                <p className="text-sm text-amber-900 dark:text-amber-100">
                  This message has attachments. Attachment viewing is not currently supported.
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No message selected</p>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}
