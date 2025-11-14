import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FileImage, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function FaviconGenerator() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [favicon16, setFavicon16] = useState<string>("");
  const [favicon32, setFavicon32] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Favicon Generator Online | Create 16x16 / 32x32 Icons Instantly | Pixocraft Tools",
    description: "Upload any image and instantly generate favicon icons (.ico, 16x16, 32x32). Free, offline, fast and no server upload.",
    keywords: "favicon generator, create favicon, icon maker, favicon .ico generator, 16x16 icon, 32x32 icon",
    canonicalUrl: "https://tools.pixocraft.in/tools/favicon-generator",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setPreviewUrl(url);
        generateFavicons(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateFavicons = (imageUrl: string) => {
    const img = new Image();
    img.onload = () => {
      // Generate 16x16
      const canvas16 = document.createElement('canvas');
      canvas16.width = 16;
      canvas16.height = 16;
      const ctx16 = canvas16.getContext('2d');
      ctx16?.drawImage(img, 0, 0, 16, 16);
      setFavicon16(canvas16.toDataURL('image/png'));

      // Generate 32x32
      const canvas32 = document.createElement('canvas');
      canvas32.width = 32;
      canvas32.height = 32;
      const ctx32 = canvas32.getContext('2d');
      ctx32?.drawImage(img, 0, 0, 32, 32);
      setFavicon32(canvas32.toDataURL('image/png'));

      toast({
        title: "Favicons Generated!",
        description: "Your favicons are ready to download",
      });
    };
    img.src = imageUrl;
  };

  const downloadFavicon = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const howItWorks = [
    { step: 1, title: "Upload Image", description: "Select any image file from your device" },
    { step: 2, title: "Auto Generate", description: "Favicons are instantly created in 16x16 and 32x32 sizes" },
    { step: 3, title: "Download", description: "Download your favicons and use them on your website" },
  ];

  const benefits = [
    { icon: <Upload className="h-5 w-5" />, title: "Offline Processing", description: "100% privacy - images never leave your browser" },
    { icon: <FileImage className="h-5 w-5" />, title: "Multiple Sizes", description: "Generate 16x16 and 32x32 icons instantly" },
    { icon: <Download className="h-5 w-5" />, title: "Instant Download", description: "Download PNG format favicons immediately" },
  ];

  const faqs = [
    {
      question: "Does image upload to server?",
      answer: "No. Conversion happens offline in your browser. Your images never leave your device.",
    },
    {
      question: "What image formats are supported?",
      answer: "All common image formats including JPG, PNG, GIF, WebP, and SVG are supported.",
    },
    {
      question: "Can I generate .ico format?",
      answer: "Currently we generate PNG format favicons (16x16 and 32x32) which are widely supported by all modern browsers.",
    },
  ];

  return (
    <ToolLayout
      title="Favicon Generator"
      description="Upload any image and instantly generate favicon icons (.ico, 16x16, 32x32). Free, offline, fast and no server upload."
      icon={<FileImage className="h-8 w-8" />}
      toolId="favicon-generator"
      category="generator"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="image-upload" className="text-base font-semibold">
            Upload Image
          </Label>
          <div className="flex items-center gap-4">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              data-testid="input-image-upload"
            />
            <Button
              onClick={() => document.getElementById('image-upload')?.click()}
              size="lg"
              data-testid="button-upload-image"
            >
              <Upload className="mr-2 h-5 w-5" />
              Choose Image
            </Button>
            {selectedImage && (
              <span className="text-sm text-muted-foreground">{selectedImage.name}</span>
            )}
          </div>
        </div>

        {previewUrl && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Original Preview</h3>
                <div className="flex justify-center p-4 bg-muted rounded-lg">
                  <img src={previewUrl} alt="Original" className="max-w-full h-32 object-contain" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">16x16 Favicon</h3>
                <div className="flex justify-center p-4 bg-muted rounded-lg">
                  <img src={favicon16} alt="16x16 favicon" className="pixelated" data-testid="img-favicon-16" />
                </div>
                <Button
                  onClick={() => downloadFavicon(favicon16, 'favicon-16x16.png')}
                  variant="outline"
                  className="w-full"
                  data-testid="button-download-16"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download 16x16
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">32x32 Favicon</h3>
                <div className="flex justify-center p-4 bg-muted rounded-lg">
                  <img src={favicon32} alt="32x32 favicon" className="pixelated" data-testid="img-favicon-32" />
                </div>
                <Button
                  onClick={() => downloadFavicon(favicon32, 'favicon-32x32.png')}
                  variant="outline"
                  className="w-full"
                  data-testid="button-download-32"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download 32x32
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
