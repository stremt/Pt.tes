import { Link } from "wouter";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Upload, Download, X, Crop as CropIcon } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";

export default function ImageCropper() {
  useSEO({
    title: "Image Cropper Online | Crop Images Instantly (Offline)",
    description: "Crop images in your browser. No upload, no server — fully private and fast.",
    keywords: "image cropper, crop image online, photo crop tool, image crop",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-cropper",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(100);
  const [cropHeight, setCropHeight] = useState(100);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  // Enforce bounds: ensure crop region never exceeds image dimensions
  useEffect(() => {
    if (imageWidth > 0 && cropX + cropWidth > imageWidth) {
      setCropWidth(Math.max(10, imageWidth - cropX));
    }
  }, [cropX, imageWidth]);

  useEffect(() => {
    if (imageHeight > 0 && cropY + cropHeight > imageHeight) {
      setCropHeight(Math.max(10, imageHeight - cropY));
    }
  }, [cropY, imageHeight]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageUrl(result);
      setFileName(file.name);
      
      const img = new Image();
      img.onload = () => {
        setImageWidth(img.width);
        setImageHeight(img.height);
        setCropX(0);
        setCropY(0);
        setCropWidth(Math.min(img.width, 300));
        setCropHeight(Math.min(img.height, 300));
        drawCanvas(img, 0, 0, Math.min(img.width, 300), Math.min(img.height, 300));
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const drawCanvas = (img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Clamp values to ensure valid crop region
    const clampedX = Math.max(0, Math.min(x, img.width - w));
    const clampedY = Math.max(0, Math.min(y, img.height - h));
    const clampedW = Math.min(w, img.width - clampedX);
    const clampedH = Math.min(h, img.height - clampedY);
    
    canvas.width = clampedW;
    canvas.height = clampedH;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, clampedX, clampedY, clampedW, clampedH, 0, 0, clampedW, clampedH);
    }
  };

  useEffect(() => {
    if (imageUrl && imageRef.current?.complete) {
      drawCanvas(imageRef.current, cropX, cropY, cropWidth, cropHeight);
    }
  }, [cropX, cropY, cropWidth, cropHeight, imageUrl]);

  const handleCrop = () => {
    if (!imageRef.current) return;
    drawCanvas(imageRef.current, cropX, cropY, cropWidth, cropHeight);
    toast({ title: "Cropped!", description: "Image cropped successfully. Download to save." });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cropped-${fileName || "image.png"}`;
        link.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const clear = () => {
    setImageUrl("");
    setFileName("");
    setCropX(0);
    setCropY(0);
    setCropWidth(100);
    setCropHeight(100);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Image Cropper</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crop your images instantly with adjustable controls. Secure, offline & perfect for creators.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>Select an image to crop</CardDescription>
              </CardHeader>
              <CardContent>
                {!imageUrl ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover-elevate active-elevate-2 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, WebP</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                      data-testid="input-file"
                    />
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm font-medium" data-testid="text-filename">{fileName}</span>
                      <Button variant="ghost" size="sm" onClick={clear} data-testid="button-clear">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <img
                      ref={imageRef}
                      src={imageUrl}
                      alt="Original"
                      className="hidden"
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        setImageWidth(img.width);
                        setImageHeight(img.height);
                        drawCanvas(img, cropX, cropY, cropWidth, cropHeight);
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {imageUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Crop Settings</CardTitle>
                  <CardDescription>Adjust crop area</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>X Position: {cropX}px</Label>
                    <Slider
                      value={[cropX]}
                      onValueChange={([v]) => setCropX(v)}
                      min={0}
                      max={Math.max(0, imageWidth - cropWidth)}
                      step={1}
                      data-testid="slider-cropx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y Position: {cropY}px</Label>
                    <Slider
                      value={[cropY]}
                      onValueChange={([v]) => setCropY(v)}
                      min={0}
                      max={Math.max(0, imageHeight - cropHeight)}
                      step={1}
                      data-testid="slider-cropy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Width: {cropWidth}px</Label>
                    <Slider
                      value={[cropWidth]}
                      onValueChange={([v]) => setCropWidth(v)}
                      min={10}
                      max={Math.max(10, imageWidth - cropX)}
                      step={1}
                      data-testid="slider-cropwidth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Height: {cropHeight}px</Label>
                    <Slider
                      value={[cropHeight]}
                      onValueChange={([v]) => setCropHeight(v)}
                      min={10}
                      max={Math.max(10, imageHeight - cropY)}
                      step={1}
                      data-testid="slider-cropheight"
                    />
                  </div>
                  <Button onClick={handleCrop} className="w-full" data-testid="button-crop">
                    <CropIcon className="mr-2 h-4 w-4" />
                    Apply Crop
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {imageUrl && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 gap-4">
                <div>
                  <CardTitle>Cropped Preview</CardTitle>
                  <CardDescription>Preview and download</CardDescription>
                </div>
                <Button onClick={handleDownload} data-testid="button-download">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden bg-muted flex items-center justify-center p-4">
                  <canvas ref={canvasRef} className="max-w-full" data-testid="canvas-preview" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">100% Private</h3>
              <p className="text-muted-foreground">
                All image processing happens in your browser. Nothing is uploaded to any server.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Precise Control</h3>
              <p className="text-muted-foreground">
                Adjust crop position and dimensions with pixel-perfect precision using sliders.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No File Size Limits</h3>
              <p className="text-muted-foreground">
                Crop images of any size since everything happens locally on your device.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
