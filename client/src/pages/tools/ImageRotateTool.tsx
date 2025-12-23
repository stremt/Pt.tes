import { Link } from "wouter";
import { useState, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { RotateCw, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function ImageRotateTool() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [rotation, setRotation] = useState<string>("90");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Image Rotate | Rotate Photos 90°/180°/270°",
    description: "Rotate images left or right using canvas.",
    keywords: "rotate image online, rotate photo tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-rotate-tool",
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
        applyRotation(img, parseInt(rotation));
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const applyRotation = (img: HTMLImageElement, degrees: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const radians = (degrees * Math.PI) / 180;
    
    if (degrees === 90 || degrees === 270) {
      canvas.width = img.height;
      canvas.height = img.width;
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    if (degrees === 90) {
      ctx.translate(canvas.width, 0);
    } else if (degrees === 180) {
      ctx.translate(canvas.width, canvas.height);
    } else if (degrees === 270) {
      ctx.translate(0, canvas.height);
    }
    
    ctx.rotate(radians);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
  };

  const handleRotationChange = (value: string) => {
    setRotation(value);
    if (imageRef.current?.complete && imageUrl) {
      applyRotation(imageRef.current, parseInt(value));
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
        link.download = `rotated-${rotation}-${fileName || "image.png"}`;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Downloaded!",
          description: "Rotated image saved",
        });
      }
    });
  };

  const howItWorks = [
    { step: 1, title: "Upload Image", description: "Select an image from your device" },
    { step: 2, title: "Choose Rotation", description: "Select 90°, 180°, or 270° rotation" },
    { step: 3, title: "Download", description: "Save the rotated image" },
  ];

  const benefits = [
    { icon: <RotateCw className="h-5 w-5" />, title: "Multiple Angles", description: "Rotate by 90°, 180°, or 270°" },
    { icon: <Upload className="h-5 w-5" />, title: "Offline", description: "Process images in your browser" },
    { icon: <Download className="h-5 w-5" />, title: "Fast", description: "Instant preview and download" },
  ];

  const faqs = [
    {
      question: "What rotation angles are supported?",
      answer: "You can rotate images by 90°, 180°, or 270° clockwise.",
    },
    {
      question: "Can I rotate by custom angles?",
      answer: "This tool supports standard rotation angles (90°, 180°, 270°) for precise orientation correction.",
    },
    {
      question: "Is the image quality affected?",
      answer: "No, rotation is lossless and maintains the original image quality.",
    },
  ];

  return (
    <ToolLayout
      title="Image Rotate Tool"
      description="Rotate images left or right using canvas."
      icon={<RotateCw className="h-8 w-8" />}
      toolId="image-rotate-tool"
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
              <Label htmlFor="rotation" className="text-base font-semibold">
                Rotation Angle
              </Label>
              <Select value={rotation} onValueChange={handleRotationChange}>
                <SelectTrigger data-testid="select-rotation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90° Clockwise</SelectItem>
                  <SelectItem value="180">180°</SelectItem>
                  <SelectItem value="270">270° Clockwise (90° Counter)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto border rounded-lg mx-auto"
                data-testid="canvas-preview"
              />
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Original"
                className="hidden"
                onLoad={(e) => applyRotation(e.currentTarget, parseInt(rotation))}
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleDownload}
                size="lg"
                data-testid="button-download"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Rotated Image
              </Button>
              <Button
                onClick={() => {
                  setImageUrl("");
                  setFileName("");
                  setRotation("90");
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
