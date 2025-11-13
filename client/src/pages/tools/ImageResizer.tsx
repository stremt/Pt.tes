import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Maximize2, Upload, Download, Image as ImageIcon, ArrowRight, X, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function ImageResizer() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resizedFile, setResizedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [resizedPreview, setResizedPreview] = useState<string>("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Image Resizer Online | Resize Images in Seconds",
    description: "Resize JPG, PNG or WebP images online. Change width & height instantly. Fast, offline & private.",
    keywords: "image resizer, resize image online, image scaling tool, change image size",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-resizer",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setOriginalFile(file);
      setResizedFile(null);
      setResizedPreview("");

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = e.target?.result as string;
        setOriginalPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * aspectRatio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const resizeImage = async () => {
    if (!originalFile) return;

    setLoading(true);
    try {
      const img = new Image();
      img.src = originalPreview;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) {
          toast({
            title: "Error",
            description: "Failed to resize image",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const resized = new File([blob], `resized-${originalFile.name}`, {
          type: originalFile.type,
        });

        setResizedFile(resized);
        setResizedPreview(canvas.toDataURL(originalFile.type));

        toast({
          title: "Success!",
          description: `Image resized to ${width}x${height}px`,
        });
        setLoading(false);
      }, originalFile.type, 0.95);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resize image. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const downloadResized = () => {
    if (resizedFile) {
      const url = URL.createObjectURL(resizedFile);
      const link = document.createElement("a");
      link.download = resizedFile.name;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Downloaded!",
        description: "Resized image saved to your downloads",
      });
    }
  };

  const resetTool = () => {
    setOriginalFile(null);
    setResizedFile(null);
    setOriginalPreview("");
    setResizedPreview("");
    setWidth(800);
    setHeight(600);
    setOriginalDimensions({ width: 0, height: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const relatedTools = getRelatedTools("image-resizer");

  const faqItems: FAQItem[] = [
    {
      question: "Is this image resizer free?",
      answer: "Yes! Our image resizer is 100% free with no limits, no login required, and no watermarks added to your images."
    },
    {
      question: "Does it work offline?",
      answer: "Yes, after the first load, the tool works completely offline. All resizing happens in your browser, so no internet connection is needed."
    },
    {
      question: "Can I download resized images?",
      answer: "Absolutely! You can download your resized images in high quality PNG or JPG format with a single click."
    },
    {
      question: "Are my images uploaded to a server?",
      answer: "No. All image processing happens locally in your browser. Your images never leave your device, ensuring complete privacy."
    },
    {
      question: "What formats are supported?",
      answer: "We support JPG, PNG, and WebP formats - the most commonly used image formats on the web."
    },
    {
      question: "Can I maintain the aspect ratio?",
      answer: "Yes! Toggle the aspect ratio lock to automatically adjust height when you change width, or vice versa."
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
            <span className="text-foreground">Image Resizer</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Maximize2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Image Resizer</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Resize your images in one click. Fully offline, fast & easy-to-use. Perfect for websites, social media, editing & printing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline Ready</Badge>
              <Badge variant="secondary">No Upload</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            {!originalFile ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Image</CardTitle>
                  <CardDescription>
                    Select an image to resize (JPG, PNG, WebP)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload an image</p>
                    <p className="text-sm text-muted-foreground">
                      Supports JPG, PNG, and WebP formats
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    data-testid="input-file-resizer"
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Resize Settings</CardTitle>
                        <CardDescription>
                          Original: {originalDimensions.width}x{originalDimensions.height}px ({formatFileSize(originalFile.size)})
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" onClick={resetTool} data-testid="button-reset">
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                          min={1}
                          data-testid="input-width"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                          min={1}
                          data-testid="input-height"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant={maintainAspectRatio ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                        data-testid="button-aspect-ratio"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        {maintainAspectRatio ? "Aspect Ratio Locked" : "Lock Aspect Ratio"}
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={resizeImage}
                        disabled={loading}
                        className="flex-1"
                        data-testid="button-resize"
                      >
                        {loading ? "Resizing..." : "Resize Image"}
                      </Button>
                      {resizedFile && (
                        <Button
                          onClick={downloadResized}
                          variant="outline"
                          data-testid="button-download"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Original</CardTitle>
                      <CardDescription>
                        {originalDimensions.width}x{originalDimensions.height}px
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        {originalPreview && (
                          <img
                            src={originalPreview}
                            alt="Original"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {resizedPreview && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Resized</CardTitle>
                        <CardDescription>
                          {width}x{height}px
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                          <img
                            src={resizedPreview}
                            alt="Resized"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
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
                    <h3 className="font-semibold">Upload Image</h3>
                    <p className="text-sm text-muted-foreground">
                      Select your image file from your device
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
                    <h3 className="font-semibold">Set Dimensions</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter desired width and height in pixels
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
                      Download your resized image instantly
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
