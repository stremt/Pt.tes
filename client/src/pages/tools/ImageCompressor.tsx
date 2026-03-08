import { useState, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  useSEO, 
  StructuredData, 
  generateFAQSchema, 
  OG_IMAGES, 
  type FAQItem,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { 
  ImageDown, Upload, Download, Image as ImageIcon, ArrowRight, X, Shield, 
  WifiOff, CheckCircle, Building2, CalendarDays, Globe, ShoppingCart, 
  Camera, Share2, Zap, Lock, Info, BarChart3, Rocket, Heart,
  FileCode2, Search, Sparkles, LayoutPanelLeft, UserCheck, Mail, Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import imageCompression from "browser-image-compression";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";

interface ImageItem {
  id: string;
  originalFile: File;
  compressedFile: File | null;
  originalPreview: string;
  compressedPreview: string;
  isCompressing: boolean;
  reductionPercent: number;
}

export default function ImageCompressor() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [sliderEnabled, setSliderEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const toolName = "Enterprise Image Compressor & Optimizer";
  const toolDescription = "World-class professional image compressor. Reduce JPG, PNG, and WebP sizes by up to 90% without quality loss. 100% private client-side processing for elite SEO performance and Core Web Vitals.";
  const canonicalUrl = "https://tools.pixocraft.in/tools/image-compressor";

  useSEO({
    title: "Best Image Compressor Online - Reduce Image Size Without Quality Loss",
    description: toolDescription,
    keywords: "image compressor, compress image online, reduce image size, image optimizer, compress jpg, compress png, compress webp, online image compression, photo compressor online, reduce image size without losing quality, best image compressor, core web vitals image optimization",
    canonicalUrl,
    ogImage: OG_IMAGES.imageCompressor,
  });

  const appSchema = useMemo(() => generateSoftwareApplicationSchema({
    name: toolName,
    description: toolDescription,
    url: canonicalUrl,
    applicationCategory: "DesignApplication",
    operatingSystem: "Windows, macOS, Linux, Android, iOS",
    offers: { price: "0", priceCurrency: "USD" }
  }), []);

  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Image Tools", url: "/tools/image" },
    { name: "Image Compressor", url: "/tools/image-compressor" }
  ]), []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File",
          description: `"${file.name}" is not a valid image file. Please select JPG, PNG, or WebP.`,
          variant: "destructive",
        });
        playErrorSound();
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    validFiles.forEach(file => {
      const id = `${file.name}-${Date.now()}-${Math.random()}`;
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          id,
          originalFile: file,
          compressedFile: null,
          originalPreview: e.target?.result as string,
          compressedPreview: "",
          isCompressing: false,
          reductionPercent: 0
        }]);
      };
      reader.readAsDataURL(file);
    });

    if (validFiles.length > 0) {
      toast({
        title: "Images Added",
        description: `${validFiles.length} image(s) ready for compression.`,
      });
    }
  };

  const compressImage = async () => {
    const imagesToCompress = images.filter(img => !img.compressedFile);
    if (imagesToCompress.length === 0) return;

    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      for (const image of imagesToCompress) {
        setImages(prev => prev.map(img => 
          img.id === image.id ? { ...img, isCompressing: true } : img
        ));

        try {
          const originalSizeMB = image.originalFile.size / (1024 * 1024);
          const targetSizeMB = originalSizeMB * (1 - (100 - quality) / 100);
          
          const options = {
            maxSizeMB: Math.max(0.05, targetSizeMB),
            maxWidthOrHeight: quality < 30 ? 800 : (quality < 60 ? 1280 : 1920),
            useWebWorker: true,
            quality: quality / 100,
            initialQuality: quality / 100,
          };

          const compressed = await imageCompression(image.originalFile, options);
          const reductionPercent = Math.round((1 - compressed.size / image.originalFile.size) * 100);

          const reader = new FileReader();
          reader.onload = (e) => {
            setImages(prev => prev.map(img =>
              img.id === image.id
                ? {
                    ...img,
                    compressedFile: compressed,
                    compressedPreview: e.target?.result as string,
                    isCompressing: false,
                    reductionPercent
                  }
                : img
            ));
          };
          reader.readAsDataURL(compressed);
          successCount++;
        } catch (error) {
          failCount++;
          setImages(prev => prev.map(img =>
            img.id === image.id ? { ...img, isCompressing: false } : img
          ));
        }
      }

      setTimeout(() => {
        if (successCount > 0) {
          toast({
            title: "Compression Complete",
            description: `Successfully compressed ${successCount} image(s)${failCount > 0 ? ` (${failCount} failed)` : ''}`,
          });
          playCompletionSound();
        }
        if (failCount > 0) {
          toast({
            title: "Some Compressions Failed",
            description: `${failCount} image(s) failed to compress. Try a different file.`,
            variant: "destructive",
          });
          playErrorSound();
        }
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (image?.compressedFile) {
      const url = URL.createObjectURL(image.compressedFile);
      const link = document.createElement("a");
      link.download = `optimized-${image.originalFile.name}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      playCompletionSound();
    }
  };

  const downloadAllCompressed = () => {
    const compressedImages = images.filter(img => img.compressedFile);
    if (compressedImages.length === 0) return;
    
    compressedImages.forEach(image => {
      setTimeout(() => downloadImage(image.id), 200);
    });
    
    toast({
      title: "Downloading Files",
      description: `Downloading ${compressedImages.length} optimized image(s)...`,
    });
  };

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
    if (selectedImageId === imageId) {
      setSelectedImageId(images.find(img => img.id !== imageId)?.id || null);
    }
  };

  const clearAll = () => {
    setImages([]);
    setSelectedImageId(null);
    setSliderEnabled(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const faqItems: FAQItem[] = [
    {
      question: "How do I compress images without losing quality?",
      answer: "Our tool uses advanced 'smart compression' algorithms that intelligently reduce file size while maintaining visual fidelity. By setting the quality slider to 80-90%, you can achieve significant file size reduction (often over 70%) with virtually no perceptible difference to the human eye. This is perfect for high-performance websites and social media."
    },
    {
      question: "Is this online image compressor free to use?",
      answer: "Yes, our image compressor is 100% free with no hidden charges, no watermarks, and no limits on the number of images you can process. It is a premium-grade tool provided as part of the Pixocraft mission to make high-performance web optimization accessible to everyone."
    },
    {
      question: "Are my images uploaded to your server?",
      answer: "No. Unlike other tools, Pixocraft uses cutting-edge 'client-side' processing. Your images are processed directly in your web browser. They are never uploaded to any server, ensuring 100% privacy and security. You can even use this tool while offline!"
    },
    {
      question: "Why should I optimize images for SEO and Core Web Vitals?",
      answer: "Google uses page load speed (LCP - Largest Contentful Paint) as a key ranking factor. Large images are the #1 cause of slow websites. Compressing your images reduces bandwidth, lowers bounce rates, and directly improves your search engine rankings by providing a better user experience."
    },
    {
      question: "Which formats are supported?",
      answer: "We support the three most critical web formats: JPG (perfect for photos), PNG (best for graphics with transparency), and WebP (the modern standard for superior web compression). The tool automatically handles each format optimally."
    },
    {
      question: "What is the difference between lossy and lossless compression?",
      answer: "Lossy compression (like JPEG) achieves massive size reduction by removing data that the eye can't easily see. Lossless compression (like PNG) reduces size without removing any data but results in much larger files. Our tool uses a balanced approach to give you the best of both worlds: tiny files with high visual quality."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Image Tools", url: "/tools/image" }, { label: "Image Compressor" }]} />

          {/* Hero Section - Search Intent Optimized */}
          <div className="text-center space-y-6 my-12 md:my-20">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-2xl mb-4">
              <Zap className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
              Professional <span className="text-primary">Image Optimizer</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Dominate page speed and SEO with the internet's most authoritative image compressor. 
              Reduce size by <span className="text-foreground font-bold">up to 90%</span> instantly—no uploads, 100% private.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><CheckCircle className="w-3 h-3 mr-2 text-green-500" /> No Quality Loss</Badge>
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><Shield className="w-3 h-3 mr-2 text-blue-500" /> 100% Private (Local)</Badge>
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><WifiOff className="w-3 h-3 mr-2 text-orange-500" /> Offline Capable</Badge>
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><Rocket className="w-3 h-3 mr-2 text-purple-500" /> SEO Optimized</Badge>
            </div>
          </div>

          {/* Main Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {images.length === 0 ? (
                <Card className="border-2 border-dashed border-primary/20 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="flex flex-col items-center justify-center py-20 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                      <Upload className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Drop your images here</h3>
                    <p className="text-muted-foreground mb-8">Click to browse or drag and drop multiple JPG, PNG, or WebP files</p>
                    <Button size="lg" className="rounded-full px-8">Select Images</Button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" multiple />
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {selectedImageId && images.find(img => img.id === selectedImageId) ? (
                    (() => {
                      const selectedImage = images.find(img => img.id === selectedImageId)!;
                      return (
                        <Card className="overflow-hidden">
                          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30">
                            <div>
                              <CardTitle className="text-lg">Real-Time Comparison</CardTitle>
                              <CardDescription className="text-xs">{selectedImage.originalFile.name} • {quality}% quality</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeImage(selectedImageId)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </CardHeader>
                          <CardContent className="p-0">
                            <div className="relative w-full aspect-video bg-muted flex items-center justify-center overflow-hidden">
                              {selectedImage.compressedPreview ? (
                                sliderEnabled ? (
                                  <ReactCompareSlider
                                    className="w-full h-full"
                                    itemOne={<img src={selectedImage.originalPreview} alt="Original" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                                    itemTwo={<img src={selectedImage.compressedPreview} alt="Compressed" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                                  />
                                ) : (
                                  <div className="relative w-full h-full flex items-center justify-center p-4">
                                    <img src={selectedImage.compressedPreview} alt="Optimized" className="max-w-full max-h-full object-contain rounded-lg shadow-lg" />
                                    <Button variant="secondary" className="absolute shadow-2xl hover-elevate" onClick={() => setSliderEnabled(true)}>
                                      <Sparkles className="w-4 h-4 mr-2" />
                                      Click to Compare Before/After
                                    </Button>
                                  </div>
                                )
                              ) : (
                                <div className="flex flex-col items-center justify-center text-muted-foreground p-12">
                                  <ImageIcon className="w-12 h-12 mb-4 opacity-20 animate-pulse" />
                                  <p className="text-sm font-medium">Waiting for compression...</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="bg-muted/30 grid grid-cols-2 gap-4 py-4 border-t">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground uppercase font-bold">Original</p>
                              <p className="text-lg font-mono">{formatFileSize(selectedImage.originalFile.size)}</p>
                            </div>
                            <div className="text-center border-l border-border">
                              <p className="text-xs text-primary uppercase font-bold">Optimized</p>
                              <p className="text-lg font-mono text-primary font-bold">
                                {selectedImage.compressedFile ? formatFileSize(selectedImage.compressedFile.size) : "..."}
                              </p>
                              {selectedImage.compressedFile && (
                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                  -{selectedImage.reductionPercent}% Smaller
                                </Badge>
                              )}
                            </div>
                          </CardFooter>
                        </Card>
                      );
                    })()
                  ) : null}

                  {/* Images List */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        Images ({images.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map(image => (
                          <div
                            key={image.id}
                            onClick={() => {
                              setSelectedImageId(image.id);
                              setSliderEnabled(false);
                            }}
                            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                              selectedImageId === image.id ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                            }`}
                          >
                            <img src={image.originalPreview} alt={image.originalFile.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-bold text-center px-2">{image.originalFile.name}</span>
                            </div>
                            {image.compressedFile && (
                              <Badge className="absolute top-2 right-2 bg-green-500">
                                {image.reductionPercent}%
                              </Badge>
                            )}
                            {image.isCompressing && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white animate-spin" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Add More Images
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Sidebar Controls */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Batch Compression Hub</CardTitle>
                  <CardDescription>Compress all images together</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Quality Target</Label>
                      <Badge variant="secondary" className="text-sm font-mono">{quality}%</Badge>
                    </div>
                    <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={10} max={100} step={1} className="py-4" />
                    <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground px-1">
                      <span>Maximum Savings</span>
                      <span>Balanced</span>
                      <span>Max Quality</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button size="lg" className="w-full h-14 text-lg font-bold" disabled={images.length === 0 || loading} onClick={compressImage}>
                      {loading ? <Zap className="w-5 h-5 mr-2 animate-spin" /> : <ImageDown className="w-5 h-5 mr-2" />}
                      Compress All ({images.filter(img => !img.compressedFile).length})
                    </Button>
                    {images.some(img => img.compressedFile) && (
                      <Button size="lg" variant="outline" className="w-full h-14 text-lg border-primary text-primary hover:bg-primary/5" onClick={downloadAllCompressed}>
                        <Download className="w-5 h-5 mr-2" />
                        Download All ({images.filter(img => img.compressedFile).length})
                      </Button>
                    )}
                    {images.length > 0 && (
                      <Button size="sm" variant="ghost" className="w-full" onClick={clearAll}>
                        <X className="w-4 h-4 mr-2" />
                        Clear All
                      </Button>
                    )}
                  </div>

                  {images.length > 0 && (
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <p className="text-xs font-bold text-muted-foreground">BATCH STATUS</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Total Images:</span>
                          <span className="font-bold">{images.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Compressed:</span>
                          <span className="font-bold text-green-600">{images.filter(img => img.compressedFile).length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pending:</span>
                          <span className="font-bold text-orange-600">{images.filter(img => !img.compressedFile).length}</span>
                        </div>
                        {images.some(img => img.compressedFile) && (
                          <div className="flex justify-between">
                            <span>Total Saved:</span>
                            <span className="font-bold text-blue-600">
                              {formatFileSize(
                                images.reduce((acc, img) => acc + (img.originalFile.size - (img.compressedFile?.size || img.originalFile.size)), 0)
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t space-y-4">
                    <h4 className="text-sm font-bold flex items-center gap-2"><Lock className="w-4 h-4 text-green-500" /> Privacy First Architecture</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your data never leaves your device. 
                      100% GDPR and CCPA compliant by design.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Authority Educational Content Section */}
          <div className="max-w-4xl mx-auto space-y-20 py-20 border-t">
            <article className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">The Definitive Guide to Image Optimization for SEO</h2>
              <p className="lead">
                In the modern era of the internet, speed is everything. Whether you are an SEO specialist striving for #1 rankings or a developer optimizing for Core Web Vitals, understanding image compression is your most powerful asset.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
                <Card className="bg-primary/5 border-none">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Info className="w-5 h-5" /> What is Image Compression?</CardTitle></CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    Image compression is the technical process of encoding or converting an image file so that it consumes less space. It works by identifying and removing redundant data while preserving visual quality.
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-none">
                  <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Core Web Vitals Impact</CardTitle></CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    Google uses page load speed (LCP) as a key ranking factor. Large images are the #1 cause of slow websites. Optimized images directly improve your search engine rankings.
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-6">Lossy vs. Lossless Compression</h3>
              <p>
                Lossy compression (like JPEG) significantly reduces file size by removing data the eye can't see. Lossless compression (like PNG) preserves all data but results in larger files. Our tool provides a balanced approach for the best web performance.
              </p>

              <h3 className="text-2xl font-bold mt-12 mb-6">Supported Modern Formats</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <strong className="text-primary block mb-1">WebP: The Modern Web Standard</strong>
                  Developed by Google, WebP provides superior compression. WebP images are often 30% smaller than comparable JPEGs.
                </div>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <strong className="text-primary block mb-1">JPEG: Best for Photography</strong>
                  Ideal for complex photos with many colors. High compression with great visual fidelity.
                </div>
                <div className="p-4 border rounded-lg bg-muted/50">
                  <strong className="text-primary block mb-1">PNG: Graphic Precision</strong>
                  Perfect for logos and graphics requiring transparency.
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mt-20 mb-8">Professional Use Cases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                {[
                  { icon: Building2, title: "SaaS & Enterprise", desc: "Reduce bandwidth costs and improve global performance." },
                  { icon: ShoppingCart, title: "E-commerce", desc: "Speed up product galleries to increase conversion rates." },
                  { icon: Camera, title: "Photographers", desc: "Share high-res portfolios without clogging bandwidth." },
                  { icon: Share2, title: "Social Media", desc: "Bypass upload limits and maintain clear visuals." },
                  { icon: Mail, title: "Email Marketing", desc: "Ensure newsletters land in inbox by keeping size low." },
                  { icon: Search, title: "SEO Specialists", desc: "Pass Core Web Vitals audits and rank #1." }
                ].map((useCase, i) => (
                  <Card key={i} className="hover-elevate">
                    <CardHeader className="p-4">
                      <useCase.icon className="w-6 h-6 text-primary mb-2" />
                      <CardTitle className="text-base">{useCase.title}</CardTitle>
                      <CardDescription className="text-xs">{useCase.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </article>

            {/* Comparison Table */}
            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Format Comparison</h2>
              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-bold uppercase text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Feature</th>
                      <th className="px-6 py-4">JPEG</th>
                      <th className="px-6 py-4">PNG</th>
                      <th className="px-6 py-4">WebP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4 font-bold">Best For</td>
                      <td className="px-6 py-4">Photographs</td>
                      <td className="px-6 py-4">Graphics</td>
                      <td className="px-6 py-4">Web Performance</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold">Compression</td>
                      <td className="px-6 py-4">Lossy</td>
                      <td className="px-6 py-4">Lossless</td>
                      <td className="px-6 py-4">Superior</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold">Transparency</td>
                      <td className="px-6 py-4">No</td>
                      <td className="px-6 py-4">Yes</td>
                      <td className="px-6 py-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Expert answers to common image optimization questions.</p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-bold py-6">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* CTA */}
            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">Optimized for Speed, Built for Privacy.</h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                No subscription required. No data tracking. Start optimizing your assets today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Compress Image Now
                </Button>
                <Link href="/tools">
                  <Button size="lg" variant="ghost" className="rounded-full px-10 h-14 text-lg">
                    Browse All Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <LongTailPagesSection toolId="image-compressor" />

          <section className="py-20 border-t">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Tools</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getRelatedTools("image-compressor").map((tool) => {
                const Icon = getToolIcon(tool.id);
                return (
                  <Link key={tool.id} href={`/tools/${tool.id}`}>
                    <Card className="h-full hover-elevate cursor-pointer border-muted-foreground/10">
                      <CardHeader className="p-6">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <Icon />
                        </div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription className="line-clamp-2 text-xs">{tool.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
