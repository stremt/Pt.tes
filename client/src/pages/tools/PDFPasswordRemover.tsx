import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Unlock, Upload, Download, X, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { removePasswordFromPDF } from "@/lib/pdf-utils";

export default function PDFPasswordRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [unlockedFile, setUnlockedFile] = useState<Blob | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Remove PDF Password Online Free - Unlock PDF Files | Pixocraft Tools",
    description: "Remove password protection from PDF files online for free. Unlock encrypted PDFs securely in your browser. No upload required, completely private and offline.",
    keywords: "remove pdf password, unlock pdf, pdf password remover, decrypt pdf, pdf password cracker, remove pdf security, unlock encrypted pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-password-remover",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid File",
          description: "Please select a PDF file",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      setUnlockedFile(null);
      setPassword("");
    }
  };

  const removePassword = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await removePasswordFromPDF(file, password);
      setUnlockedFile(result);
      toast({
        title: "Success!",
        description: "Password removed successfully. PDF is now unlocked.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadUnlocked = () => {
    if (unlockedFile) {
      const url = URL.createObjectURL(unlockedFile);
      const link = document.createElement("a");
      link.download = `unlocked-${file?.name || "document.pdf"}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Is it legal to remove PDF passwords?",
      answer: "It's legal to remove passwords from PDFs that you own or have permission to access. This tool is designed for legitimate use cases like accessing your own documents where you've forgotten the password, or removing restrictions you've added yourself. Never use this tool on documents you don't have rights to access."
    },
    {
      question: "What types of PDF passwords can be removed?",
      answer: "This tool can attempt to remove user passwords (that prevent opening the PDF) if the PDF is not heavily encrypted. However, browser-based limitations mean strongly encrypted PDFs may not be processable. For best results, use this on PDFs with basic password protection."
    },
    {
      question: "Is my PDF secure during password removal?",
      answer: "Absolutely! All processing happens entirely in your browser using JavaScript. Your PDF never leaves your device, and we don't store, log, or have any access to your files. This ensures complete privacy for sensitive documents."
    },
    {
      question: "Why can't all PDFs be unlocked?",
      answer: "Some PDFs use strong encryption standards that require specialized software to decrypt. Browser-based tools have limitations compared to desktop applications. If this tool doesn't work for your PDF, you may need to use the original password or contact the document owner."
    },
    {
      question: "What if I don't know the password?",
      answer: "This tool requires the correct password to remove it. If you don't know the password, the PDF cannot be unlocked. Password cracking or guessing is not supported and would be unethical for documents you don't own."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">PDF Password Remover</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Unlock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">PDF Password Remover</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Remove password protection from PDF files. Unlock encrypted PDFs securely in your browser.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Private</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <p className="font-medium mb-1">Legal Use Only</p>
                  <p>Only remove passwords from PDFs you own or have permission to access. Browser-based tools have limitations with strongly encrypted PDFs.</p>
                </div>
              </div>
            </div>

            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload PDF</CardTitle>
                  <CardDescription>Select a password-protected PDF file</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload a PDF</p>
                    <p className="text-sm text-muted-foreground">Select a password-protected PDF to unlock</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="input-file"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Remove Password</CardTitle>
                        <CardDescription>{file.name}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setFile(null);
                          setUnlockedFile(null);
                          setPassword("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        data-testid="button-reset"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password (if known)</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter PDF password (optional)"
                        data-testid="input-password"
                      />
                      <p className="text-xs text-muted-foreground">
                        If you know the password, enter it for better results
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={removePassword}
                        disabled={loading}
                        className="flex-1"
                        size="lg"
                        data-testid="button-remove-password"
                      >
                        {loading ? "Processing..." : "Remove Password"}
                      </Button>
                      {unlockedFile && (
                        <Button
                          onClick={downloadUnlocked}
                          variant="outline"
                          className="flex-1"
                          size="lg"
                          data-testid="button-download"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Unlocked PDF
                        </Button>
                      )}
                    </div>

                    {unlockedFile && (
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">
                          Password removed successfully! Your PDF is now unlocked.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Remove PDF Passwords?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Access Your Own Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Forgot the password to your own PDF? This tool helps you regain access to documents you created or have legitimate rights to access.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Remove Unnecessary Restrictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Some PDFs have password protection that's no longer needed. Remove it to make documents easier to share and work with.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
