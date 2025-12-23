import { Link } from "wouter";
import { useState, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Image as ImageIcon, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ImageGrayscaleTool() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Grayscale Image Converter | Black & White Photo",
    description: "Convert images to grayscale (black & white).",
    keywords: "grayscale image, black white converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-grayscale-tool",
  });

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
        applyGrayscale(img);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const applyGrayscale = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.filter = "grayscale(100%)";
    ctx.drawImage(img, 0, 0);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `grayscale-${fileName || "image.png"}`;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Downloaded!",
          description: "Grayscale image saved",
        });
      }
    });
  };

  const howItWorks = [
    { step: 1, title: "Upload Image", description: "Select an image from your device" },
    { step: 2, title: "Auto Convert", description: "Image is automatically converted to grayscale" },
    { step: 3, title: "Download", description: "Save the black & white image" },
  ];

  const benefits = [
    { icon: <ImageIcon className="h-5 w-5" />, title: "Classic Look", description: "Convert to timeless black & white" },
    { icon: <Upload className="h-5 w-5" />, title: "Offline", description: "Process images in your browser" },
    { icon: <Download className="h-5 w-5" />, title: "Fast", description: "Instant preview and download" },
  ];

  const faqs = [
    {
      question: "What is grayscale?",
      answer: "Grayscale converts a color image to black and white by removing all color information and keeping only brightness values.",
    },
    {
      question: "What formats are supported?",
      answer: "JPG, PNG, WebP, and other common image formats are supported.",
    },
    {
      question: "Can I adjust the grayscale level?",
      answer: "This tool applies 100% grayscale conversion for a pure black & white effect.",
    },
  ];

  return (
    <ToolLayout
      title="Image Grayscale Tool"
      description="Convert images to grayscale (black & white)."
      icon={<ImageIcon className="h-8 w-8" />}
      toolId="image-grayscale-tool"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
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
            <div className="grid grid-cols-1 gap-4">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto border rounded-lg"
                data-testid="canvas-preview"
              />
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Original"
                className="hidden"
                onLoad={(e) => applyGrayscale(e.currentTarget)}
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleDownload}
                size="lg"
                data-testid="button-download"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Grayscale Image
              </Button>
              <Button
                onClick={() => {
                  setImageUrl("");
                  setFileName("");
                }}
                variant="outline"
                data-testid="button-clear"
              >
                Upload New Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
