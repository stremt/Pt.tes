import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO } from "@/lib/seo";
import { Grid3x3, Upload, Download } from "lucide-react";
import { Link } from "wouter";

export default function ImagePixelator() {
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [pixelSize, setPixelSize] = useState([10]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useSEO({
    title: "Image Pixelator | Pixelate Photos Online | Pixocraft Tools",
    description: "Pixelate any image instantly using Canvas. No uploads.",
    keywords: "pixelate image, pixel effect generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-pixelator",
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
        pixelateImage(img, pixelSize[0]);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const pixelateImage = (img: HTMLImageElement, size: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    tempCanvas.width = Math.ceil(img.width / size);
    tempCanvas.height = Math.ceil(img.height / size);

    tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);
  };

  const handlePixelChange = (value: number[]) => {
    setPixelSize(value);
    if (originalImage) {
      pixelateImage(originalImage, value[0]);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pixelated-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <>
      <div className="mb-8 max-w-4xl mx-auto px-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Color Tools", url: "/tools/color" },
            { label: "Image Pixelator" },
          ]}
        />
      </div>
      <ToolLayout
        title="Image Pixelator"
        description="Upload image → apply pixel effect → download."
        icon={<Grid3x3 className="h-10 w-10 text-primary" />}
        toolId="image-pixelator"
        category="color"
      howItWorks={[
        { step: 1, title: "Upload Image", description: "Select any image from your device." },
        { step: 2, title: "Adjust Pixels", description: "Use slider to control pixelation level." },
        { step: 3, title: "Download", description: "Save your pixelated image." },
      ]}
      benefits={[
        { icon: <Grid3x3 className="h-6 w-6 text-primary" />, title: "Pixel Effect", description: "Create retro pixel art style." },
      ]}
      faqs={[
        { question: "Can I control the pixel size?", answer: "Yes! Use the slider to adjust from subtle to heavily pixelated." },
        { question: "Is the original image kept?", answer: "Yes, your original image is never modified - only the preview changes." },
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
                  <Label>Pixel Size: {pixelSize[0]}</Label>
                  <Slider
                    value={pixelSize}
                    onValueChange={handlePixelChange}
                    min={2}
                    max={50}
                    step={1}
                    className="mt-2"
                    data-testid="slider-pixel-size"
                  />
                </div>
                <Button onClick={downloadImage} data-testid="button-download">
                  <Download className="h-4 w-4 mr-2" />
                  Download Pixelated Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {image && (
          <Card>
            <CardHeader>
              <CardTitle>Pixelated Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <canvas ref={canvasRef} className="max-w-full h-auto border rounded" data-testid="canvas-preview" />
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
