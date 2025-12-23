import { Link } from "wouter";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Image as ImageIcon, Upload, Download } from "lucide-react";

export default function ImageBlurTool() {
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [blurAmount, setBlurAmount] = useState([5]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useSEO({
    title: "Image Blur Tool | Blur Photos Online | Pixocraft Tools",
    description: "Apply blur effect to images instantly. Canvas-based, 100% offline.",
    keywords: "blur image tool, photo blur online",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-blur-tool",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        setImage(event.target?.result as string);
        blurImage(img, blurAmount[0]);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const blurImage = (img: HTMLImageElement, blur: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.filter = `blur(${blur}px)`;
    ctx.drawImage(img, 0, 0);
  };

  const handleBlurChange = (value: number[]) => {
    setBlurAmount(value);
    if (originalImage) {
      blurImage(originalImage, value[0]);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'blurred-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <ToolLayout
      title="Image Blur Tool"
      description="Upload → blur → download."
      icon={<ImageIcon className="h-10 w-10 text-primary" />}
      toolId="image-blur-tool"
      category="Image & Design"
      howItWorks={[
        { step: 1, title: "Upload Image", description: "Choose any image file." },
        { step: 2, title: "Adjust Blur", description: "Use slider to control blur intensity." },
        { step: 3, title: "Download", description: "Save your blurred image." },
      ]}
      benefits={[
        { icon: <ImageIcon className="h-6 w-6 text-primary" />, title: "Blur Effect", description: "Add professional blur to images." },
      ]}
      faqs={[
        { question: "Can I control blur intensity?", answer: "Yes! Slider ranges from 0 (no blur) to 20 (heavy blur)." },
        { question: "Is it truly offline?", answer: "Yes, all processing happens in your browser using HTML5 Canvas." },
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
              <div className="space-y-4">
                <div>
                  <Label>Blur Amount: {blurAmount[0]}px</Label>
                  <Slider
                    value={blurAmount}
                    onValueChange={handleBlurChange}
                    min={0}
                    max={20}
                    step={1}
                    className="mt-2"
                    data-testid="slider-blur"
                  />
                </div>
                <Button onClick={downloadImage} data-testid="button-download">
                  <Download className="h-4 w-4 mr-2" />
                  Download Blurred Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {image && (
          <Card>
            <CardHeader>
              <CardTitle>Blurred Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <canvas ref={canvasRef} className="max-w-full h-auto border rounded" data-testid="canvas-preview" />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Category Footer */}
      <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
        Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
      </p>
    </ToolLayout>
  );
}
