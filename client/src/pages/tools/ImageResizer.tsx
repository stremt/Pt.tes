import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Maximize2, Upload, Download, Image as ImageIcon, ArrowRight, X, Lock, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

type ResizeMode = "size" | "percentage" | "social";
type Unit = "px" | "%";
type SocialPlatform = "facebook" | "instagram" | "twitter" | "linkedin" | "pinterest" | "youtube";

const socialMediaPresets: Record<SocialPlatform, { name: string; presets: Record<string, { width: number; height: number }> }> = {
  facebook: {
    name: "Facebook",
    presets: {
      "Profile (170 X 170)": { width: 170, height: 170 },
      "Cover (820 X 312)": { width: 820, height: 312 },
      "Post (1200 X 628)": { width: 1200, height: 628 },
      "Story (1080 X 1920)": { width: 1080, height: 1920 },
    },
  },
  instagram: {
    name: "Instagram",
    presets: {
      "Profile (110 X 110)": { width: 110, height: 110 },
      "Post (1080 X 1080)": { width: 1080, height: 1080 },
      "Story (1080 X 1920)": { width: 1080, height: 1920 },
      "Reels (1080 X 1920)": { width: 1080, height: 1920 },
    },
  },
  twitter: {
    name: "Twitter",
    presets: {
      "Profile (400 X 400)": { width: 400, height: 400 },
      "Header (1500 X 500)": { width: 1500, height: 500 },
      "Post (1024 X 512)": { width: 1024, height: 512 },
    },
  },
  linkedin: {
    name: "LinkedIn",
    presets: {
      "Profile (400 X 400)": { width: 400, height: 400 },
      "Banner (1200 X 627)": { width: 1200, height: 627 },
      "Post (1200 X 627)": { width: 1200, height: 627 },
    },
  },
  pinterest: {
    name: "Pinterest",
    presets: {
      "Profile (165 X 165)": { width: 165, height: 165 },
      "Pin (1000 X 1500)": { width: 1000, height: 1500 },
      "Tall (600 X 900)": { width: 600, height: 900 },
    },
  },
  youtube: {
    name: "YouTube",
    presets: {
      "Thumbnail (1280 X 720)": { width: 1280, height: 720 },
      "Channel Art (2560 X 1440)": { width: 2560, height: 1440 },
      "Profile (800 X 800)": { width: 800, height: 800 },
    },
  },
};

