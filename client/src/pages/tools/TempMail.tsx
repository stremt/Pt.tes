import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Copy, RefreshCw, Mail, Check, Inbox, Clock, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import axios from "axios";

interface MailMessage {
  id: string;
  from: { address: string; name: string };
  subject: string;
  intro: string;
  createdAt: string;
  hasAttachments: boolean;
}

export default function TempMail() {
  const [email, setEmail] = useState<string>("");
  const [accountId, setAccountId] = useState<string>("");
  const [accountToken, setAccountToken] = useState<string>("");
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MailMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Free Temp Mail Generator | Pixocraft Tools",
    description: "Generate temporary disposable emails instantly with Pixocraft Tools. Receive messages online, avoid spam, and protect your privacy. No registration required.",
    keywords: "temp mail, free temp mail, disposable email, pixocraft mail, temporary email, free disposable email, privacy email",
    canonicalUrl: "https://tools.pixocraft.in/tools/temp-mail",
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
    try {
      const response = await axios.get(`https://api.mail.tm/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data["hydra:member"]) {
        setMessages(response.data["hydra:member"]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const generateEmail = async () => {
    setLoading(true);
    try {
      // Get available domains
      const domainsResponse = await axios.get("https://api.mail.tm/domains");
      const domains = domainsResponse.data["hydra:member"];
      
      if (!domains || domains.length === 0) {
        throw new Error("No domains available");
      }

      const domain = domains[0].domain;
      const username = `user${Math.floor(Math.random() * 1000000)}`;
      const generatedEmail = `${username}@${domain}`;
      const password = Math.random().toString(36).substring(2, 15);

      // Create account
      await axios.post("https://api.mail.tm/accounts", {
        address: generatedEmail,
        password: password,
      });

      // Get token
      const authResponse = await axios.post("https://api.mail.tm/token", {
        address: generatedEmail,
        password: password,
      });

      const token = authResponse.data.token;
      const accountResponse = await axios.get("https://api.mail.tm/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const accountId = accountResponse.data.id;

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
    } catch (error) {
      console.error("Error generating email:", error);
      toast({
        title: "Error",
        description: "Failed to generate email. Please try again.",
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
    localStorage.removeItem("tempmail_email");
    localStorage.removeItem("tempmail_id");
    localStorage.removeItem("tempmail_token");
    toast({
      title: "Session Deleted",
      description: "Your temporary email session has been cleared",
    });
  };

  const relatedTools = getRelatedTools("temp-mail");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does the temporary email last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your temporary email session lasts as long as you keep it in your browser. We save your session locally, so you can return to check messages. However, the email service may delete the account after a period of inactivity."
        }
      },
      {
        "@type": "Question",
        "name": "Can I send emails from my temp mail?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, temporary email addresses are designed to receive emails only. They cannot be used to send outgoing messages."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All email data is stored temporarily and we don't track or store any personal information. Your session is saved locally in your browser only."
        }
      }
    ]
  };

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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate temporary disposable email addresses. Protect your privacy and avoid spam.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary">Free</Badge>
            <Badge variant="secondary">No Signup</Badge>
            <Badge variant="secondary">Instant</Badge>
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
                        data-testid="button-refresh-inbox"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
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
                        onClick={() => setSelectedMessage(message)}
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
                              {new Date(message.createdAt).toLocaleTimeString()}
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

        {/* Why Use Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Use Temp Mail?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Protect Your Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Keep your real email address private and avoid exposing it to untrusted websites
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avoid Spam</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Prevent spam and promotional emails from cluttering your primary inbox
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>No Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get started instantly without creating an account or providing personal information
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Perfect for Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ideal for developers testing email functionality or trying out new services
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
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does the temporary email last?</AccordionTrigger>
                <AccordionContent>
                  Your temporary email session lasts as long as you keep it in your browser. We save your session locally, so you can return to check messages. However, the email service may delete the account after a period of inactivity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I send emails from my temp mail?</AccordionTrigger>
                <AccordionContent>
                  No, temporary email addresses are designed to receive emails only. They cannot be used to send outgoing messages.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes! All email data is stored temporarily and we don't track or store any personal information. Your session is saved locally in your browser only.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I use this for important accounts?</AccordionTrigger>
                <AccordionContent>
                  We don't recommend using temporary emails for important accounts or services you plan to use long-term. They're best for one-time signups, testing, or avoiding spam.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What happens if I close my browser?</AccordionTrigger>
                <AccordionContent>
                  Your email session is saved in your browser's local storage. When you return to this page in the same browser, your email will still be available.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
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
    </>
  );
}
