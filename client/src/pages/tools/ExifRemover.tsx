import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { FileX, Upload, Download, Shield, Info, Image as ImageIcon, MapPin, Calendar, Camera } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";
import ExifReader from 'exifreader';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { formatFileSize } from "@/lib/pdf-utils";

export default function ExifRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [cleanedImage, setCleanedImage] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<{
    name: string;
    size: string;
    type: string;
    dimensions: string;
    exif: any;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "EXIF Remover - Remove Metadata & GPS from Photos Online",
    description: "Remove EXIF data from images online for free. Strip GPS location, camera settings, and timestamps to protect your privacy. No uploads, 100% private.",
    keywords: "exif remover, remove metadata from photos, remove gps location from images, photo metadata remover, remove exif data online, exif remover free",
    canonicalUrl: "https://tools.pixocraft.in/tools/exif-remover",
  });

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setCleanedImage(null);
    setImageInfo(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      setImage(dataUrl);

      // Extract EXIF
      try {
        const tags = await ExifReader.load(file);
        
        // Add additional file info that ExifReader might not include by default but are in the file object
        const extendedExif = {
          ...tags,
          FileType: { description: file.type.split('/')[1].toUpperCase() },
          MIMEType: { description: file.type },
          FileSize: { description: formatFileSize(file.size) },
          FileModifyDate: { description: new Date(file.lastModified).toLocaleString() },
        };

        setImageInfo({
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          dimensions: 'Calculating...',
          exif: extendedExif
        });

        const img = new Image();
        img.onload = () => {
          setImageInfo(prev => prev ? { ...prev, dimensions: `${img.width}x${img.height}` } : null);
          removeExif(img);
        };
        img.src = dataUrl;
      } catch (error) {
        console.error("Error reading EXIF:", error);
        // Still try to clean it even if EXIF reading fails
        const img = new Image();
        img.onload = () => removeExif(img);
        img.src = dataUrl;
      }
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) processFile(file);
        }
      }
    }
  }, [processFile]);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const removeExif = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const cleanDataUrl = canvas.toDataURL('image/png');
    setCleanedImage(cleanDataUrl);
    setIsProcessing(false);
    
    toast({
      title: "Success",
      description: "All metadata has been stripped and the image has been re-encoded.",
    });
  };

  const downloadImage = () => {
    if (!cleanedImage) return;

    const link = document.createElement('a');
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    link.download = `pixocraft-${dateStr}.png`;
    link.href = cleanedImage;
    link.click();
  };

  return (
    <>
      <ToolLayout
        title="EXIF Remover: Remove Metadata from Photos Online"
        description="Upload photo → strip metadata → download clean image. Remove GPS, camera settings, timestamps."
        icon={<FileX className="h-10 w-10 text-primary" />}
        toolId="exif-remover"
        category="Privacy & Security"
      howItWorks={[
        { step: 1, title: "Upload, Drag, or Paste", description: "Select a photo, drag it here, or just press Ctrl+V to paste an image from your clipboard." },
        { step: 2, title: "Review Metadata", description: "See the hidden GPS, camera, and device information embedded in your photo." },
        { step: 3, title: "Download Clean", description: "Instantly get a clean version of your image with all private metadata stripped away." },
      ]}
      benefits={[
        { icon: <Shield className="h-6 w-6 text-primary" />, title: "Location Privacy", description: "Remove GPS coordinates that reveal where photos were taken." },
        { icon: <FileX className="h-6 w-6 text-primary" />, title: "Complete Metadata Removal", description: "Strip camera model, timestamps, and device information." },
      ]}
      faqs={[
        { question: "What is EXIF data and what does it contain?", answer: "EXIF (Exchangeable Image File Format) is metadata embedded in your photos. It typically contains GPS coordinates (exact location), camera model, shutter speed, aperture, date & time taken, phone model, and sometimes even thumbnail images. It is essentially a digital footprint of when and where a photo was captured." },
        { question: "How does GPS data in photos affect my privacy?", answer: "GPS coordinates reveal exactly where a photo was taken, often down to a few meters. Sharing these images on social media or public forums can expose your home address, workplace, or travel patterns, creating significant safety and privacy risks." },
        { question: "Does removing EXIF data reduce image quality?", answer: "No, using this EXIF remover does not reduce the visual quality of your image. Our tool strips the invisible metadata while keeping the pixels intact. Your photo remains just as sharp and clear as the original." },
        { question: "Is it possible to remove EXIF from multiple images?", answer: "Currently, this tool processes images individually to ensure maximum privacy and speed. You can quickly clean multiple photos by uploading and downloading them one after another." },
        { question: "Is my privacy guaranteed when using this online EXIF remover?", answer: "Yes. Unlike other tools that upload your files to a server, our EXIF remover processes everything locally in your browser. Your images never leave your computer, ensuring 100% privacy and security." },
        { question: "When should I remove EXIF data from my photos?", answer: "It is best practice to remove metadata before selling items on platforms like OLX or eBay, sharing travel photos on social media, sending proofs to clients, or whenever you want to keep your location and device details private." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          data-testid="input-file"
        />

        <Card 
          className={`border-2 border-dashed transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-muted'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardHeader>
            <CardTitle>Upload, Drag & Drop, or Paste Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center py-10">
            <div className="flex flex-col items-center gap-4">
              <Upload className={`h-12 w-12 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="space-y-1">
                <p className="text-lg font-medium">Click to upload or drag image here</p>
                <p className="text-sm text-muted-foreground">You can also paste an image from your clipboard (Ctrl+V)</p>
              </div>
              <Button onClick={() => fileInputRef.current?.click()} data-testid="button-upload" size="lg">
                Choose Image
              </Button>
            </div>

            {isProcessing && !image && (
              <div className="mt-8 pt-8 border-t flex flex-col md:flex-row gap-8 text-left">
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-[300px] w-full rounded-lg" />
                </div>
                <div className="w-full md:w-80 space-y-6">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-32 w-full rounded-md" />
                </div>
              </div>
            )}

            {image && (
              <div className="mt-8 pt-8 border-t flex flex-col lg:flex-row gap-8 text-left">
                <div className="flex-1 w-full overflow-hidden">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Original Preview
                  </h3>
                  <div className="relative w-full aspect-auto min-h-[200px] bg-muted rounded-lg overflow-hidden border">
                    <img src={image} alt="Original" className="w-full h-auto max-h-[500px] rounded-lg object-contain" data-testid="image-preview" />
                  </div>
                </div>
                
                {imageInfo && (
                  <div className="w-full lg:w-80 space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Image Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between border-b pb-1 gap-4">
                          <span className="text-muted-foreground whitespace-nowrap">File Name</span>
                          <span className="font-mono truncate text-right">{imageInfo.name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 gap-4">
                          <span className="text-muted-foreground whitespace-nowrap">Dimensions</span>
                          <span className="font-mono text-right">{imageInfo.dimensions}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 gap-4">
                          <span className="text-muted-foreground whitespace-nowrap">File Size</span>
                          <span className="font-mono text-right">{imageInfo.size}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1 gap-4">
                          <span className="text-muted-foreground whitespace-nowrap">Format</span>
                          <span className="font-mono uppercase text-right">{imageInfo.type.split('/')[1]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Detected EXIF Data
                      </h3>
                      <div className="space-y-2 text-xs font-mono bg-muted/50 p-3 rounded-md overflow-hidden max-h-[300px] lg:max-h-[400px] overflow-y-auto border">
                        {imageInfo.exif && Object.keys(imageInfo.exif).length > 0 ? (
                          <>
                            {imageInfo.exif.GPSLatitude && (
                              <div className="flex items-center gap-2 text-destructive mb-2 font-bold bg-destructive/5 p-1.5 rounded border border-destructive/20">
                                <MapPin className="h-4 w-4 shrink-0" />
                                <span className="text-[10px] leading-tight">GPS Location Detected (Will be Removed)</span>
                              </div>
                            )}
                            {(imageInfo.exif.Make || imageInfo.exif.Model) && (
                              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2 font-bold bg-amber-500/5 p-1.5 rounded border border-amber-500/20">
                                <Camera className="h-4 w-4 shrink-0" />
                                <span className="text-[10px] leading-tight">Device Info: {imageInfo.exif.Make?.description} {imageInfo.exif.Model?.description}</span>
                              </div>
                            )}
                            {imageInfo.exif.DateTime && (
                              <div className="flex items-center gap-2 text-primary mb-2 bg-primary/5 p-1.5 rounded border border-primary/20">
                                <Calendar className="h-3 w-3 shrink-0" />
                                <span className="text-[10px]">{imageInfo.exif.DateTime.description}</span>
                              </div>
                            )}
                            <div className="mt-2 pt-2 border-t border-muted-foreground/20 text-[10px] text-muted-foreground space-y-1">
                              {Object.entries(imageInfo.exif).map(([key, val]: [string, any]) => (
                                <div key={key} className="flex justify-between gap-2 border-b border-muted/30 pb-1 last:border-0">
                                  <span className="text-primary/70 shrink-0">{key}:</span>
                                  <span className="truncate text-right">{val.description || (typeof val.value === 'object' ? JSON.stringify(val.value) : val.value)}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <p className="text-muted-foreground italic text-center py-4">No EXIF data detected or format not supported.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {cleanedImage ? (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                Metadata Successfully Stripped
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 gap-1">
                      <MapPin className="h-3 w-3" /> GPS Location Removed
                    </Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 gap-1">
                      <Camera className="h-3 w-3" /> Device Info Stripped
                    </Badge>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 gap-1">
                      <Shield className="h-3 w-3" /> 100% Private
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Your image has been re-encoded. All GPS, camera settings, and private timestamps have been completely removed. It is now safe to share.
                  </p>
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-md border border-green-200 dark:border-green-900/50 mb-4">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Everything Cleaned
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                      The tool has stripped all embedded info. The new file is a clean slate.
                    </p>
                  </div>
                  <Button onClick={downloadImage} data-testid="button-download" size="lg" className="w-full md:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Download Clean Image
                  </Button>
                </div>
                <div className="w-40 h-40 bg-muted rounded-lg overflow-hidden flex items-center justify-center border">
                  <img src={cleanedImage} alt="Cleaned" className="max-w-full max-h-full object-contain" />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (isProcessing && image ? (
          <Card className="animate-pulse">
            <CardContent className="py-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-20 w-full rounded-md" />
                  <Skeleton className="h-10 w-40" />
                </div>
                <Skeleton className="w-40 h-40 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ) : null)}

        <LongTailPagesSection toolId="image-exif-remover" />

        <div className="mt-8 pt-8 border-t space-y-4">
          <Breadcrumb
            items={[
              { label: "Home", url: "/" },
              { label: "Tools", url: "/tools" },
              { label: "Image Tools", url: "/tools/image" },
              { label: "EXIF Remover" },
            ]}
          />
          {/* Category Footer */}
          <p className="text-center text-sm text-muted-foreground pt-4 border-t">
            Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
          </p>
        </div>
      </div>
    </ToolLayout>
    </>
  );
}
