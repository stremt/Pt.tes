import { Link } from "wouter";
import { useState, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FlipHorizontal, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ImageMirrorTool() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Mirror Image | Flip Photo Horizontally",
    description: "Flip any image horizontally. Perfect for selfies and edits.",
    keywords: "mirror image, flip image tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-mirror-tool",
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
        applyMirror(img);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const applyMirror = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(-1, 1);
    ctx.drawImage(img, -img.width, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `mirrored-${fileName || "image.png"}`;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Downloaded!",
          description: "Mirrored image saved",
        });
      }
    });
  };

  const howItWorks = [
    { step: 1, title: "Upload Image", description: "Select an image from your device" },
    { step: 2, title: "Auto Mirror", description: "Image is automatically flipped horizontally" },
    { step: 3, title: "Download", description: "Save the mirrored image" },
  ];

  const benefits = [
    { icon: <FlipHorizontal className="h-5 w-5" />, title: "Instant Flip", description: "Automatically mirrors your image" },
    { icon: <Upload className="h-5 w-5" />, title: "Offline", description: "Process images in your browser" },
    { icon: <Download className="h-5 w-5" />, title: "Fast", description: "Instant preview and download" },
  ];

  const faqs = [
    {
      question: "What does mirroring do?",
      answer: "Mirroring flips an image horizontally, creating a mirror reflection of the original image.",
    },
    {
      question: "Can I flip vertically?",
      answer: "This tool flips horizontally. For vertical flipping, you can rotate the image 180 degrees.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all processing happens in your browser. No images are uploaded to any server.",
    },
  ];

  return (
    <ToolLayout
      title="Image Mirror Tool"
      description="Flip any image horizontally. Perfect for selfies and edits."
      icon={<FlipHorizontal className="h-8 w-8" />}
      toolId="image-mirror-tool"
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
                onLoad={(e) => applyMirror(e.currentTarget)}
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleDownload}
                size="lg"
                data-testid="button-download"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Mirrored Image
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
        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
        </p>
        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
        </p>
    </ToolLayout>
  );
}
