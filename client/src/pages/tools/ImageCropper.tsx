import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, X } from "lucide-react";
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

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
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
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
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Image Cropper</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crop your images instantly with a simple drag tool. Secure, offline & perfect for creators.
          </p>
        </div>

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
                    <span className="text-sm font-medium">{fileName}</span>
                    <Button variant="ghost" size="sm" onClick={clear} data-testid="button-clear">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="border rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    <canvas ref={canvasRef} className="max-w-full" data-testid="canvas-preview" />
                  </div>
                  <Button onClick={handleDownload} className="w-full" data-testid="button-download">
                    <Download className="mr-2 h-4 w-4" />
                    Download Cropped Image
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
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
                <h3 className="font-semibold mb-2">Fast & Simple</h3>
                <p className="text-muted-foreground">
                  Upload, crop, and download your image instantly without any complicated tools.
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
    </div>
  );
}
