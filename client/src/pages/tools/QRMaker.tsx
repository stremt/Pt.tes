import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import QRCodeLib from "qrcode";

export default function QRMaker() {
  const [inputType, setInputType] = useState<"text" | "url" | "contact">("url");
  const [textValue, setTextValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free QR Code Generator | Pixocraft Tools",
    description: "Create custom QR codes for URLs, text, or contact information with Pixocraft Tools. Download high-quality QR codes instantly for free.",
    keywords: "qr code generator, qr maker, create qr code, free qr code, qr code creator, custom qr code",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-maker",
  });

  const generateQR = async () => {
    let data = "";

    switch (inputType) {
      case "text":
        data = textValue;
        break;
      case "url":
        data = urlValue;
        break;
      case "contact":
        // vCard format for contact
        data = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${contactPhone}\nEMAIL:${contactEmail}\nEND:VCARD`;
        break;
    }

    if (!data.trim()) {
      toast({
        title: "Error",
        description: "Please enter some data to generate a QR code",
        variant: "destructive",
      });
      return;
    }

    try {
      if (canvasRef.current) {
        await QRCodeLib.toCanvas(canvasRef.current, data, {
          width: 300,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        const url = canvasRef.current.toDataURL();
        setQrCodeUrl(url);

        toast({
          title: "Success!",
          description: "QR code generated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const downloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.download = `pixocraft-qr-${Date.now()}.png`;
      link.href = qrCodeUrl;
      link.click();

      toast({
        title: "Downloaded!",
        description: "QR code saved to your downloads",
      });
    }
  };

  useEffect(() => {
    setQrCodeUrl("");
  }, [inputType, textValue, urlValue, contactName, contactPhone, contactEmail]);

  const relatedTools = getRelatedTools("qr-maker");

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">QR Code Maker</span>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">QR Code Maker</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create custom QR codes for URLs, text, or contact information. Download instantly in high quality.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary">Free</Badge>
            <Badge variant="secondary">High Quality</Badge>
            <Badge variant="secondary">Instant Download</Badge>
          </div>
        </div>

        {/* Main Tool Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {/* Input Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>QR Code Content</CardTitle>
                <CardDescription>
                  Choose what type of QR code you want to create
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={inputType} onValueChange={(v) => setInputType(v as typeof inputType)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="url" data-testid="tab-url">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="text" data-testid="tab-text">
                      <FileText className="h-4 w-4 mr-2" />
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="contact" data-testid="tab-contact">
                      <User className="h-4 w-4 mr-2" />
                      Contact
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="url" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">Website URL</Label>
                      <Input
                        id="url"
                        placeholder="https://example.com"
                        value={urlValue}
                        onChange={(e) => setUrlValue(e.target.value)}
                        data-testid="input-url"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the full URL including https://
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="text">Text Content</Label>
                      <Textarea
                        id="text"
                        placeholder="Enter any text..."
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        rows={6}
                        data-testid="input-text"
                      />
                      <p className="text-xs text-muted-foreground">
                        Any text up to 500 characters
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+1 234 567 8900"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          data-testid="input-contact-phone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  onClick={generateQR}
                  className="w-full"
                  size="lg"
                  data-testid="button-generate-qr"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>QR Code Preview</CardTitle>
                <CardDescription>
                  Your QR code will appear here
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center space-y-4">
                {!qrCodeUrl ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <QrCode className="h-24 w-24 mx-auto mb-4 opacity-20" />
                    <p className="font-medium">No QR code yet</p>
                    <p className="text-sm">Fill in the details and click generate</p>
                  </div>
                ) : (
                  <>
                    <div className="p-6 bg-white rounded-lg">
                      <canvas
                        ref={canvasRef}
                        className="max-w-full"
                        data-testid="canvas-qr-code"
                      />
                    </div>
                    <Button
                      onClick={downloadQR}
                      variant="outline"
                      className="w-full"
                      data-testid="button-download-qr"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download QR Code
                    </Button>
                  </>
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
              <h3 className="font-semibold text-lg">Choose Type</h3>
              <p className="text-muted-foreground">
                Select whether you want a URL, text, or contact QR code
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-lg">Enter Data</h3>
              <p className="text-muted-foreground">
                Fill in your information and click generate
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-lg">Download</h3>
              <p className="text-muted-foreground">
                Save your high-quality QR code as a PNG image
              </p>
            </div>
          </div>
        </section>

        {/* Why Use Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Use QR Codes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Share Information Easily</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  QR codes make it simple to share URLs, contact info, or text without typing
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Marketing & Promotion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Perfect for business cards, posters, flyers, and digital marketing campaigns
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contactless Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ideal for menus, event check-ins, and any touchless information sharing
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Track & Analyze</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use QR codes with tracking URLs to measure campaign effectiveness
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
                <AccordionTrigger>What can I encode in a QR code?</AccordionTrigger>
                <AccordionContent>
                  You can encode URLs, plain text, contact information (vCard), WiFi credentials, email addresses, phone numbers, and more. Our tool currently supports URLs, text, and contact information.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do QR codes expire?</AccordionTrigger>
                <AccordionContent>
                  Static QR codes (like the ones we generate) never expire. They contain the information directly and will work forever. However, if you encode a URL that later becomes inactive, the QR code will still work but lead to a dead link.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I customize the QR code design?</AccordionTrigger>
                <AccordionContent>
                  Currently, we generate standard black and white QR codes for maximum compatibility. In future updates, we plan to add color customization and logo embedding features.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do people scan QR codes?</AccordionTrigger>
                <AccordionContent>
                  Most modern smartphones can scan QR codes directly through their camera app. Users simply point their camera at the code, and a notification appears to open the link or view the content.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What's the best size to print QR codes?</AccordionTrigger>
                <AccordionContent>
                  For reliable scanning, QR codes should be at least 2 x 2 cm (0.8 x 0.8 inches). Larger is better for viewing from a distance. Our generated codes are 300x300 pixels and scale well for both digital and print use.
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

        {/* Hidden canvas for QR generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