export default function ImageResizer() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resizedFile, setResizedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [resizedPreview, setResizedPreview] = useState<string>("");
  const [resizeMode, setResizeMode] = useState<ResizeMode>("size");
  const [unit, setUnit] = useState<Unit>("px");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [backfillColor, setBackfillColor] = useState("#ffffff");
  const [useBackfill, setUseBackfill] = useState(false);
  const [selectedSocialPlatform, setSelectedSocialPlatform] = useState<SocialPlatform>("facebook");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Image Resizer - Resize JPG, PNG Online & Offline",
    description: "Resize images free with custom dimensions, social media presets & background fill. 100% offline, no upload, no watermarks. Works on all devices.",
    keywords: "image resizer, resize image online, resize jpg, resize png, image scaling tool, social media image resizer, facebook image size, instagram post size, bulk image resizer, free image resizer online, offline image resizer",
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
        playErrorSound();
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

  const applyPercentage = (percent: number) => {
    if (originalDimensions.width <= 0) return;
    const newWidth = Math.round((originalDimensions.width * percent) / 100);
    handleWidthChange(newWidth);
  };

  const applySocialPreset = (presetName: string) => {
    const preset = socialMediaPresets[selectedSocialPlatform].presets[presetName];
    if (preset) {
      setWidth(preset.width);
      setHeight(preset.height);
      setMaintainAspectRatio(false);
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

      // Always fill background - either with specified color or white
      ctx.fillStyle = useBackfill ? backfillColor : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to fit image while maintaining aspect ratio
      const scale = Math.min(width / img.width, height / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (width - scaledWidth) / 2;
      const y = (height - scaledHeight) / 2;

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      canvas.toBlob((blob) => {
        if (!blob) {
          toast({
            title: "Error",
            description: "Failed to resize image",
            variant: "destructive",
          });
          playErrorSound();
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
        playCompletionSound();
        setLoading(false);
      }, originalFile.type, 0.95);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resize image. Please try again.",
        variant: "destructive",
      });
      playErrorSound();
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
      playCompletionSound();
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
    setResizeMode("size");
    setUseBackfill(false);
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
      question: "Is this image resizer completely free?",
      answer: "Yes, 100% free with no hidden charges, no login required, no watermarks, and unlimited resizing. Use it as many times as you want.",
    },
    {
      question: "Does the image resizer work offline?",
      answer: "Yes! After the page loads once, the tool works completely offline. All image processing happens in your browser with no internet connection needed after initial load.",
    },
    {
      question: "Are my images safe and private?",
      answer: "Completely safe. Your images never leave your device or get uploaded anywhere. All resizing happens locally in your browser, ensuring 100% privacy.",
    },
    {
      question: "What image formats can I resize?",
      answer: "You can resize JPG, PNG, and WebP images. These are the most common web formats used for photos, graphics, and social media.",
    },
    {
      question: "How do I resize for Facebook, Instagram, or other social platforms?",
      answer: "Use the 'Social Media' tab and select your platform (Facebook, Instagram, Twitter, LinkedIn, Pinterest, or YouTube). Pick the preset type, and the dimensions are applied automatically.",
    },
    {
      question: "Can I resize multiple images at once?",
      answer: "Currently, the tool resizes one image at a time. However, you can quickly resize multiple images by repeating the process - just upload, resize, download, and repeat.",
    },
    {
      question: "What's the maximum image size I can resize?",
      answer: "You can resize images up to the browser's memory capacity, which is typically very large. Most devices can handle images several MB in size without issues.",
    },
    {
      question: "Does resizing reduce image quality?",
      answer: "The resizer maintains high quality during the process. If you shrink a large image, quality stays sharp. If you enlarge an image significantly, some softness may occur, which is normal.",
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Image Resizer</span>
          </div>

          <div className="text-center space-y-3 mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Maximize2 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl md:text-5xl font-bold">Free Image Resizer - Resize Photos in Seconds, Online and Offline</h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Resize JPG, PNG, and WebP images with custom dimensions, social media presets, and background fill. Works perfectly offline with no uploads or watermarks.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Presets</Badge>
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
                    className="border-2 border-dashed rounded-lg p-6 md:p-12 text-center cursor-pointer hover-elevate transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-muted-foreground" />
                    <p className="font-medium mb-1 md:mb-2 text-sm md:text-base">Click to upload an image</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      JPG, PNG, WebP supported
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
                    <Tabs value={resizeMode} onValueChange={(v) => setResizeMode(v as ResizeMode)}>
                      <TabsList className="grid w-full grid-cols-3 gap-1" data-testid="tabs-resize-mode">
                        <TabsTrigger value="size" data-testid="tab-by-size" className="text-xs md:text-sm">By Size</TabsTrigger>
                        <TabsTrigger value="percentage" data-testid="tab-as-percentage" className="text-xs md:text-sm">As %</TabsTrigger>
                        <TabsTrigger value="social" data-testid="tab-social-media" className="text-xs md:text-sm">Social</TabsTrigger>
                      </TabsList>

                      <TabsContent value="size" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="width">Width</Label>
                            <div className="flex gap-2">
                              <Input
                                id="width"
                                type="number"
                                value={width}
                                onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                min={1}
                                data-testid="input-width"
                              />
                              <Select value={unit} onValueChange={(v) => setUnit(v as Unit)}>
                                <SelectTrigger className="w-24" data-testid="select-unit">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="px">px</SelectItem>
                                  <SelectItem value="%">%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="height">Height</Label>
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
                      </TabsContent>

                      <TabsContent value="percentage" className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[25, 50, 75, 100, 125, 150, 200].map((percent) => (
                            <Button
                              key={percent}
                              variant="outline"
                              onClick={() => applyPercentage(percent)}
                              data-testid={`button-percent-${percent}`}
                            >
                              {percent}%
                            </Button>
                          ))}
                        </div>
                        <div className="p-3 bg-muted rounded text-sm text-muted-foreground">
                          New size: {width}x{height}px
                        </div>
                      </TabsContent>

                      <TabsContent value="social" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="platform">Choose the Social Media Platform</Label>
                          <Select value={selectedSocialPlatform} onValueChange={(v) => setSelectedSocialPlatform(v as SocialPlatform)}>
                            <SelectTrigger data-testid="select-social-platform">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(socialMediaPresets).map(([key, { name }]) => (
                                <SelectItem key={key} value={key}>
                                  {name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="preset">Preset Type</Label>
                          <Select onValueChange={applySocialPreset}>
                            <SelectTrigger data-testid="select-preset-type">
                              <SelectValue placeholder="Select a preset..." />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(socialMediaPresets[selectedSocialPlatform].presets).map((preset) => (
                                <SelectItem key={preset} value={preset}>
                                  {preset}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Width</Label>
                            <div className="p-3 bg-muted rounded text-sm font-medium">{width} px</div>
                          </div>
                          <div className="space-y-2">
                            <Label>Height</Label>
                            <div className="p-3 bg-muted rounded text-sm font-medium">{height} px</div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="border-t pt-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="backfill"
                          checked={useBackfill}
                          onCheckedChange={(checked) => setUseBackfill(checked as boolean)}
                          data-testid="checkbox-background-fill"
                        />
                        <Label htmlFor="backfill" className="flex items-center gap-2 cursor-pointer">
                          Background Fill
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Label>
                      </div>

                      {useBackfill && (
                        <div className="space-y-2">
                          <Label htmlFor="backfill-color" className="text-sm">Background Color</Label>
                          <div className="flex gap-2">
                            <input
                              id="backfill-color"
                              type="color"
                              value={backfillColor}
                              onChange={(e) => setBackfillColor(e.target.value)}
                              data-testid="input-backfill-color"
                              className="h-12 w-16 md:h-10 md:w-20 rounded border cursor-pointer"
                            />
                            <Input
                              value={backfillColor}
                              onChange={(e) => setBackfillColor(e.target.value)}
                              data-testid="input-backfill-hex"
                              placeholder="#ffffff"
                              className="text-xs md:text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                      <Button
                        onClick={resizeImage}
                        disabled={loading}
                        className="flex-1 text-sm md:text-base"
                        data-testid="button-resize"
                      >
                        {loading ? "Resizing..." : "Resize Image"}
                      </Button>
                      {resizedFile && (
                        <Button
                          onClick={downloadResized}
                          variant="outline"
                          className="text-sm md:text-base"
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
                            data-testid="img-original"
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
                            data-testid="img-resized"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <Card>
              <CardContent className="pt-8 space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">What is an Image Resizer?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    An image resizer is a tool that lets you change the dimensions of your photos and images without losing quality. Whether you need to shrink a large photo for email, resize an image for a website, or prepare pictures for social media, this tool makes it simple. You can manually set custom dimensions, use percentage-based scaling, or pick from pre-made social media sizes for platforms like Facebook, Instagram, Twitter, LinkedIn, Pinterest, and YouTube.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This resizer works entirely in your browser. No files are uploaded to any server, no accounts needed, and no annoying watermarks. It processes images offline, meaning once you load the page, you can resize images without an internet connection.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Who Should Use This Tool?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    This image resizer is perfect for:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="text-muted-foreground"><strong>Students & Teachers:</strong> Resize photos for presentations, projects, and assignments.</li>
                    <li className="text-muted-foreground"><strong>Small Business Owners:</strong> Prepare images for websites, social media posts, and online stores.</li>
                    <li className="text-muted-foreground"><strong>Content Creators:</strong> Get the perfect image sizes for YouTube thumbnails, Instagram feeds, TikTok posts, and Pinterest pins.</li>
                    <li className="text-muted-foreground"><strong>Photographers & Designers:</strong> Quickly resize bulk images or prepare them for different formats.</li>
                    <li className="text-muted-foreground"><strong>Anyone with Photos:</strong> Reduce file sizes for email, messaging apps, cloud storage, or sharing online.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Common Use Cases</h2>
                  <div className="space-y-3 ml-4">
                    <p className="text-muted-foreground"><strong>Social Media Posts:</strong> Resize photos for Instagram squares (1080x1080), Facebook timeline posts (1200x628), or Twitter images (1024x512).</p>
                    <p className="text-muted-foreground"><strong>Website Images:</strong> Optimize images for web pages to improve loading speed and reduce bandwidth.</p>
                    <p className="text-muted-foreground"><strong>Email & Messaging:</strong> Compress and resize photos to send quickly through email or messaging apps.</p>
                    <p className="text-muted-foreground"><strong>Document Preparation:</strong> Resize images for PDFs, presentations, or office documents.</p>
                    <p className="text-muted-foreground"><strong>Batch Processing:</strong> Quickly resize multiple images one by one for consistent dimensions.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Privacy & Security</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Your privacy is our priority. When you use this tool:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="text-muted-foreground">✓ Images never leave your device or go to any server</li>
                    <li className="text-muted-foreground">✓ No accounts, logins, or registrations required</li>
                    <li className="text-muted-foreground">✓ Works 100% offline after the initial page load</li>
                    <li className="text-muted-foreground">✓ No tracking, ads, or cookies collecting your data</li>
                    <li className="text-muted-foreground">✓ Safe for personal photos, business images, and sensitive content</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    All image processing happens locally on your computer using your browser. This means the tool is completely private, fast, and works even without an internet connection after loading.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
                    <h3 className="font-semibold">Choose Mode & Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Use custom size, percentage, or social media presets
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
            <div className="max-w-4xl mx-auto mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Related Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Frequently Asked Questions</h2>
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
