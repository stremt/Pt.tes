import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { FileX, Upload, Download, Shield, Info, Image as ImageIcon, MapPin, Calendar, Camera } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";
import ExifReader from 'exifreader';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

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
        setImageInfo({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
          type: file.type,
          dimensions: 'Calculating...',
          exif: tags
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
    link.download = `cleaned_${imageInfo?.name || 'image.png'}`;
    link.href = cleanedImage;
    link.click();
  };

  return (
    <>
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Tools", url: "/tools/image" },
            { label: "EXIF Remover" },
          ]}
        />
      </div>
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
              <div className="mt-8 pt-8 border-t flex flex-col md:flex-row gap-8 text-left">
                <div className="flex-1">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Original Preview
                  </h3>
                  <img src={image} alt="Original" className="w-full h-auto max-h-[400px] rounded-lg object-contain bg-muted" data-testid="image-preview" />
                </div>
                
                {imageInfo && (
                  <div className="w-full md:w-80 space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Image Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">Dimensions</span>
                        <span className="font-mono">{imageInfo.dimensions}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">File Size</span>
                        <span className="font-mono">{imageInfo.size}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">Format</span>
                        <span className="font-mono uppercase">{imageInfo.type.split('/')[1]}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold mt-6 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Detected EXIF Data
                    </h3>
                    <div className="space-y-2 text-xs font-mono bg-muted/50 p-3 rounded-md overflow-hidden max-h-[200px] overflow-y-auto">
                      {imageInfo.exif && Object.keys(imageInfo.exif).length > 0 ? (
                        <>
                          {imageInfo.exif.GPSLatitude && (
                            <div className="flex items-center gap-2 text-destructive mb-1">
                              <MapPin className="h-3 w-3" />
                              <span>GPS Location Found</span>
                            </div>
                          )}
                          {imageInfo.exif.Make && (
                            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                              <Camera className="h-3 w-3" />
                              <span>{imageInfo.exif.Make.description} {imageInfo.exif.Model?.description}</span>
                            </div>
                          )}
                          {imageInfo.exif.DateTime && (
                            <div className="flex items-center gap-2 text-primary mb-1">
                              <Calendar className="h-3 w-3" />
                              <span>{imageInfo.exif.DateTime.description}</span>
                            </div>
                          )}
                          <div className="mt-2 pt-2 border-t border-muted-foreground/20 text-[10px] text-muted-foreground">
                            {Object.entries(imageInfo.exif).slice(0, 10).map(([key, val]: [string, any]) => (
                              <div key={key} className="truncate">
                                <span className="text-primary/70">{key}:</span> {val.description || val.value}
                              </div>
                            ))}
                            {Object.keys(imageInfo.exif).length > 10 && <div className="italic">...and more</div>}
                          </div>
                        </>
                      ) : (
                        <p className="text-muted-foreground italic">No EXIF data detected or format not supported.</p>
                      )}
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

        <div className="prose prose-slate dark:prose-invert max-w-none mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold">Understanding EXIF Data</h2>
            <p>
              Every time you take a photo with a digital camera or smartphone, a hidden layer of information is stored within the file. This is known as EXIF (Exchangeable Image File Format) data. While it serves a technical purpose by recording camera settings like ISO, aperture, and shutter speed, it also captures highly sensitive personal information.
            </p>
            <p>
              Most notably, digital images often include GPS coordinates that pin-point exactly where the photo was taken. When you share these photos online, you aren't just sharing an image; you are sharing a digital map to your location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Why EXIF Data is a Privacy Risk</h2>
            <p>
              Privacy is more than just keeping a secret; it is about controlling your personal information. EXIF metadata can be exploited by third parties to track your movements or identify your home and work addresses. For example, a photo of a product you are selling online could reveal your exact front door to a total stranger.
            </p>
            <p>
              Beyond location, metadata also includes device signatures. This info tells people exactly what kind of phone or camera you use, which can be used for targeted social engineering or even identifying your lifestyle habits based on the gear you own.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Who Should Use an EXIF Remover?</h2>
            <p>
              In today's connected world, everyone can benefit from stripping metadata from their photos, but certain groups find it essential:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Social Media Users:</strong> Protect your home and family's location before posting on Instagram, Facebook, or X.</li>
              <li><strong>Photographers:</strong> Maintain professional control over your proprietary camera settings and technical secrets.</li>
              <li><strong>Journalists & Activists:</strong> Safeguard your sources and your own physical safety when reporting from sensitive locations.</li>
              <li><strong>Businesses:</strong> Prevent competitors from analyzing your production facilities or identifying specific equipment used in your operations.</li>
              <li><strong>Everyday Users:</strong> Ensure that your private life stays private whenever you send a photo via email or messaging apps.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Real-Life Use Cases for Metadata Removal</h2>
            <p>
              There are several common scenarios where using an EXIF remover is a crucial step:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Selling Online:</strong> When listing items on marketplaces, strip the metadata so buyers only see the product, not your home location.</li>
              <li><strong>Sharing Travel Photos:</strong> Post your vacation highlights without alerting the world to exactly which hotel or private villa you are staying in.</li>
              <li><strong>Professional Delivery:</strong> Send clean images to clients to maintain a professional standard and protect your workflow details.</li>
              <li><strong>Public Forums:</strong> Upload images to community boards without leaving a trail of your personal device history.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">A Privacy-First Metadata Tool</h2>
            <p>
              Our EXIF remover is designed with a "Privacy-First" philosophy. Unlike traditional online tools, our processor runs entirely within your web browser. This means your images are never uploaded to our servers, and we never see or store your data.
            </p>
            <p>
              You maintain 100% control over your files. The process is instantaneous, secure, and completely free. By stripping the invisible metadata, we give you the confidence to share your visual stories without compromising your personal security.
            </p>
          </section>

          <section className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Related Tools:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none p-0 m-0">
              <li><Link href="/tools/image-resizer" className="text-primary hover:underline">Image Resizer</Link></li>
              <li><Link href="/tools/background-remover" className="text-primary hover:underline">Background Remover</Link></li>
              <li><Link href="/tools/image-upscaler" className="text-primary hover:underline">Image Upscaler</Link></li>
              <li><Link href="/tools/png-to-jpg" className="text-primary hover:underline">PNG to JPG Converter</Link></li>
              <li><Link href="/tools/image-to-pdf" className="text-primary hover:underline">Image to PDF</Link></li>
            </ul>
          </section>
        </div>

      </div>
      {/* Category Footer */}
      <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
        Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
      </p>
    </ToolLayout>
    </>
  );
}
