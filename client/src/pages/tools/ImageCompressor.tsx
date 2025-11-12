import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { ImageDown, Upload, Download, Image as ImageIcon, ArrowRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import imageCompression from "browser-image-compression";

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [compressedPreview, setCompressedPreview] = useState<string>("");
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Image Compressor | Pixocraft Tools",
    description: "Compress images without losing quality with Pixocraft Tools. Reduce file size instantly, optimize images, and download for free. Supports JPG, PNG, and WebP.",
    keywords: "image compressor, compress image, reduce image size, optimize image, image optimizer, free image compression",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-compressor",
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
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        quality: quality / 100,
      };

      const compressed = await imageCompression(originalFile, options);
      setCompressedFile(compressed);

      const reader = new FileReader();
      reader.onload = (e) => {
        setCompressedPreview(e.target?.result as string);
      };
      reader.readAsDataURL(compressed);

      toast({
        title: "Success!",
        description: `Image compressed successfully. Reduced by ${Math.round((1 - compressed.size / originalFile.size) * 100)}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress image. Please try again.",
        variant: "destructive",
      });
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
    }
  };

  const resetTool = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setOriginalPreview("");
    setCompressedPreview("");
    setQuality(80);
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

  return (
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
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <ImageDown className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Image Compressor</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compress images without losing quality. Reduce file size instantly and download optimized images.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary">Free</Badge>
            <Badge variant="secondary">No Upload Limit</Badge>
            <Badge variant="secondary">Privacy First</Badge>
          </div>
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
                  className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="dropzone-upload"
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium mb-2">Click to upload an image</p>
                  <p className="text-sm text-muted-foreground">
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
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Controls Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Compression Settings</CardTitle>
                      <CardDescription>
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
                <CardContent className="space-y-6">
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

                  <div className="flex gap-2">
                    <Button
                      onClick={compressImage}
                      disabled={loading}
                      className="flex-1"
                      size="lg"
                      data-testid="button-compress"
                    >
                      {loading ? (
                        <>
                          <ImageDown className="mr-2 h-4 w-4 animate-pulse" />
                          Compressing...
                        </>
                      ) : (
                        <>
                          <ImageDown className="mr-2 h-4 w-4" />
                          Compress Image
                        </>
                      )}
                    </Button>
                    {compressedFile && (
                      <Button
                        onClick={downloadCompressed}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                        data-testid="button-download-compressed"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Comparison Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Original</CardTitle>
                    <CardDescription>
                      {formatFileSize(originalFile.size)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      {originalPreview ? (
                        <img
                          src={originalPreview}
                          alt="Original"
                          className="w-full h-full object-contain"
                          data-testid="img-original-preview"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Compressed */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Compressed</CardTitle>
                        <CardDescription>
                          {compressedFile ? formatFileSize(compressedFile.size) : "Not compressed yet"}
                        </CardDescription>
                      </div>
                      {compressedFile && originalFile && (
                        <Badge variant="default">
                          {Math.round((1 - compressedFile.size / originalFile.size) * 100)}% smaller
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      {compressedPreview ? (
                        <img
                          src={compressedPreview}
                          alt="Compressed"
                          className="w-full h-full object-contain"
                          data-testid="img-compressed-preview"
                        />
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                          <p className="text-sm">Compress to preview</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Why Compress Images?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Faster Website Loading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Smaller images load faster, improving user experience and SEO rankings
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Save Storage Space</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Reduce file sizes to save valuable storage space on your devices and servers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Maintain Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our compression algorithm maintains visual quality while reducing file size
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Easier Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Smaller files are easier to share via email, messaging apps, and social media
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
                <AccordionTrigger>Is my image uploaded to your servers?</AccordionTrigger>
                <AccordionContent>
                  No! All image compression happens entirely in your browser. Your images never leave your device, ensuring complete privacy and security.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What's the difference between quality levels?</AccordionTrigger>
                <AccordionContent>
                  Higher quality (90-100%) preserves more detail but results in larger files. Lower quality (50-70%) creates smaller files but may show slight artifacts. 80% is the sweet spot for most images.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Which image formats are supported?</AccordionTrigger>
                <AccordionContent>
                  We support JPG, JPEG, PNG, and WebP formats. The compressed image will maintain the same format as your original upload.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I compress multiple images at once?</AccordionTrigger>
                <AccordionContent>
                  Currently, you can compress one image at a time. We're working on adding batch compression in a future update.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What's the maximum file size I can compress?</AccordionTrigger>
                <AccordionContent>
                  There's no hard limit, but very large images (over 10MB) may take longer to process. For best performance, we recommend images under 5MB.
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
  );
}
