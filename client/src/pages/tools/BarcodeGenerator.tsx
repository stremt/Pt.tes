import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Barcode, Download, Zap, Lock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import JsBarcode from "jsbarcode";

export default function BarcodeGenerator() {
  const [text, setText] = useState("");
  const [format, setFormat] = useState("CODE128");
  const [barcodeUrl, setBarcodeUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Barcode Generator | Code128, EAN, UPC Creator",
    description: "Generate barcodes instantly for products, inventory & business use. Offline, fast & downloadable.",
    keywords: "barcode generator, code128 barcode, ean barcode, upc creator",
    canonicalUrl: "https://tools.pixocraft.in/tools/barcode-generator",
  });

  const getFormatRequirements = (format: string): string => {
    switch (format) {
      case "EAN13":
        return "EAN-13 requires exactly 12 or 13 digits";
      case "UPC":
        return "UPC requires exactly 11 or 12 digits";
      case "CODE39":
        return "CODE39 accepts letters, numbers, and some special characters";
      case "CODE128":
        return "CODE128 accepts any text and numbers";
      case "ITF14":
        return "ITF-14 requires exactly 14 digits";
      case "pharmacode":
        return "Pharmacode requires a number between 3 and 131070";
      default:
        return "";
    }
  };

  const validateInput = (text: string, format: string): { valid: boolean; error?: string } => {
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      return { valid: false, error: "Please enter text to generate a barcode" };
    }

    switch (format) {
      case "EAN13":
        if (!/^\d{12,13}$/.test(trimmedText)) {
          return { valid: false, error: "EAN-13 requires exactly 12 or 13 digits. Example: 123456789012" };
        }
        break;
      case "UPC":
        if (!/^\d{11,12}$/.test(trimmedText)) {
          return { valid: false, error: "UPC requires exactly 11 or 12 digits. Example: 12345678901" };
        }
        break;
      case "ITF14":
        if (!/^\d{14}$/.test(trimmedText)) {
          return { valid: false, error: "ITF-14 requires exactly 14 digits" };
        }
        break;
      case "pharmacode":
        const num = parseInt(trimmedText);
        if (isNaN(num) || num < 3 || num > 131070) {
          return { valid: false, error: "Pharmacode requires a number between 3 and 131070" };
        }
        break;
      case "CODE39":
        if (!/^[0-9A-Z\-\.\ \$\/\+\%]+$/.test(trimmedText)) {
          return { valid: false, error: "CODE39 only accepts: A-Z, 0-9, and special chars: - . $ / + % space" };
        }
        break;
      case "CODE128":
        // CODE128 accepts almost anything
        break;
    }
    
    return { valid: true };
  };

  const generateBarcode = () => {
    const validation = validateInput(text, format);
    
    if (!validation.valid) {
      toast({
        title: "Invalid Input",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      JsBarcode(canvas, text.trim(), {
        format: format,
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10,
        background: "#ffffff",
      });

      const url = canvas.toDataURL();
      setBarcodeUrl(url);
      
      toast({
        title: "Success!",
        description: "Barcode generated successfully",
      });
    } catch (error) {
      toast({
        title: "Generation Error",
        description: error instanceof Error ? error.message : "Failed to generate barcode. Check your input.",
        variant: "destructive",
      });
    }
  };

  const downloadBarcode = () => {
    if (barcodeUrl) {
      const link = document.createElement("a");
      link.download = `pixocraft-barcode-${text}-${Date.now()}.png`;
      link.href = barcodeUrl;
      link.click();

      toast({
        title: "Downloaded!",
        description: "Barcode saved to your downloads",
      });
    }
  };

  const handleClear = () => {
    setText("");
    setBarcodeUrl("");
  };

  const relatedTools = getRelatedTools("barcode-generator");

  const faqItems: FAQItem[] = [
    {
      question: "Is this barcode generator free?",
      answer: "Yes! Our barcode generator is 100% free with no limits, no login required, and no watermarks."
    },
    {
      question: "What barcode formats are supported?",
      answer: "We support popular formats including CODE128 (most versatile), EAN-13 (for retail products), UPC (Universal Product Code), and CODE39 (alphanumeric). CODE128 is recommended for most use cases as it supports numbers, letters, and special characters."
    },
    {
      question: "Can I download the barcodes?",
      answer: "Absolutely! You can download your barcodes in high-quality PNG format for printing or digital use."
    },
    {
      question: "Are barcodes scannable?",
      answer: "Yes, all generated barcodes are industry-standard and scannable with any barcode scanner or smartphone app."
    },
    {
      question: "Does it work offline?",
      answer: "Yes, after the first load, the tool works completely offline. All generation happens in your browser."
    },
    {
      question: "What can I use barcodes for?",
      answer: "Barcodes are perfect for product labeling, inventory management, asset tracking, ticketing, event management, and business operations."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            {" / "}
            <span className="text-foreground">Barcode Generator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Barcode className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Barcode Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate high-quality barcodes instantly. Supports Code128, EAN, UPC & more. Download in PNG and use anywhere.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Instant</Badge>
              <Badge variant="secondary">Downloadable</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Barcode Settings</CardTitle>
                  <CardDescription>
                    Enter your text and select format
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">Text or Number</Label>
                    <Input
                      id="text"
                      type="text"
                      placeholder={
                        format === "EAN13" ? "123456789012" :
                        format === "UPC" ? "12345678901" :
                        format === "CODE39" ? "HELLO123" :
                        format === "ITF14" ? "12345678901234" :
                        format === "pharmacode" ? "1234" :
                        "Enter text or number..."
                      }
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      data-testid="input-barcode-text"
                    />
                    <p className="text-xs text-muted-foreground">
                      {getFormatRequirements(format)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Barcode Format</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger id="format" data-testid="select-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CODE128">CODE128 (Recommended)</SelectItem>
                        <SelectItem value="EAN13">EAN-13</SelectItem>
                        <SelectItem value="UPC">UPC</SelectItem>
                        <SelectItem value="CODE39">CODE39</SelectItem>
                        <SelectItem value="pharmacode">Pharmacode</SelectItem>
                        <SelectItem value="ITF14">ITF-14</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={generateBarcode}
                      disabled={!text}
                      className="flex-1"
                      data-testid="button-generate"
                    >
                      <Barcode className="h-4 w-4 mr-2" />
                      Generate Barcode
                    </Button>
                    {barcodeUrl && (
                      <Button
                        variant="outline"
                        onClick={handleClear}
                        data-testid="button-clear"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Barcode Preview</CardTitle>
                  <CardDescription>
                    Your barcode will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-6 bg-white rounded-lg min-h-[250px] w-full flex items-center justify-center">
                    <div className="flex flex-col items-center w-full">
                      {!barcodeUrl && (
                        <div className="text-center text-muted-foreground">
                          <Barcode className="h-24 w-24 mx-auto mb-4 opacity-20" />
                          <p className="font-medium">No barcode yet</p>
                          <p className="text-sm">Enter text and click generate</p>
                        </div>
                      )}
                      <canvas
                        ref={canvasRef}
                        className={barcodeUrl ? "max-w-full" : "hidden"}
                        data-testid="canvas-barcode"
                      />
                    </div>
                  </div>
                  {barcodeUrl && (
                    <Button
                      onClick={downloadBarcode}
                      className="w-full"
                      data-testid="button-download"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Barcode
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold">Enter Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Type your product code, SKU, or any text
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-semibold">Select Format</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose barcode type (CODE128, EAN, etc.)
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-semibold">Download</h3>
                    <p className="text-sm text-muted-foreground">
                      Download high-quality PNG for printing
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Instant Generation</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate industry-standard barcodes in seconds
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">
                      All generation happens in your browser locally
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Works Offline</h3>
                    <p className="text-sm text-muted-foreground">
                      After first load, works completely offline
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {relatedTools.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map((tool) => {
                  const Icon = getToolIcon(tool.icon);
                  return (
                    <Link key={tool.id} href={tool.path}>
                      <Card className="hover-elevate cursor-pointer h-full">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold leading-tight">{tool.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {tool.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
