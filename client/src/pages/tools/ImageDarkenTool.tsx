import { useState, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { SunDim, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

export default function ImageDarkenTool() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [darkenLevel, setDarkenLevel] = useState<number[]>([50]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Darken Image | Adjust Image Darkness",
    description: "Darken photos using canvas filters. Offline and fast.",
    keywords: "darken image tool, photo darkener",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-darken-tool",
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
        applyDarken(img, darkenLevel[0]);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const applyDarken = (img: HTMLImageElement, level: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const brightnessValue = 100 - level;
    ctx.filter = `brightness(${brightnessValue}%)`;
    ctx.drawImage(img, 0, 0);
  };

  const handleSliderChange = (value: number[]) => {
    setDarkenLevel(value);
    if (imageRef.current?.complete && imageUrl) {
      applyDarken(imageRef.current, value[0]);
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
        link.download = `darkened-${fileName || "image.png"}`;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Downloaded!",
          description: "Darkened image saved",
        });
      }
    });
  };

  const howItWorks = [
    { step: 1, title: "Upload Image", description: "Select an image from your device" },
    { step: 2, title: "Adjust Darkness", description: "Use the slider to control the darken level" },
    { step: 3, title: "Download", description: "Save the darkened image" },
  ];

  const benefits = [
    { icon: <SunDim className="h-5 w-5" />, title: "Adjustable", description: "Control the exact darkness level" },
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
      answer: "No, your original image is never modified. You download a new darkened version.",
    },
    {
      question: "Can I adjust the darkness level?",
      answer: "Yes, use the slider to control how much you want to darken the image.",
    },
  ];

  return (
    <ToolLayout
      title="Image Darken Tool"
      description="Darken photos using canvas filters. Offline and fast."
      icon={<SunDim className="h-8 w-8" />}
      toolId="image-darken-tool"
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
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Darken Level: {darkenLevel[0]}%
              </Label>
              <Slider
                value={darkenLevel}
                onValueChange={handleSliderChange}
                max={100}
                step={1}
                data-testid="slider-darken"
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
                onLoad={(e) => applyDarken(e.currentTarget, darkenLevel[0])}
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleDownload}
                size="lg"
                data-testid="button-download"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Darkened Image
              </Button>
              <Button
                onClick={() => {
                  setImageUrl("");
                  setFileName("");
                  setDarkenLevel([50]);
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
