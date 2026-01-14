import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Unlock, Upload, Download, X, AlertCircle, Shield, Users, Briefcase, GraduationCap, Building2, UserCheck, FileText, Lock as LockIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { removePasswordFromPDF, formatFileSize } from "@/lib/pdf-utils";
import { Breadcrumb } from "@/components/Breadcrumb";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

export default function PDFPasswordRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [unlockedFile, setUnlockedFile] = useState<Blob | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Remove PDF Password Online Free | Unlock PDFs Instantly",
    description: "Remove PDF password protection instantly in your browser. Free, secure, and offline. Unlock encrypted PDFs without uploading files. Works on all devices.",
    keywords: "remove pdf password, unlock pdf, pdf password remover, decrypt pdf, unlock encrypted pdf, remove pdf security, pdf unlocker free, unlock pdf online",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-password-remover",
  });

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast({
        title: "Invalid File",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      playErrorSound();
      return;
    }
    setFile(selectedFile);
    setUnlockedFile(null);
    setPassword("");
  }, [toast]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  }, [handleFileSelect]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const selectedFile = e.clipboardData?.files?.[0];
      if (selectedFile && selectedFile.type === "application/pdf") {
        handleFileSelect(selectedFile);
        toast({
          title: "File Pasted",
          description: `Pasted ${selectedFile.name}`,
        });
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFileSelect, toast]);

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
      question: "Is it legal to remove passwords from PDF files?",
      answer: "Removing passwords from PDFs you own or have authorized access to is perfectly legal. This tool is designed for legitimate purposes—recovering access to your own documents, removing outdated protection from business files, or unlocking PDFs you've received with proper permissions. Using this tool on documents you don't have rights to access would be inappropriate and potentially illegal."
    },
    {
      question: "What types of PDF passwords can this tool remove?",
      answer: "This tool works effectively on PDFs with standard password protection, particularly owner passwords that restrict editing or printing. For user passwords (those required to open the PDF), you'll need to know the original password. Heavily encrypted PDFs using advanced security standards may require the original password for complete access."
    },
    {
      question: "Is my PDF safe when I use this tool?",
      answer: "Absolutely. All processing happens entirely in your browser—your PDF never gets uploaded to any server. We cannot see, access, store, or share your documents. This local processing approach provides maximum privacy and security, making it safe even for confidential business or personal documents."
    },
    {
      question: "Why couldn't my PDF be unlocked?",
      answer: "Some PDFs use strong encryption that requires the original password to decrypt. Browser-based tools have technical limitations compared to specialized desktop software. If this tool doesn't work for your specific PDF, the file likely uses advanced encryption that genuinely requires the password or professional data recovery services."
    },
    {
      question: "Do I need to install any software?",
      answer: "No installation required. This tool runs entirely in your web browser on any device—Windows, Mac, Linux, Android, or iOS. Simply visit this page, upload your PDF, and download the unlocked version. No plugins, extensions, or downloads necessary."
    },
    {
      question: "Can I unlock multiple PDFs at once?",
      answer: "Currently, this tool processes one PDF at a time to ensure accuracy and maintain your privacy. For multiple documents, simply repeat the process for each file. Each unlock takes just seconds, making batch processing quick and straightforward."
    },
    {
      question: "What happens to my PDF after unlocking?",
      answer: "Your unlocked PDF is ready to download immediately after processing. Since everything happens in your browser, the file exists only on your device. Once you close this page or refresh it, the processed file is cleared from browser memory. We recommend downloading your unlocked PDF right away."
    },
    {
      question: "Does this tool work on mobile phones?",
      answer: "Yes, this PDF password remover works on smartphones and tablets. Whether you're using an iPhone, Android phone, or iPad, you can upload password-protected PDFs directly from your device's file storage and download the unlocked version. The mobile experience is fully functional without any app installation."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const relatedTools = [
    { name: "PDF Merger", href: "/tools/pdf-merger", description: "Combine multiple PDF files into one document" },
    { name: "PDF Splitter", href: "/tools/pdf-splitter", description: "Extract specific pages or split PDFs into separate files" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor", description: "Reduce PDF file size while maintaining quality" },
    { name: "Image to PDF", href: "/tools/image-to-pdf", description: "Convert JPG, PNG, and other images to PDF format" },
    { name: "PDF Watermark Adder", href: "/tools/pdf-watermark-adder", description: "Add text or image watermarks to your PDFs" }
  ];

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Home", url: "/" },
              { label: "Tools", url: "/tools" },
              { label: "PDF Tools", url: "/tools/pdf" },
              { label: "PDF Password Remover" },
            ]}
          />

          <div className="text-center space-y-4 mb-12">
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Unlock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-h1">Free PDF Password Remover - Unlock Protected PDFs Online</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Struggling to open a password-protected PDF? Whether you've forgotten your own password or received a locked document you're authorized to access, unlock PDFs in seconds. No software downloads, no sign-ups, and your files never leave your device.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Private</Badge>
              <Badge variant="secondary">No Sign-up</Badge>
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
                    className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
                      isDragging 
                        ? "border-primary bg-primary/5 scale-[1.01] shadow-lg" 
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    data-testid="dropzone-upload"
                  >
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Upload className={`h-10 w-10 transition-transform duration-200 ${isDragging ? "scale-110 text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Drop locked PDF here</h3>
                    <p className="text-muted-foreground mb-6">or click to browse from your device</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4" />
                        <span>Private decryption</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <LockIcon className="h-4 w-4" />
                        <span>No files stored</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-primary/80">
                        <span className="px-1.5 py-0.5 rounded border border-primary/20 bg-primary/5 text-[10px] uppercase tracking-wider">Tip</span>
                        <span>Paste with Ctrl+V</span>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={onFileChange}
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
                    <div className="flex items-center justify-between gap-2">
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

                    <div className="flex flex-wrap gap-2">
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

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Problem: Locked PDFs Create Real Frustration</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
              <p>
                Password-protected PDFs serve an important purpose—they keep sensitive information secure. But what happens when protection becomes a barrier?
              </p>
              <p>
                Maybe you set a password months ago and can't remember it now. Perhaps a colleague sent you a work document that requires a password you weren't given. Or you're dealing with old archived files that are locked with passwords no one in your organisation remembers anymore.
              </p>
              <p>
                The frustration is real. You know the document is yours to access, but you're stuck. Installing expensive software just to open one file seems excessive. Uploading sensitive documents to random websites feels risky. And manually trying passwords one by one wastes precious time.
              </p>
              <p>
                This is exactly where a reliable, browser-based PDF password remover becomes essential.
              </p>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">How This Tool Solves Your Problem</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
              <p>
                Our PDF password remover provides a straightforward solution. Upload your password-protected PDF, enter the password if you know it, and download the unlocked version. The entire process happens right in your browser—nothing gets uploaded to any server.
              </p>
              <p>
                For PDFs where you know the password but want to remove the protection permanently, this tool creates a clean, unlocked copy. You can then share this version freely without recipients needing to enter credentials.
              </p>
              <p>
                For basic password protection that you're authorized to bypass, the tool attempts to create an accessible version while respecting stronger encryption standards that require the original password.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Who Uses PDF Password Remover?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <CardTitle>Students & Researchers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Academic papers, research journals, and course materials often come with password protection. When you've legitimately accessed these materials, removing passwords makes studying, highlighting, and annotating much easier.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <CardTitle>Business Professionals</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Contracts, reports, and internal documents sometimes accumulate password protection over time. HR departments, legal teams, and project managers regularly need to unlock old PDFs for archiving, auditing, or sharing with authorized team members.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-primary" />
                    <CardTitle>Freelancers & Consultants</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Client handovers often include password-protected documents. When you're authorized to access these files but the original password has been lost in email threads or staff changes, a quick unlock saves hours of back-and-forth communication.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <CardTitle>Government & Legal</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Court documents, permits, and official paperwork may come with outdated password requirements. Legal assistants and administrative staff benefit from quick PDF unlocking when processing authorized documents.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <CardTitle>Small Business Owners</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Running a business means dealing with countless PDFs—invoices, vendor agreements, tax documents. When old passwords are forgotten and the original creator isn't available, having a reliable unlocking tool saves significant hassle.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <CardTitle>Teachers & Educators</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Creating course materials often involves adapting password-protected templates or worksheets. Teachers who have proper authorization can unlock these PDFs to customize content for their students.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Privacy: Everything Stays on Your Device</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Privacy isn't just a feature—it's the foundation of how this tool works. When you select a PDF file, the processing happens entirely within your web browser. Your document never travels across the internet to any external server.
                    </p>
                    <p className="text-muted-foreground">
                      This matters especially for financial documents containing bank details, medical records with personal health information, legal contracts with confidential business terms, personal identification documents, and employment records with salary or performance details.
                    </p>
                    <p className="text-muted-foreground">
                      Because nothing gets uploaded, there's nothing to intercept, store, or leak. Even we have zero access to your files. This browser-based approach means you get the convenience of an online tool with the security of offline software.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Works Without Internet After Loading</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Once this page loads in your browser, you can actually disconnect from the internet and the tool continues working. This offline capability adds another layer of security for extremely sensitive documents.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Tools You May Find Useful</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <Card className="h-full hover-elevate cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Category Footer */}
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/privacy" className="text-primary hover:text-primary/80 transition-colors">Privacy Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
