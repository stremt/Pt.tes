import { useState } from "react";
import { useSEO, StructuredData } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FileCode, Upload, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", "position": 4, "name": "File to Base64", "item": "https://tools.pixocraft.in/tools/file-to-base64" }
  ]
});

export default function FileToBase64() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Result, setBase64Result] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "File to Base64 Converter | Convert Any File Offline | Pixocraft Tools",
    description: "Convert documents, images & files to Base64 instantly. Secure, offline and lightning fast.",
    keywords: "file to base64, convert file base64, base64 tool, document converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/file-to-base64",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setBase64Result(base64);
        toast({
          title: "File Converted!",
          description: "Your file has been converted to Base64",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(base64Result);
    toast({
      title: "Copied!",
      description: "Base64 code copied to clipboard",
    });
  };

  const downloadAsText = () => {
    const blob = new Blob([base64Result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'base64-output.txt';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const howItWorks = [
    { step: 1, title: "Choose File", description: "Select any file from your device" },
    { step: 2, title: "Auto Convert", description: "File is instantly converted to Base64 format" },
    { step: 3, title: "Copy or Download", description: "Copy to clipboard or download as text file" },
  ];

  const benefits = [
    { icon: <Upload className="h-5 w-5" />, title: "Any File Type", description: "Convert documents, images, PDFs, and more" },
    { icon: <FileCode className="h-5 w-5" />, title: "100% Offline", description: "Files never leave your browser - completely secure" },
    { icon: <Copy className="h-5 w-5" />, title: "Instant Results", description: "Lightning fast conversion in milliseconds" },
  ];

  const faqs = [
    {
      question: "What is Base64 encoding?",
      answer: "Base64 is a way to encode binary data into ASCII text format, making it safe for transmission over text-based protocols.",
    },
    {
      question: "Is my file uploaded to a server?",
      answer: "No. All conversion happens locally in your browser. Your files never leave your device.",
    },
    {
      question: "What file types are supported?",
      answer: "All file types are supported - documents, images, PDFs, videos, archives, and more.",
    },
  ];

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <ToolLayout
      title="File to Base64 Converter"
      description="Convert documents, images & files to Base64 instantly. Secure, offline and lightning fast."
      icon={<FileCode className="h-8 w-8" />}
      toolId="file-to-base64"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
      footer={<p className="text-center text-sm text-muted-foreground"><Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link></p>}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="file-upload" className="text-base font-semibold">
            Select File to Convert
          </Label>
          <div className="flex items-center gap-4">
            <input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              data-testid="input-file-upload"
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              size="lg"
              data-testid="button-upload-file"
            >
              <Upload className="mr-2 h-5 w-5" />
              Choose File
            </Button>
            {selectedFile && (
              <span className="text-sm text-muted-foreground">
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </span>
            )}
          </div>
        </div>

        {base64Result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Base64 Output</Label>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  data-testid="button-copy-base64"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  onClick={downloadAsText}
                  variant="outline"
                  data-testid="button-download-base64"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={base64Result}
              readOnly
              className="font-mono text-sm min-h-[300px]"
              data-testid="textarea-base64-output"
            />
            <p className="text-sm text-muted-foreground">
              Length: {base64Result.length} characters
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
    </>
  );
}
