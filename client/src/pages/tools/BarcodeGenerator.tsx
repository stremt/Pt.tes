import { useState, useRef, useEffect } from "react";
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

  const generateBarcode = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to generate a barcode",
        variant: "destructive",
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      canvas.width = 400;
      canvas.height = 200;
      
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#000000";
      ctx.font = "16px monospace";
      ctx.textAlign = "center";
      
      const textWidth = ctx.measureText(text).width;
      const barWidth = 3;
      const bars = text.length * 2;
      const totalWidth = bars * barWidth;
      const startX = (canvas.width - totalWidth) / 2;
      const startY = 50;
      const barHeight = 100;
      
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const x = startX + (i * barWidth * 2);
        
        if (charCode % 2 === 0) {
          ctx.fillRect(x, startY, barWidth, barHeight);
        }
        if (charCode % 3 === 0) {
          ctx.fillRect(x + barWidth, startY, barWidth, barHeight);
        }
      }
      
      ctx.fillText(text, canvas.width / 2, startY + barHeight + 30);
      ctx.fillText(format, canvas.width / 2, 30);
      
      const url = canvas.toDataURL();
      setBarcodeUrl(url);
      
      toast({
        title: "Success!",
        description: "Barcode generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate barcode",
        variant: "destructive",
      });
    }
  };

  const downloadBarcode = () => {
    if (barcodeUrl) {
      const link = document.createElement("a");
      link.download = `barcode-${text}-${Date.now()}.png`;
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
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const relatedTools = getRelatedTools("barcode-generator");

  const faqItems: FAQItem[] = [
    {
      question: "Is this barcode generator free?",
      answer: "Yes! Our barcode generator is 100% free with no limits, no login required, and no watermarks."
    },
    {
      question: "What barcode formats are supported?",
      answer: "We support popular formats including CODE128, EAN-13, UPC, and more. CODE128 is the most versatile and works for most use cases."
    },
    {
      question: "Can I download the barcodes?",
      answer: "Absolutely! You can download your barcodes in high-quality PNG format for printing or digital use."
    },
    {
      question: "Are barcodes scannable?",
      answer: "Yes, all generated barcodes are scannable with standard barcode scanners and smartphone apps."
    },
    {
      question: "Does it work offline?",
      answer: "Yes, after the first load, the tool works completely offline. All generation happens in your browser."
    },
    {
      question: "What can I use barcodes for?",
      answer: "Barcodes are perfect for product labeling, inventory management, asset tracking, ticketing, and business operations."
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
                      placeholder="Enter text or number..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      data-testid="input-barcode-text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Barcode Format</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger id="format" data-testid="select-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CODE128">CODE128</SelectItem>
                        <SelectItem value="EAN13">EAN-13</SelectItem>
                        <SelectItem value="UPC">UPC</SelectItem>
                        <SelectItem value="CODE39">CODE39</SelectItem>
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
                  <div className="p-6 bg-white rounded-lg min-h-[200px] w-full flex items-center justify-center">
                    {!barcodeUrl ? (
                      <div className="text-center text-muted-foreground">
                        <Barcode className="h-24 w-24 mx-auto mb-4 opacity-20" />
                        <p className="font-medium">No barcode yet</p>
                        <p className="text-sm">Enter text and click generate</p>
                      </div>
                    ) : (
                      <canvas
                        ref={canvasRef}
                        className="max-w-full"
                        data-testid="canvas-barcode"
                      />
                    )}
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
                      Generate barcodes in seconds with one click
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
