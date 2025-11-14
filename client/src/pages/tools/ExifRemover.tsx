import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { FileX, Upload, Download, Shield } from "lucide-react";

export default function ExifRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [cleanedImage, setCleanedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useSEO({
    title: "Image EXIF Remover | Remove Photo Metadata | Pixocraft Tools",
    description: "Remove EXIF metadata from images using offline canvas method.",
    keywords: "exif remover, remove metadata image",
    canonicalUrl: "https://tools.pixocraft.in/tools/exif-remover",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(event.target?.result as string);
        removeExif(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeExif = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const cleanDataUrl = canvas.toDataURL('image/png');
    setCleanedImage(cleanDataUrl);
  };

  const downloadImage = () => {
    if (!cleanedImage) return;

    const link = document.createElement('a');
    link.download = 'no-exif-image.png';
    link.href = cleanedImage;
    link.click();
  };

  return (
    <ToolLayout
      title="Image EXIF Remover"
      description="Upload → remove metadata → download clean image."
      icon={<FileX className="h-10 w-10 text-primary" />}
      toolId="exif-remover"
      category="Privacy & Security"
      howItWorks={[
        { step: 1, title: "Upload Image", description: "Select any photo with EXIF data." },
        { step: 2, title: "Auto Remove", description: "EXIF metadata is stripped automatically." },
        { step: 3, title: "Download Clean", description: "Get image without location or camera data." },
      ]}
      benefits={[
        { icon: <Shield className="h-6 w-6 text-primary" />, title: "Privacy Protection", description: "Remove sensitive location data." },
        { icon: <FileX className="h-6 w-6 text-primary" />, title: "Metadata Removal", description: "Strip all EXIF information." },
      ]}
      faqs={[
        { question: "What is EXIF data?", answer: "EXIF contains camera settings, date, time, and sometimes GPS location embedded in photos." },
        { question: "Why remove EXIF?", answer: "For privacy - EXIF can reveal where and when photos were taken." },
        { question: "Does it reduce image quality?", answer: "Minimal impact - the image is re-encoded as PNG without metadata." },
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
              <div className="mt-4">
                <img src={image} alt="Original" className="max-w-full h-auto max-h-[400px] rounded-lg" data-testid="image-preview" />
              </div>
            )}
          </CardContent>
        </Card>

        {cleanedImage && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                EXIF Data Removed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Your image is now clean and ready to download without any metadata.
                </p>
                <Button onClick={downloadImage} data-testid="button-download">
                  <Download className="h-4 w-4 mr-2" />
                  Download Clean Image
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
