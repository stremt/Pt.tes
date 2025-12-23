import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Image as ImageIcon } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";

export default function Base64ToImage() {
  useSEO({
    title: "Base64 to Image Converter | Decode Instantly",
    description: "Paste Base64 code and download the decoded image in one click. Works offline and secure.",
    keywords: "base64 to image, decode base64, base64 converter online, base64 decoder",
    canonicalUrl: "https://tools.pixocraft.in/tools/base64-to-image",
  });

  const [base64Input, setBase64Input] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();

  const handleConvert = () => {
    try {
      let base64 = base64Input.trim();
      
      if (!base64) {
        toast({
          title: "Error",
          description: "Please enter Base64 code",
          variant: "destructive",
        });
        return;
      }

      if (!base64.startsWith("data:")) {
        base64 = `data:image/png;base64,${base64}`;
      }

      setImageUrl(base64);
      toast({ title: "Success!", description: "Image decoded successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 code",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "decoded-image.png";
    link.click();
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Base64 to Image Converter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Paste Base64 and convert it back to JPG/PNG instantly. Offline, secure and extremely fast.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Base64 Input</CardTitle>
              <CardDescription>Paste your Base64 encoded image string</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                placeholder="data:image/png;base64,iVBORw0KG..."
                className="font-mono text-xs h-48 resize-none"
                data-testid="textarea-input"
              />
              <Button onClick={handleConvert} className="w-full" data-testid="button-convert">
                <ImageIcon className="mr-2 h-5 w-5" />
                Convert to Image
              </Button>
            </CardContent>
          </Card>

          {imageUrl && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 gap-4">
                <div>
                  <CardTitle>Decoded Image</CardTitle>
                  <CardDescription>Preview and download your image</CardDescription>
                </div>
                <Button onClick={handleDownload} data-testid="button-download">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-muted flex items-center justify-center min-h-64">
                  <img
                    src={imageUrl}
                    alt="Decoded"
                    className="max-w-full max-h-96 object-contain"
                    data-testid="img-preview"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Secure & Offline</h3>
                <p className="text-muted-foreground">
                  All decoding happens in your browser. Your data never leaves your device.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Instant Conversion</h3>
                <p className="text-muted-foreground">
                  Paste Base64 code and decode it to a downloadable image in one click.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
