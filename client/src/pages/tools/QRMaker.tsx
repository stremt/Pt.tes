import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, Smartphone, Shield } from "lucide-react";
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
    title: "Free QR Code Generator Online - Create QR Codes Instantly | Pixocraft Tools",
    description: "Generate free QR codes online for URLs, text, and contact information with Pixocraft Tools. Create custom QR codes instantly, download high-quality images for marketing, business cards, and more. No signup required.",
    keywords: "qr code generator free, online qr maker, free qr code creator, qr code maker, create qr code online, custom qr code generator, qr code for url, pixocraft tools, qr generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-maker",
    ogImage: OG_IMAGES.qrMaker,
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

  const faqItems: FAQItem[] = [
    {
      question: "What is a QR code and how does it work?",
      answer: "A QR (Quick Response) code is a two-dimensional barcode that stores information in a matrix of black and white squares. When scanned with a smartphone camera or QR reader app, it instantly decodes the embedded data—whether it's a website URL, contact details, plain text, or other information. QR codes were invented in 1994 for tracking automotive parts but have since become ubiquitous in marketing, payments, product packaging, and contactless information sharing. Pixocraft Tools generates standard QR codes that work with all modern smartphones."
    },
    {
      question: "How do I use the QR code generator?",
      answer: "Using Pixocraft Tools' free QR code generator is simple: First, choose the type of QR code you want (URL, Text, or Contact). Then, enter your information—paste a website link, type any text message, or fill in contact details including name, phone, and email. Click 'Generate QR Code' to create your custom code instantly. Finally, download the high-quality PNG image to use in print materials, digital marketing, business cards, or anywhere you need it. The entire process takes less than 30 seconds with no registration required."
    },
    {
      question: "What are the best practices for using QR codes effectively?",
      answer: "For maximum effectiveness, place QR codes where they're easily accessible and ensure they're large enough to scan (minimum 2x2 cm). Always test your QR codes before printing or publishing to verify they work correctly. Provide context with a clear call-to-action like 'Scan for menu' or 'Scan to visit website.' Use URL shorteners for tracking purposes, and avoid placing QR codes in areas with poor lighting or on curved surfaces. For marketing campaigns, combine QR codes with incentives like discounts or exclusive content to increase scan rates."
    },
    {
      question: "Can I customize the appearance of QR codes?",
      answer: "Currently, Pixocraft Tools generates standard black and white QR codes optimized for maximum compatibility and scan reliability across all devices and scanning apps. This classic design ensures the highest success rate when users scan your codes. While we plan to add customization features like color selection and logo embedding in future updates, our current focus is on reliability and ease of use. The standard QR codes we generate work universally and can be resized without quality loss."
    },
    {
      question: "What are the most popular use cases for QR codes?",
      answer: "QR codes have countless applications across industries. In marketing, they're used on posters, flyers, and advertisements to drive traffic to websites or promotional offers. Restaurants use them for contactless menu access. Business professionals include them on business cards for instant contact sharing. Event organizers use QR codes for ticketing and check-ins. Retailers use them for product information and mobile payments. Educational institutions use them for resource sharing. The versatility makes QR codes an essential tool for anyone looking to bridge physical and digital experiences seamlessly."
    },
    {
      question: "Are QR codes secure and safe to use?",
      answer: "QR codes themselves are secure—they're just a way to encode information visually. However, like any technology, they can be misused. Always scan QR codes from trusted sources, as malicious codes could direct you to phishing websites or trigger unwanted downloads. Most modern smartphones show a preview of the URL before opening it, giving you a chance to verify it's legitimate. When creating QR codes with Pixocraft Tools, the data is processed entirely in your browser—we never store or track your information. For sensitive business use, consider using dynamic QR codes with password protection."
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
                <div className="p-6 bg-white rounded-lg min-h-[340px] w-full flex items-center justify-center">
                  {!qrCodeUrl ? (
                    <div className="text-center text-muted-foreground">
                      <QrCode className="h-24 w-24 mx-auto mb-4 opacity-20" />
                      <p className="font-medium">No QR code yet</p>
                      <p className="text-sm">Fill in the details and click generate</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <canvas
                        ref={canvasRef}
                        className="max-w-full"
                        data-testid="canvas-qr-code"
                      />
                    </div>
                  )}
                </div>
                {qrCodeUrl && (
                  <Button
                    onClick={downloadQR}
                    variant="outline"
                    className="w-full"
                    data-testid="button-download-qr"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Why Use Pixocraft Tools' QR Code Generator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Smartphone className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Instant Contactless Information Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  In today's fast-paced digital world, QR codes have become the universal language for instant information transfer. Pixocraft Tools' free QR code generator empowers you to create professional QR codes in seconds, enabling seamless communication between physical and digital spaces. Whether you're sharing a website URL, contact information, or plain text, our tool eliminates the need for manual typing and ensures accuracy every time. Perfect for businesses, marketers, educators, and individuals who want to provide quick, touchless access to information without friction or barriers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <QrCode className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Powerful Marketing Tool for Modern Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  QR codes have revolutionized marketing by bridging offline and online channels effortlessly. With Pixocraft Tools, you can create custom QR codes for business cards, product packaging, print advertisements, event posters, and promotional materials. Drive traffic to your landing pages, social media profiles, or special offers with a simple scan. Track campaign performance by embedding analytics-enabled URLs, measure engagement rates, and optimize your marketing ROI. From small businesses to enterprise campaigns, QR codes provide measurable results and enhanced customer engagement that traditional methods can't match.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Download className="h-8 w-8 text-primary mb-2" />
                <CardTitle>High-Quality, Professional Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our online QR maker generates crisp, professional-quality QR codes optimized for both digital displays and print materials. Each code is created at 300x300 pixels with optimal contrast, ensuring reliable scanning even from a distance or in various lighting conditions. Download your QR code as a PNG file ready for immediate use in presentations, flyers, websites, or product labels. The clean, standardized design ensures maximum compatibility with all smartphone cameras and QR scanning apps. No watermarks, no limitations—just high-quality QR codes you can use with confidence in any professional setting.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Free, Private, and Secure Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your data privacy matters. Unlike many QR code generators, Pixocraft Tools processes everything directly in your browser using client-side JavaScript. Your URLs, contact information, and text content are never transmitted to our servers or stored in any database. This means your sensitive business information, personal contact details, and proprietary URLs remain completely private. No registration, no email signup, no tracking cookies—just secure, instant QR code generation whenever you need it. Generate unlimited QR codes for free with complete peace of mind about your data security.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="prose prose-lg max-w-4xl mx-auto">
            <p className="text-muted-foreground">
              QR codes are transforming how businesses connect with customers and how individuals share information. Learn more about <Link href="/blogs/qr-codes-marketing-guide" className="text-primary hover:underline">leveraging QR codes in your marketing strategy</Link> to maximize engagement and drive measurable results with Pixocraft Tools.
            </p>
          </div>
        </section>

        {/* Popular Use Cases Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Business & Networking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Add QR codes to business cards for instant contact sharing. Include them on email signatures, LinkedIn profiles, and conference badges. Enable professionals to save your vCard with one scan, eliminating manual data entry and ensuring accuracy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Restaurants & Hospitality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Create contactless digital menus for restaurants, cafes, and bars. Use QR codes for table ordering, feedback collection, and loyalty program signups. Reduce physical contact while providing customers with updated menus and special offers instantly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Marketing & Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Drive engagement with QR codes on posters, flyers, and product packaging. Use them for event ticketing, registration, and check-ins. Track campaign performance, collect leads, and measure ROI across your marketing initiatives.
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
