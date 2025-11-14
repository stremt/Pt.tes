import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Copy, Check, X } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";

export default function ImageToBase64() {
  useSEO({
    title: "Image to Base64 Converter Online | Convert Images Instantly",
    description: "Convert JPG, PNG or WebP images to Base64 instantly. Fast, offline, secure and works on any device.",
    keywords: "image to base64, convert image base64, base64 generator, jpg to base64, png to base64",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-to-base64",
  });

  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

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
      setBase64(result);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    toast({ title: "Copied!", description: "Base64 code copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setBase64("");
    setFileName("");
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Image to Base64 Converter</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert any image to Base64 instantly. All processing is done on your device — 100% private and offline.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select JPG, PNG, or WebP image</CardDescription>
            </CardHeader>
            <CardContent>
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
              {fileName && (
                <div className="mt-4 flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">{fileName}</span>
                  <Button variant="ghost" size="sm" onClick={clear} data-testid="button-clear">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {base64 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 gap-4">
                <div>
                  <CardTitle>Base64 Output</CardTitle>
                  <CardDescription>Your converted Base64 string</CardDescription>
                </div>
                <Button onClick={copyToClipboard} data-testid="button-copy">
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={base64}
                  readOnly
                  className="font-mono text-xs h-64 resize-none"
                  data-testid="textarea-output"
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Why Convert Images to Base64?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">100% Offline & Private</h3>
                <p className="text-muted-foreground">
                  Your images never leave your device. All conversion happens in your browser.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Use Cases</h3>
                <p className="text-muted-foreground">
                  Embed images in CSS, HTML, emails, or JSON without external file references.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
