import { Breadcrumb } from "@/components/Breadcrumb";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { ImageDown, Upload, Download, Image as ImageIcon, ArrowRight, X, Shield, WifiOff, CheckCircle, Building2, CalendarDays, Globe, ShoppingCart, Camera, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import imageCompression from "browser-image-compression";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [compressedPreview, setCompressedPreview] = useState<string>("");
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [sliderEnabled, setSliderEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Offline Image Compressor - No Upload, No Quality Loss | Pixocraft",
    description: "Compress images free with no quality loss. 100% private offline image compressor—no upload, no servers, works instantly in your browser. Reduce image size by 90% in seconds.",
    keywords: "image compressor, compress images online, reduce image size, free image compressor, image optimizer, compress jpg png webp, offline image compression, private image compressor, no upload image compressor, pixocraft tools",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-compressor",
    ogImage: OG_IMAGES.imageCompressor,
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
      setCompressedFile(null);
      setCompressedPreview("");

      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = async () => {
    if (!originalFile) return;

    setLoading(true);
    try {
      const originalSizeMB = originalFile.size / (1024 * 1024);
      const targetSizeMB = originalSizeMB * (1 - (100 - quality) / 100);
      
      const options = {
        maxSizeMB: Math.max(0.1, targetSizeMB),
        maxWidthOrHeight: quality < 50 ? 1280 : 1920,
        useWebWorker: true,
        quality: quality / 100,
        initialQuality: quality / 100,
      };

      const compressed = await imageCompression(originalFile, options);
      
      const reductionPercent = Math.round((1 - compressed.size / originalFile.size) * 100);
      
      if (reductionPercent < 5) {
        toast({
          title: "Minimal Compression",
          description: `Only ${reductionPercent}% reduction achieved. Try lowering quality for better results.`,
        });
      }
      
      setCompressedFile(compressed);

      const reader = new FileReader();
      reader.onload = (e) => {
        setCompressedPreview(e.target?.result as string);
      };
      reader.readAsDataURL(compressed);

      toast({
        title: "Success!",
        description: `Image compressed successfully. Reduced by ${reductionPercent}%`,
      });
      playCompletionSound();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress image. Please try again.",
        variant: "destructive",
      });
      playErrorSound();
    } finally {
      setLoading(false);
    }
  };

  const downloadCompressed = () => {
    if (compressedFile) {
      const url = URL.createObjectURL(compressedFile);
      const link = document.createElement("a");
      link.download = `compressed-${originalFile?.name || "image.jpg"}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Downloaded!",
        description: "Compressed image saved to your downloads",
      });
      playCompletionSound();
    }
  };

  const resetTool = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setOriginalPreview("");
    setCompressedPreview("");
    setQuality(80);
    setSliderEnabled(false);
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

  const relatedTools = getRelatedTools("image-compressor");

  const faqItems: FAQItem[] = [
    {
      question: "Will compressing my images reduce their quality?",
      answer: "At 80% quality (our recommended setting), most people cannot detect any visual difference from the original. For web use, social media, and email, compressed images look identical to uncompressed ones while loading much faster. Only at very low quality settings (below 50%) will you notice visible artifacts like blurriness or color banding. You can always preview the compressed image before downloading to ensure quality meets your needs. The key is smart compression that removes invisible data while preserving what you actually see."
    },
    {
      question: "How much can I reduce my image file size?",
      answer: "With Pixocraft Tools' image compressor, you can typically reduce image file sizes by 50-90% depending on the original image and quality settings you choose. For example, a 5MB photo can often be compressed to under 500KB while still looking great on websites and social media. Our recommended 80% quality setting usually achieves 60-70% file size reduction with minimal visible quality loss. The exact reduction depends on image complexity, format, and your chosen quality level."
    },
    {
      question: "Is image compression safe and private?",
      answer: "Absolutely! Your privacy is our top priority. All image compression happens entirely in your browser—your images are never uploaded to our servers or transmitted over the internet. We don't store, log, or have any access to your images. Once you close or refresh the page, everything is completely gone from memory. This browser-based approach ensures maximum privacy and security, making Pixocraft Tools safe for compressing confidential business graphics, personal photos, or any sensitive images."
    },
    {
      question: "Does this image compressor work offline?",
      answer: "Yes! Once this page loads, our image compressor works completely offline without needing an internet connection. All processing happens locally in your browser. This makes it ideal for secure environments, areas with limited connectivity, or situations where you need to compress images on the go. Simply load the page once, and you can compress unlimited images anytime—even without Wi-Fi or mobile data."
    },
    {
      question: "What is image compression and how does it work?",
      answer: "Image compression is the process of reducing the file size of an image while maintaining acceptable visual quality. Pixocraft Tools uses advanced algorithms to analyze your image and remove unnecessary data that doesn't significantly affect how the image looks. There are two types: lossy compression (removes some data for smaller files) and lossless compression (preserves all data). Our tool uses smart lossy compression that balances file size reduction with quality preservation, perfect for web use, social media, and email attachments."
    },
    {
      question: "Which image formats does Pixocraft Tools support?",
      answer: "Our free image compressor online supports the most popular image formats: JPG/JPEG, PNG, and WebP. These formats cover over 95% of images used on the web. JPG is ideal for photos and complex images, PNG works best for graphics with transparency, and WebP offers superior compression for modern browsers. The compressed image maintains the same format as your original upload. We're continually improving our tool and plan to add support for more formats like GIF and SVG in future updates."
    },
    {
      question: "What are the best use cases for image compression?",
      answer: "Image compression is essential for many scenarios: optimizing images for faster website loading (which improves SEO and user experience), reducing file sizes for email attachments that have size limits, preparing images for social media uploads, saving storage space on your devices or servers, speeding up mobile app performance, and reducing bandwidth costs for high-traffic websites. Web developers, bloggers, social media managers, photographers, and e-commerce businesses all benefit from our image optimizer to deliver faster, more efficient web experiences."
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
          <span className="text-foreground">Image Compressor</span>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <ImageDown className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Free Offline Image Compressor</h1>
          <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Compress images instantly—no upload, no servers, no quality loss. 100% private and works offline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
            <Badge variant="secondary">100% Free Forever</Badge>
            <Badge variant="secondary">No Quality Loss</Badge>
            <Badge variant="secondary">Works Offline</Badge>
            <Badge variant="secondary">No Upload Required</Badge>
          </div>
          <h2 className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-3xl mx-auto pt-2">
            Reduce image size by up to 90% in seconds. Your images never leave your device—everything happens locally in your browser. Load once, compress unlimited images anytime, even without internet.
          </h2>
        </div>

        {/* Main Tool Interface */}
        <div className="max-w-4xl mx-auto mb-16">
          {!originalFile ? (
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>
                  Select an image to compress (JPG, PNG, WebP)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed rounded-lg p-6 md:p-12 text-center cursor-pointer hover-elevate transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="dropzone-upload"
                >
                  <Upload className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium mb-2 text-sm md:text-base">Click to upload an image</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Supports JPG, PNG, and WebP formats
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    data-testid="input-file-upload"
                  />
                </div>
                <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-3 md:gap-6 text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-medium">No Upload — Images stay on your device</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <WifiOff className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-medium">Offline Image Compression — Works without internet</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Controls Card */}
              <Card>
                <CardHeader className="pb-3 md:pb-6">
                  <div className="flex items-start md:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg md:text-xl">Compression Settings</CardTitle>
                      <CardDescription className="text-xs md:text-sm">
                        Adjust quality and compress your image
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={resetTool}
                      data-testid="button-reset"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Compression Quality</Label>
                      <span className="text-sm font-medium">{quality}%</span>
                    </div>
                    <Slider
                      value={[quality]}
                      onValueChange={(value) => setQuality(value[0])}
                      min={10}
                      max={100}
                      step={5}
                      disabled={loading}
                      data-testid="slider-quality"
                    />
                    <p className="text-xs text-muted-foreground">
                      Lower quality = smaller file size. 80% is recommended for most images.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button
                      onClick={compressImage}
                      disabled={loading}
                      className="w-full"
                      size="lg"
                      data-testid="button-compress"
                    >
                      {loading ? (
                        <>
                          <ImageDown className="mr-2 h-4 w-4 animate-pulse" />
                          <span className="hidden sm:inline">Compressing...</span>
                          <span className="sm:hidden">Compressing...</span>
                        </>
                      ) : (
                        <>
                          <ImageDown className="mr-2 h-4 w-4" />
                          <span className="hidden sm:inline">Compress Image</span>
                          <span className="sm:hidden">Compress</span>
                        </>
                      )}
                    </Button>
                    {compressedFile && (
                      <Button
                        onClick={downloadCompressed}
                        variant="outline"
                        className="w-full"
                        size="lg"
                        data-testid="button-download-compressed"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Download</span>
                        <span className="sm:hidden">Download</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Split Comparison View */}
              <Card>
                <CardHeader className="pb-3 md:pb-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <CardTitle>Comparison</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {sliderEnabled 
                          ? "Drag the divider to compare. You can also scroll to explore other parts of the image." 
                          : "Click the center button to enable comparison slider"}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Original:</span>
                        <span className="font-medium">{formatFileSize(originalFile.size)}</span>
                      </div>
                      {compressedFile && (
                        <>
                          <span className="text-muted-foreground hidden sm:inline">|</span>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-muted-foreground">Compressed:</span>
                            <span className="font-medium text-primary">{formatFileSize(compressedFile.size)}</span>
                            <Badge className="text-xs" variant="default">
                              {Math.round((1 - compressedFile.size / originalFile.size) * 100)}% smaller
                            </Badge>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
                  {compressedFile && originalFile && compressedPreview && originalPreview ? (
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-auto bg-muted border border-border" style={{ maxHeight: "clamp(250px, 70vh, 500px)" }}>
                        {sliderEnabled ? (
                          <div className="w-full h-full relative">
                            <ReactCompareSlider
                              itemOne={
                                <ReactCompareSliderImage
                                  src={originalPreview}
                                  alt="Original Image"
                                />
                              }
                              itemTwo={
                                <ReactCompareSliderImage
                                  src={compressedPreview}
                                  alt="Compressed Image"
                                />
                              }
                              position={50}
                              data-testid="split-comparison-container"
                            />
                            <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">Original</div>
                            <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">Compressed</div>
                          </div>
                        ) : (
                          <div className="relative w-full bg-gray-100 dark:bg-gray-900" style={{ minHeight: "clamp(250px, 70vh, 500px)", aspectRatio: "auto" }}>
                            <img
                              src={compressedPreview}
                              alt="Compressed"
                              className="w-full h-full object-contain"
                            />
                            <button
                              onClick={() => setSliderEnabled(true)}
                              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full px-4 py-2 sm:px-5 sm:py-3 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center border-2 border-primary"
                              data-testid="button-enable-slider"
                              title="Click to enable comparison slider"
                            >
                              <span className="text-xs sm:text-sm font-bold whitespace-nowrap">Click to Compare</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Tip:</strong> {sliderEnabled ? "Drag the divider to compare. Scroll or drag the image to explore different areas." : "Click the center button to enable the comparison slider, then drag to compare both images."}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center" style={{ minHeight: "clamp(200px, 50vh, 400px)" }}>
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-20" />
                        <p className="text-xs sm:text-sm">Compress image to see comparison</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Compression Results Summary */}
              {compressedFile && originalFile && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Original Size</p>
                        <p className="text-lg font-semibold" data-testid="text-original-size">{formatFileSize(originalFile.size)}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary hidden sm:block" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Compressed Size</p>
                        <p className="text-lg font-semibold text-primary" data-testid="text-compressed-size">{formatFileSize(compressedFile.size)}</p>
                      </div>
                      <div className="sm:border-l sm:pl-8 sm:border-border">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Size Reduced By</p>
                        <p className="text-lg font-bold text-primary" data-testid="text-reduction-percent">{Math.round((1 - compressedFile.size / originalFile.size) * 100)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-lg">Upload Image</h3>
              <p className="text-muted-foreground">
                Click to select an image from your device
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-lg">Adjust Quality</h3>
              <p className="text-muted-foreground">
                Use the slider to set your desired compression level
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-lg">Download</h3>
              <p className="text-muted-foreground">
                Compare results and download your optimized image
              </p>
            </div>
          </div>
        </section>

        {/* Why Use Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Use Pixocraft Tools' Image Compressor?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Boost Website Performance & SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Page load speed is a critical ranking factor for Google and directly impacts user experience. Large, unoptimized images are one of the main causes of slow websites. By compressing images online free with Pixocraft Tools, you can reduce image file sizes by 60-90% without visible quality loss, dramatically improving your site's loading speed. Faster websites rank higher in search results, reduce bounce rates, and increase conversions. Studies show that a 1-second delay in page load time can decrease conversions by 7% and page views by 11%. Our image optimizer helps you deliver lightning-fast web experiences that both search engines and users love.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Save Storage & Bandwidth Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Whether you're managing a personal blog or running an enterprise e-commerce platform, storage and bandwidth costs add up quickly. Compressed images take up significantly less space on your servers and consume less bandwidth when delivered to visitors. For high-traffic websites, this can translate to substantial cost savings on hosting and CDN services. Our free image compressor helps photographers reduce cloud storage costs, enables bloggers to keep more content within their hosting limits, and allows businesses to optimize their infrastructure expenses while maintaining visual quality.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Privacy-First Browser-Based Compression</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unlike many online image compressors that upload your files to their servers, Pixocraft Tools processes everything locally in your browser using advanced JavaScript algorithms. Your images never leave your device, ensuring complete privacy and security. This is especially important when working with confidential business graphics, personal photos, or proprietary product images. There's no file size upload limit, no waiting in processing queues, and no risk of your images being stored, analyzed, or accessed by third parties. Compress images with complete peace of mind knowing your data stays private.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Perfect for All Your Image Needs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our image optimizer is designed to handle any compression scenario. Web developers use it to optimize images for responsive designs and faster Core Web Vitals scores. Social media managers compress images to meet platform upload requirements while maintaining visual appeal. Email marketers reduce image sizes to ensure newsletters load quickly and avoid spam filters. Photographers prepare high-resolution images for online portfolios. E-commerce businesses optimize product photos for faster checkout experiences. With customizable quality settings and support for JPG, PNG, and WebP formats, Pixocraft Tools adapts to your specific needs.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="prose prose-lg max-w-4xl mx-auto space-y-4">
            <p className="text-muted-foreground">
              Image optimization is essential for modern web performance. Our tool combines powerful compression algorithms with a user-friendly interface, making it easy for anyone to reduce image size online without technical knowledge. Whether you're optimizing a single photo or preparing dozens of images for your website, Pixocraft Tools delivers professional-quality results in seconds.
            </p>
            <p className="text-muted-foreground">
              Need to create scannable codes for your optimized landing pages? Try our <Link href="/tools/qr-maker" className="text-primary hover:underline">QR Code Maker</Link> to generate instant QR codes. For secure access to your optimized image galleries, use our <Link href="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link> to create strong, unique passwords.
            </p>
          </div>
        </section>

        {/* Who Should Use Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Who Should Use This Image Compressor?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Website Owners & Bloggers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Speed up your site, improve Core Web Vitals, and boost SEO rankings with optimized images that load instantly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <ShoppingCart className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">E-commerce Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Compress product photos for faster checkout experiences and reduced bounce rates without sacrificing image quality.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <Camera className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Designers & Photographers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Prepare portfolio images for web, reduce file sizes for client delivery, and save storage space on cloud services.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <Share2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Social Media Managers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Meet platform upload limits, speed up posting workflows, and ensure visuals look sharp across all social networks.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Website & Blog Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Optimize images for WordPress, Shopify, Wix, or custom websites to improve Core Web Vitals, boost SEO rankings, and deliver faster page loads. Essential for bloggers, web developers, and online businesses.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Social Media & Marketing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Prepare images for Instagram, Facebook, Twitter, and LinkedIn while meeting size requirements. Compress email newsletter graphics, reduce file sizes for faster uploads, and maintain quality across platforms.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Photography & Design</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">
                  Reduce high-resolution photo file sizes for online portfolios, client previews, and digital delivery. Save storage space while preserving visual quality for professional photography and design work.
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

        {/* Authority & Freshness Signals */}
        <section className="mb-16">
          <Card className="bg-muted/30">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-6 flex-wrap justify-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Trusted by 100,000+ users worldwide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span>India's largest offline-first tool hub with 200+ browser-based tools</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Last updated: December 2025</span>
                </div>
              </div>
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
          {/* Category Footer */}\n          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">\n            Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>\n          </p>
      </div>
    </div>
    </>
  );
}
