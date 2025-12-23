import { Link } from "wouter";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Pipette, Upload, Copy } from "lucide-react";

export default function DominantColorFinder() {
  const [image, setImage] = useState<string | null>(null);
  const [dominantColor, setDominantColor] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Dominant Color Finder | Extract Image Colors | Pixocraft Tools",
    description: "Upload image → detect its dominant color instantly. Fully offline.",
    keywords: "dominant color tool, extract image color",
    canonicalUrl: "https://tools.pixocraft.in/tools/dominant-color-finder",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(event.target?.result as string);
        findDominantColor(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const findDominantColor = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let r = 0, g = 0, b = 0;
    const pixelCount = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    setDominantColor(hex);
  };

  return (
    <ToolLayout
      title="Dominant Color Finder"
      description="Upload any image → extract dominant color with HEX code."
      icon={<Pipette className="h-10 w-10 text-primary" />}
      toolId="dominant-color-finder"
      category="Image & Design"
      howItWorks={[
        { step: 1, title: "Upload Image", description: "Select any JPG, PNG, or WebP image." },
        { step: 2, title: "Auto Detect", description: "Tool analyzes and finds dominant color." },
        { step: 3, title: "Copy HEX", description: "Use the color code in your designs." },
      ]}
      benefits={[
        { icon: <Pipette className="h-6 w-6 text-primary" />, title: "Color Extraction", description: "Find the main color from any image." },
      ]}
      faqs={[
        { question: "How is dominant color calculated?", answer: "It averages all pixel colors in the image to find the most prominent hue." },
        { question: "What image formats are supported?", answer: "JPG, PNG, WebP, and most common image formats." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <canvas ref={canvasRef} className="hidden" />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          data-testid="input-file"
        />

        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => fileInputRef.current?.click()} data-testid="button-upload">
              <Upload className="h-4 w-4 mr-2" />
              Choose Image
            </Button>

            {image && (
              <div className="mt-4">
                <img src={image} alt="Uploaded" className="max-w-full h-auto max-h-[400px] rounded-lg" data-testid="image-preview" />
              </div>
            )}
          </CardContent>
        </Card>

        {dominantColor && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Dominant Color</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(dominantColor, "Color copied!")}
                  data-testid="button-copy"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy HEX
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div
                  className="w-32 h-32 rounded-lg border-2 border-border"
                  style={{ backgroundColor: dominantColor }}
                  data-testid="color-preview"
                />
                <div>
                  <p className="text-3xl font-mono font-bold" data-testid="color-hex">{dominantColor}</p>
                  <p className="text-muted-foreground mt-2">Click copy to use this color</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
