import { useState, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Sun, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

export default function ImageLightenTool() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [lightenLevel, setLightenLevel] = useState<number[]>([150]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Lighten Image | Increase Image Brightness",
    description: "Increase brightness of images using canvas.",
    keywords: "lighten image, brighten photo tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-lighten-tool",
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
        applyLighten(img, lightenLevel[0]);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const applyLighten = (img: HTMLImageElement, level: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.filter = `brightness(${level}%)`;
    ctx.drawImage(img, 0, 0);
  };

  const handleSliderChange = (value: number[]) => {
    setLightenLevel(value);
    if (imageRef.current?.complete && imageUrl) {
      applyLighten(imageRef.current, value[0]);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `lightened-${fileName || "image.png"}`;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Downloaded!",
          description: "Lightened image saved",
        });
      }
    });
  };

  const howItWorks = [
    { step: 1, title: "Upload Image", description: "Select an image from your device" },
    { step: 2, title: "Adjust Brightness", description: "Use the slider to control the brightness level" },
    { step: 3, title: "Download", description: "Save the lightened image" },
  ];

  const benefits = [
    { icon: <Sun className="h-5 w-5" />, title: "Adjustable", description: "Control the exact brightness level" },
    { icon: <Upload className="h-5 w-5" />, title: "Offline", description: "Process images in your browser" },
    { icon: <Download className="h-5 w-5" />, title: "Fast", description: "Instant preview and download" },
  ];

  const faqs = [
    {
      question: "What image formats are supported?",
      answer: "JPG, PNG, WebP, and other common image formats are supported.",
    },
    {
      question: "Is the original image modified?",
      answer: "No, your original image is never modified. You download a new lightened version.",
    },
    {
      question: "Can I adjust the brightness level?",
      answer: "Yes, use the slider to control how much you want to lighten the image (100-200%).",
    },
  ];

  return (
    <ToolLayout
      title="Image Lighten Tool"
      description="Increase brightness of images using canvas."
      icon={<Sun className="h-8 w-8" />}
      toolId="image-lighten-tool"
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
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Brightness Level: {lightenLevel[0]}%
              </Label>
              <Slider
                value={lightenLevel}
                onValueChange={handleSliderChange}
                min={100}
                max={200}
                step={1}
                data-testid="slider-lighten"
              />
            </div>

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
                onLoad={(e) => applyLighten(e.currentTarget, lightenLevel[0])}
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleDownload}
                size="lg"
                data-testid="button-download"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Lightened Image
              </Button>
              <Button
                onClick={() => {
                  setImageUrl("");
                  setFileName("");
                  setLightenLevel([150]);
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
