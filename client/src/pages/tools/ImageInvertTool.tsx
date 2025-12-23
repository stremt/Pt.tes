import { useState, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Contrast, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ImageInvertTool() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Invert Image Colors | Photo Inverter Tool",
    description: "Invert colors of any image using canvas filters.",
    keywords: "invert image tool, negative photo",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-invert-tool",
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
        applyInvert(img);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const applyInvert = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.filter = "invert(100%)";
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
        link.download = `inverted-${fileName || "image.png"}`;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Downloaded!",
          description: "Inverted image saved",
        });
      }
    });
  };

  const howItWorks = [
    { step: 1, title: "Upload Image", description: "Select an image from your device" },
    { step: 2, title: "Auto Invert", description: "Image colors are automatically inverted" },
    { step: 3, title: "Download", description: "Save the inverted image" },
  ];

  const benefits = [
    { icon: <Contrast className="h-5 w-5" />, title: "Color Inversion", description: "Create negative image effect instantly" },
    { icon: <Upload className="h-5 w-5" />, title: "Offline", description: "Process images in your browser" },
    { icon: <Download className="h-5 w-5" />, title: "Fast", description: "Instant preview and download" },
  ];

  const faqs = [
    {
      question: "What does color inversion do?",
      answer: "Color inversion creates a negative image by reversing all color values - light becomes dark and vice versa.",
    },
    {
      question: "What can I use this for?",
      answer: "Inverted images are useful for artistic effects, creating negative photos, or improving visibility in certain contexts.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all processing happens in your browser. No images are uploaded to any server.",
    },
  ];

  return (
    <ToolLayout
      title="Image Invert Tool"
      description="Invert colors of any image using canvas filters."
      icon={<Contrast className="h-8 w-8" />}
      toolId="image-invert-tool"
      category="image"
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
                onLoad={(e) => applyInvert(e.currentTarget)}
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleDownload}
                size="lg"
                data-testid="button-download"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Inverted Image
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
