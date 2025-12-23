import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { FileX, Upload, Download, Shield } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function ExifRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [cleanedImage, setCleanedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useSEO({
    title: "Remove EXIF Data - Image Metadata Removal Tool | Free",
    description: "Remove EXIF metadata from photos instantly. Strip GPS, camera settings, timestamps. Private, offline tool. Protect your location data safely.",
    keywords: "exif remover, remove metadata image, exif stripper, remove gps from photo, photo privacy tool, metadata removal, image privacy",
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
      title="Remove EXIF Data from Photos—Protect Your Location Privacy"
      description="Upload photo → strip metadata → download clean image. Remove GPS, camera settings, timestamps."
      icon={<FileX className="h-10 w-10 text-primary" />}
      toolId="exif-remover"
      category="Privacy & Security"
      howItWorks={[
        { step: 1, title: "Upload Image", description: "Select any photo with EXIF data from your device." },
        { step: 2, title: "Auto Remove", description: "EXIF metadata (location, camera, date) is stripped automatically." },
        { step: 3, title: "Download Clean", description: "Get image without any embedded metadata or location data." },
      ]}
      benefits={[
        { icon: <Shield className="h-6 w-6 text-primary" />, title: "Location Privacy", description: "Remove GPS coordinates that reveal where photos were taken." },
        { icon: <FileX className="h-6 w-6 text-primary" />, title: "Complete Metadata Removal", description: "Strip camera model, timestamps, and device information." },
      ]}
      faqs={[
        { question: "What information is in EXIF data?", answer: "EXIF contains GPS coordinates (exact location), camera model, settings, date & time taken, phone model, and drone flight data—essentially a complete history of when and where photos were taken." },
        { question: "Why is EXIF privacy important?", answer: "EXIF data can reveal home locations in real estate photos, business facility locations, travel patterns, and even enable stalking. Removing it protects you when sharing photos online." },
        { question: "When should I remove EXIF?", answer: "Always before selling items online, sharing travel photos, posting to social media, protecting business operations, or sharing professional photography. Privacy-conscious users remove it from all photos." },
        { question: "Does removing EXIF reduce image quality?", answer: "No quality loss. The image is re-encoded as PNG with identical visual quality. Only the invisible metadata is removed." },
        { question: "Is my photo data secure?", answer: "Yes. All processing happens locally in your browser. Your photos never leave your device or are uploaded to any server." },
        { question: "Can I remove EXIF from multiple photos?", answer: "Currently this processes one photo at a time. Process multiple photos by uploading and downloading them individually." },
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

        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8 pt-6 border-t">
          Category: <a href="/tools/privacy" className="text-primary hover:text-primary/80 transition-colors">Privacy Tools</a>
        </p>
      </div>
    </ToolLayout>
  );
}
