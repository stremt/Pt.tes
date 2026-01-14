import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Droplets, Upload, Download, X, Shield, Briefcase, GraduationCap, Building2, FileText, Users, Type, Image, RotateCw, Grid3X3, ChevronLeft, ChevronRight, Layers, Eye, Loader2, Check, Zap, Lock, Palette, Move } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { addAdvancedWatermarkToPDF, getPDFInfo, formatFileSize, type WatermarkPosition, type WatermarkFont, type WatermarkLayer } from "@/lib/pdf-utils";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const positionGrid: { id: WatermarkPosition; label: string; icon: string }[] = [
  { id: 'top-left', label: 'Top Left', icon: '↖' },
  { id: 'top-center', label: 'Top Center', icon: '↑' },
  { id: 'top-right', label: 'Top Right', icon: '↗' },
  { id: 'middle-left', label: 'Middle Left', icon: '←' },
  { id: 'middle-center', label: 'Center', icon: '●' },
  { id: 'middle-right', label: 'Middle Right', icon: '→' },
  { id: 'bottom-left', label: 'Bottom Left', icon: '↙' },
  { id: 'bottom-center', label: 'Bottom Center', icon: '↓' },
  { id: 'bottom-right', label: 'Bottom Right', icon: '↘' },
];

const fontOptions: { id: WatermarkFont; label: string }[] = [
  { id: 'Helvetica', label: 'Helvetica' },
  { id: 'HelveticaBold', label: 'Helvetica Bold' },
  { id: 'TimesRoman', label: 'Times Roman' },
  { id: 'TimesRomanBold', label: 'Times Roman Bold' },
  { id: 'Courier', label: 'Courier' },
  { id: 'CourierBold', label: 'Courier Bold' },
];

const rotationOptions = [
  { value: 0, label: '0°' },
  { value: 45, label: '45°' },
  { value: -45, label: '-45°' },
  { value: 90, label: '90°' },
];

export default function PDFWatermarkAdder() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPreviewPage, setCurrentPreviewPage] = useState(1);
  const [watermarkedFile, setWatermarkedFile] = useState<Blob | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [watermarkImage, setWatermarkImage] = useState<ArrayBuffer | null>(null);
  const [watermarkImagePreview, setWatermarkImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<'image/png' | 'image/jpeg'>('image/png');
  
  const [font, setFont] = useState<WatermarkFont>('HelveticaBold');
  const [fontSize, setFontSize] = useState(50);
  const [opacity, setOpacity] = useState(30);
  const [rotation, setRotation] = useState(-45);
  const [position, setPosition] = useState<WatermarkPosition>('middle-center');
  const [isMosaic, setIsMosaic] = useState(false);
  const [layer, setLayer] = useState<WatermarkLayer>('over');
  const [pageRangeType, setPageRangeType] = useState<'all' | 'range'>('all');
  const [pageFrom, setPageFrom] = useState(1);
  const [pageTo, setPageTo] = useState(1);
  
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [cachedPageImage, setCachedPageImage] = useState<ImageData | null>(null);
  const [cachedPageDimensions, setCachedPageDimensions] = useState<{width: number, height: number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (watermarkImagePreview) {
      const img = new window.Image();
      img.onload = () => {
        setLoadedImage(img);
      };
      img.src = watermarkImagePreview;
    } else {
      setLoadedImage(null);
    }
  }, [watermarkImagePreview]);

  useSEO({
    title: "Add Watermark to PDF Online Free | PDF Watermark Tool",
    description: "Add custom text watermarks to PDF files online for free. Protect documents, mark as confidential, add branding. Secure, offline processing in your browser.",
    keywords: "add watermark to pdf, pdf watermark online, watermark pdf free, protect pdf, pdf security, add text to pdf, pdf watermarking tool, stamp pdf, pdf branding",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-watermark-adder",
    ogImage: "https://tools.pixocraft.in/og-images/pdf-watermark.jpg",
  });

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast({
        title: "Invalid File",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      playErrorSound();
      return;
    }
    setFile(selectedFile);
    setWatermarkedFile(null);
    setCurrentPreviewPage(1);
    
    try {
      const info = await getPDFInfo(selectedFile);
      setPageCount(info.pageCount);
      setPageTo(info.pageCount);
      
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      setPdfDoc(pdf);
    } catch {
      setPageCount(1);
      setPdfDoc(null);
    }
  }, [toast]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  }, [handleFileSelect]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const selectedFile = e.clipboardData?.files?.[0];
      if (selectedFile && selectedFile.type === "application/pdf") {
        handleFileSelect(selectedFile);
        toast({
          title: "File Pasted",
          description: `Pasted ${selectedFile.name}`,
        });
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFileSelect, toast]);

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please select an image file (PNG or JPG)",
          variant: "destructive",
        });
        return;
      }
      
      try {
        // Import compression dynamically
        const imageCompression = await import('browser-image-compression');
        
        // Compress the image to ~200KB for faster processing
        const compressedFile = await imageCompression.default(selectedFile, {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });
        
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setWatermarkImage(e.target.result as ArrayBuffer);
            setWatermarkImagePreview(URL.createObjectURL(compressedFile));
            setImageMimeType(compressedFile.type === 'image/jpeg' ? 'image/jpeg' : 'image/png');
            toast({
              title: "Image Compressed",
              description: `Reduced from ${(selectedFile.size / 1024 / 1024).toFixed(2)}MB to ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
            });
          }
        };
        reader.readAsArrayBuffer(compressedFile);
      } catch (error) {
        // Fallback: use uncompressed image
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setWatermarkImage(e.target.result as ArrayBuffer);
            setWatermarkImagePreview(URL.createObjectURL(selectedFile));
            setImageMimeType(selectedFile.type === 'image/jpeg' ? 'image/jpeg' : 'image/png');
          }
        };
        reader.readAsArrayBuffer(selectedFile);
      }
    }
  };

  const renderAndCachePDFPage = useCallback(async () => {
    if (!pdfDoc) return;
    
    setPreviewLoading(true);
    try {
      const page = await pdfDoc.getPage(currentPreviewPage);
      const viewport = page.getViewport({ scale: 1 });
      
      const containerWidth = 320;
      const scale = containerWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });
      
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = scaledViewport.width;
      offscreenCanvas.height = scaledViewport.height;
      const offscreenCtx = offscreenCanvas.getContext('2d');
      
      if (offscreenCtx) {
        const renderContext = {
          canvasContext: offscreenCtx,
          viewport: scaledViewport,
          canvas: offscreenCanvas,
        };
        await page.render(renderContext as any).promise;
        
        const imageData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        setCachedPageImage(imageData);
        setCachedPageDimensions({ width: offscreenCanvas.width, height: offscreenCanvas.height });
      }
    } catch (error) {
      console.error('Error rendering PDF page:', error);
      setCachedPageImage(null);
      setCachedPageDimensions(null);
    } finally {
      setPreviewLoading(false);
    }
  }, [pdfDoc, currentPreviewPage]);

  useEffect(() => {
    if (pdfDoc) {
      renderAndCachePDFPage();
    } else {
      setCachedPageImage(null);
      setCachedPageDimensions(null);
    }
  }, [pdfDoc, currentPreviewPage, renderAndCachePDFPage]);

  const drawWatermarkOverlay = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.globalAlpha = opacity / 100;
    
    const padding = 30;
    let x: number, y: number;
    
    if (isMosaic) {
      const spacingX = 120;
      const spacingY = 90;
      for (let my = spacingY / 2; my < height; my += spacingY) {
        for (let mx = spacingX / 2; mx < width; mx += spacingX) {
          ctx.save();
          ctx.translate(mx, my);
          ctx.rotate((rotation * Math.PI) / 180);
          
          if (watermarkType === 'text') {
            const scaledFontSize = fontSize * 0.35;
            ctx.font = `${font.includes('Bold') ? 'bold ' : ''}${scaledFontSize}px ${font.replace('Bold', '')}`;
            ctx.fillStyle = 'rgba(100, 100, 100, 1)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(watermarkText, 0, 0);
          } else if (loadedImage) {
            const imgSize = fontSize * 0.5;
            ctx.drawImage(loadedImage, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
          }
          ctx.restore();
        }
      }
    } else {
      const scaledFontSize = fontSize * 0.35;
      ctx.font = `${font.includes('Bold') ? 'bold ' : ''}${scaledFontSize}px ${font.replace('Bold', '')}`;
      const textHeight = scaledFontSize;
      
      switch (position) {
        case 'top-left':
          x = padding;
          y = padding + textHeight;
          break;
        case 'top-center':
          x = width / 2;
          y = padding + textHeight;
          break;
        case 'top-right':
          x = width - padding;
          y = padding + textHeight;
          break;
        case 'middle-left':
          x = padding;
          y = height / 2;
          break;
        case 'middle-center':
          x = width / 2;
          y = height / 2;
          break;
        case 'middle-right':
          x = width - padding;
          y = height / 2;
          break;
        case 'bottom-left':
          x = padding;
          y = height - padding;
          break;
        case 'bottom-center':
          x = width / 2;
          y = height - padding;
          break;
        case 'bottom-right':
          x = width - padding;
          y = height - padding;
          break;
        default:
          x = width / 2;
          y = height / 2;
      }
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      
      if (watermarkType === 'text') {
        ctx.fillStyle = 'rgba(100, 100, 100, 1)';
        ctx.textAlign = position.includes('left') ? 'left' : position.includes('right') ? 'right' : 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(watermarkText, 0, 0);
      } else if (loadedImage) {
        const imgSize = fontSize * 0.7;
        ctx.drawImage(loadedImage, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
      }
      ctx.restore();
    }
    
    ctx.restore();
  }, [watermarkText, watermarkType, loadedImage, font, fontSize, opacity, rotation, position, isMosaic]);

  const drawFallbackPreview = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 20; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 30);
      ctx.lineTo(i + 25, 30);
      ctx.stroke();
    }
    for (let j = 50; j < height - 20; j += 20) {
      ctx.beginPath();
      ctx.moveTo(20, j);
      ctx.lineTo(width - 20, j);
      ctx.stroke();
    }
    
    drawWatermarkOverlay(ctx, width, height);
  }, [drawWatermarkOverlay]);

  const drawPreview = useCallback(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (cachedPageImage && cachedPageDimensions) {
      canvas.width = cachedPageDimensions.width;
      canvas.height = cachedPageDimensions.height;
      ctx.putImageData(cachedPageImage, 0, 0);
      drawWatermarkOverlay(ctx, canvas.width, canvas.height);
    } else if (!pdfDoc) {
      canvas.width = 320;
      canvas.height = 452;
      drawFallbackPreview(ctx, canvas.width, canvas.height);
    }
  }, [cachedPageImage, cachedPageDimensions, pdfDoc, drawWatermarkOverlay, drawFallbackPreview]);

  useEffect(() => {
    drawPreview();
  }, [drawPreview, watermarkText, watermarkType, loadedImage, font, fontSize, opacity, rotation, position, isMosaic]);

  const goToPrevPage = () => {
    if (currentPreviewPage > 1) {
      setCurrentPreviewPage(prev => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPreviewPage < pageCount) {
      setCurrentPreviewPage(prev => prev + 1);
    }
  };

  const addWatermark = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }
    
    if (watermarkType === 'text' && !watermarkText.trim()) {
      toast({
        title: "Error",
        description: "Please enter watermark text",
        variant: "destructive",
      });
      return;
    }
    
    if (watermarkType === 'image' && !watermarkImage) {
      toast({
        title: "Error",
        description: "Please select a watermark image",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await addAdvancedWatermarkToPDF(file, {
        type: watermarkType,
        text: watermarkText,
        imageData: watermarkImage || undefined,
        imageMimeType,
        font,
        fontSize,
        opacity: opacity / 100,
        rotation,
        position: isMosaic ? 'mosaic' : position,
        layer,
        pageRange: pageRangeType === 'all' ? 'all' : { from: pageFrom, to: pageTo },
      });

      setWatermarkedFile(result);
      toast({
        title: "Success!",
        description: "Watermark added to PDF successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add watermark",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadWatermarked = () => {
    if (watermarkedFile) {
      const url = URL.createObjectURL(watermarkedFile);
      const link = document.createElement("a");
      link.download = `watermarked-${file?.name || "document.pdf"}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const resetAll = () => {
    setFile(null);
    setWatermarkedFile(null);
    setWatermarkImage(null);
    setWatermarkImagePreview(null);
    setPageCount(1);
    setCurrentPreviewPage(1);
    setPdfDoc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const faqItems: FAQItem[] = [
    {
      question: "Why should I add watermarks to my PDF documents?",
      answer: "Watermarks serve multiple important purposes: they protect intellectual property by clearly marking ownership, indicate document status (like DRAFT or CONFIDENTIAL), deter unauthorized copying and distribution, add professional branding to business documents, and help track document versions."
    },
    {
      question: "Can I add image watermarks to my PDFs?",
      answer: "Yes! This tool supports both text and image watermarks. You can upload PNG or JPG images to use as your watermark, perfect for adding logos or custom graphics to your documents."
    },
    {
      question: "What is the mosaic/tile pattern option?",
      answer: "The mosaic option repeats your watermark across the entire page in a grid pattern. This provides comprehensive coverage and makes it much harder for anyone to remove or crop out the watermark."
    },
    {
      question: "Is my PDF secure when I add watermarks using this tool?",
      answer: "Absolutely. All processing happens entirely within your web browser—your PDF never gets uploaded to any server. We cannot see, access, or store your documents."
    },
    {
      question: "Can I apply watermarks to specific pages only?",
      answer: "Yes! You can choose to apply watermarks to all pages or specify a page range (e.g., pages 1 to 5). This gives you precise control over which pages receive the watermark."
    },
    {
      question: "What's the difference between 'over' and 'below' layer options?",
      answer: "The 'over' option places the watermark on top of your PDF content, making it more visible. The 'below' option places it behind the content, which can be more subtle but may be hidden by images or colored backgrounds."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const relatedTools = [
    { name: "PDF Watermark Remover", href: "/tools/pdf-watermark-remover", description: "Remove or reduce watermarks from PDF files" },
    { name: "PDF Password Remover", href: "/tools/pdf-password-remover", description: "Remove password protection from PDF files" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor", description: "Reduce PDF file size while maintaining quality" },
    { name: "PDF Merger", href: "/tools/pdf-merger", description: "Combine multiple PDF files into one document" },
    { name: "Image to PDF", href: "/tools/image-to-pdf", description: "Convert JPG, PNG, and other images to PDF format" }
  ];

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
            <Link href="/tools/pdf" className="hover:text-foreground">PDF Tools</Link>
            {" / "}
            <span className="text-foreground">PDF Watermark Adder</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Droplets className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-h1">Free PDF Watermark Tool - Add Text Watermarks Online</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protect your documents with custom text or image watermarks. Choose position, opacity, rotation, and more. Live preview shows exactly how your watermark will look.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Live Preview</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Private</Badge>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload PDF</CardTitle>
                  <CardDescription>Select a PDF file to add watermark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
                      isDragging 
                        ? "border-primary bg-primary/5 scale-[1.01] shadow-lg" 
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    data-testid="dropzone-upload"
                  >
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Upload className={`h-10 w-10 transition-transform duration-200 ${isDragging ? "scale-110 text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Drop PDF here</h3>
                    <p className="text-muted-foreground mb-6">or click to upload from device</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4" />
                        <span>Private & Offline</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-primary/80">
                        <span className="px-1.5 py-0.5 rounded border border-primary/20 bg-primary/5 text-[10px] uppercase tracking-wider">Tip</span>
                        <span>Paste with Ctrl+V</span>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={onFileChange}
                      className="hidden"
                      data-testid="input-file"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 space-y-4">
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <CardTitle className="text-lg">{file.name}</CardTitle>
                            <CardDescription>{pageCount} page{pageCount > 1 ? 's' : ''}</CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={resetAll}
                          data-testid="button-reset"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Tabs value={watermarkType} onValueChange={(v) => setWatermarkType(v as 'text' | 'image')}>
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                          <TabsTrigger value="text" className="flex items-center gap-2" data-testid="tab-text">
                            <Type className="h-4 w-4" />
                            Text Watermark
                          </TabsTrigger>
                          <TabsTrigger value="image" className="flex items-center gap-2" data-testid="tab-image">
                            <Image className="h-4 w-4" />
                            Image Watermark
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="text" className="space-y-4 mt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="watermark-text">Watermark Text</Label>
                              <Input
                                id="watermark-text"
                                value={watermarkText}
                                onChange={(e) => setWatermarkText(e.target.value)}
                                placeholder="Enter watermark text"
                                data-testid="input-watermark-text"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Font</Label>
                              <Select value={font} onValueChange={(v) => setFont(v as WatermarkFont)}>
                                <SelectTrigger data-testid="select-font">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {fontOptions.map((f) => (
                                    <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="image" className="mt-0">
                          <div
                            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover-elevate transition-colors"
                            onClick={() => imageInputRef.current?.click()}
                          >
                            {watermarkImagePreview ? (
                              <div className="flex flex-col items-center gap-3">
                                <div className="p-3 bg-muted rounded-lg">
                                  <img 
                                    src={watermarkImagePreview} 
                                    alt="Watermark preview" 
                                    className="max-h-16 max-w-full object-contain"
                                  />
                                </div>
                                <p className="text-sm text-muted-foreground">Click to change image</p>
                              </div>
                            ) : (
                              <div className="py-2">
                                <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm font-medium">Upload watermark image</p>
                                <p className="text-xs text-muted-foreground mt-1">PNG or JPG format</p>
                              </div>
                            )}
                            <input
                              ref={imageInputRef}
                              type="file"
                              accept="image/png,image/jpeg"
                              onChange={handleImageSelect}
                              className="hidden"
                              data-testid="input-image"
                            />
                          </div>
                        </TabsContent>
                      </Tabs>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center gap-2 text-base font-medium">
                            <Grid3X3 className="h-4 w-4" />
                            Position
                          </Label>
                          <div className="flex items-center gap-2">
                            <Switch
                              id="mosaic"
                              checked={isMosaic}
                              onCheckedChange={setIsMosaic}
                            />
                            <Label htmlFor="mosaic" className="text-sm cursor-pointer">
                              Tile Pattern
                            </Label>
                          </div>
                        </div>
                        
                        {!isMosaic && (
                          <div className="grid grid-cols-3 gap-1.5 w-fit mx-auto">
                            {positionGrid.map((pos) => (
                              <button
                                key={pos.id}
                                onClick={() => setPosition(pos.id)}
                                className={`w-12 h-12 rounded-lg text-lg font-medium transition-all ${
                                  position === pos.id
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'bg-muted hover:bg-muted/80'
                                }`}
                                title={pos.label}
                                data-testid={`button-position-${pos.id}`}
                              >
                                {pos.icon}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Opacity
                            </Label>
                            <span className="text-sm font-medium text-muted-foreground">{opacity}%</span>
                          </div>
                          <Slider
                            value={[opacity]}
                            onValueChange={(v) => setOpacity(v[0])}
                            min={10}
                            max={100}
                            step={5}
                            data-testid="slider-opacity"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Size</Label>
                            <span className="text-sm font-medium text-muted-foreground">{fontSize}pt</span>
                          </div>
                          <Slider
                            value={[fontSize]}
                            onValueChange={(v) => setFontSize(v[0])}
                            min={20}
                            max={150}
                            step={5}
                            data-testid="slider-fontsize"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <RotateCw className="h-4 w-4" />
                          Rotation
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {rotationOptions.map((opt) => (
                            <Button
                              key={opt.value}
                              variant={rotation === opt.value ? "default" : "outline"}
                              size="sm"
                              onClick={() => setRotation(opt.value)}
                              data-testid={`button-rotation-${opt.value}`}
                            >
                              {opt.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Pages
                          </Label>
                          <RadioGroup value={pageRangeType} onValueChange={(v) => setPageRangeType(v as 'all' | 'range')}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="all-pages" />
                              <Label htmlFor="all-pages" className="cursor-pointer font-normal">All pages</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="range" id="page-range" />
                              <Label htmlFor="page-range" className="cursor-pointer font-normal">Page range</Label>
                            </div>
                          </RadioGroup>
                          {pageRangeType === 'range' && (
                            <div className="flex items-center gap-2 pl-6">
                              <Input
                                type="number"
                                min={1}
                                max={pageCount}
                                value={pageFrom}
                                onChange={(e) => setPageFrom(Math.max(1, Math.min(pageCount, parseInt(e.target.value) || 1)))}
                                className="w-16 h-8"
                                data-testid="input-page-from"
                              />
                              <span className="text-sm text-muted-foreground">to</span>
                              <Input
                                type="number"
                                min={1}
                                max={pageCount}
                                value={pageTo}
                                onChange={(e) => setPageTo(Math.max(1, Math.min(pageCount, parseInt(e.target.value) || 1)))}
                                className="w-16 h-8"
                                data-testid="input-page-to"
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <Label className="flex items-center gap-2">
                            <Layers className="h-4 w-4" />
                            Layer
                          </Label>
                          <RadioGroup value={layer} onValueChange={(v) => setLayer(v as WatermarkLayer)}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="over" id="layer-over" />
                              <Label htmlFor="layer-over" className="cursor-pointer font-normal">Over content</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="below" id="layer-below" />
                              <Label htmlFor="layer-below" className="cursor-pointer font-normal">Below content</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={addWatermark}
                      disabled={loading || (watermarkType === 'text' && !watermarkText.trim()) || (watermarkType === 'image' && !watermarkImage)}
                      className="flex-1"
                      size="lg"
                      data-testid="button-add-watermark"
                    >
                      <Droplets className="mr-2 h-4 w-4" />
                      {loading ? "Adding Watermark..." : "Add Watermark"}
                    </Button>
                    {watermarkedFile && (
                      <Button
                        onClick={downloadWatermarked}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                        data-testid="button-download"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    )}
                  </div>

                  {watermarkedFile && (
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        Watermark added successfully! Your PDF is ready to download.
                      </p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <Card className="sticky top-4">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Live Preview
                        </CardTitle>
                        {pageCount > 1 && (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={goToPrevPage}
                              disabled={currentPreviewPage <= 1}
                              data-testid="button-prev-page"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-xs text-muted-foreground min-w-[60px] text-center">
                              {currentPreviewPage} / {pageCount}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={goToNextPage}
                              disabled={currentPreviewPage >= pageCount}
                              data-testid="button-next-page"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-center min-h-[300px] relative">
                        {previewLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted/80 rounded-lg z-10">
                            <div className="flex flex-col items-center gap-2">
                              <Loader2 className="h-8 w-8 animate-spin text-primary" />
                              <span className="text-sm text-muted-foreground">Loading preview...</span>
                            </div>
                          </div>
                        )}
                        <canvas
                          ref={previewCanvasRef}
                          className="border border-border rounded shadow-sm max-w-full h-auto"
                          style={{ maxHeight: '500px', opacity: previewLoading ? 0.3 : 1 }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-3">
                        Preview updates live as you change settings
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Type className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Text Watermarks</h3>
                    <p className="text-sm text-muted-foreground">Add custom text with 6 font options, adjustable size, and rotation</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Image className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Image Watermarks</h3>
                    <p className="text-sm text-muted-foreground">Upload PNG or JPG logos and graphics as watermarks</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Live Preview</h3>
                    <p className="text-sm text-muted-foreground">See your watermark on actual PDF pages in real-time</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">100% Private</h3>
                    <p className="text-sm text-muted-foreground">All processing happens in your browser - files never uploaded</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Move className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">9 Positions</h3>
                    <p className="text-sm text-muted-foreground">Place watermark at any corner, edge, or center of the page</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Grid3X3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Tile Pattern</h3>
                    <p className="text-sm text-muted-foreground">Repeat watermark across entire page for maximum protection</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Palette className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Adjustable Opacity</h3>
                    <p className="text-sm text-muted-foreground">Control transparency from 10% to 100% for subtle or bold marks</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Page Selection</h3>
                    <p className="text-sm text-muted-foreground">Apply to all pages or select a specific range</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Watermark Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    <CardTitle>Confidential Documents</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mark sensitive business documents, contracts, financial reports, and internal communications as "CONFIDENTIAL" to prevent unauthorized sharing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>Copyright Protection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Add your company name, logo, or copyright notice to establish clear ownership and discourage unauthorized use of your documents.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>Draft & Preview Versions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mark documents as "DRAFT", "PREVIEW", or "SAMPLE" to clearly indicate document status and prevent confusion with final versions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Privacy: Your Documents Never Leave Your Device</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      When you add watermarks using this tool, all processing happens entirely within your web browser. Your PDF is never uploaded to any server—it stays on your device throughout the entire process.
                    </p>
                    <p className="text-muted-foreground">
                      We have zero access to your documents. There's no upload, no cloud processing, no storage, and no data collection. You get the convenience of an online tool with the security of offline software.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Tools You May Find Useful</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <Card className="h-full hover-elevate cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/pdf" className="text-primary hover:text-primary/80 transition-colors">PDF Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
