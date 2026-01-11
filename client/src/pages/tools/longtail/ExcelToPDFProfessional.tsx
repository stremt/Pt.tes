import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileSpreadsheet, Upload, Download, X, Shield, Zap, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { convertExcelToHTML, formatFileSize } from "@/lib/spreadsheet-utils";
import html2pdf from "html2pdf.js";

export default function ExcelToPDFProfessional() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Professional Excel to PDF Converter - High Quality XLSX to PDF",
    description: "Create professional PDF documents from Excel spreadsheets. High-quality conversion for XLSX and XLS files. Secure, fast, and works offline in your browser.",
    keywords: "professional excel to pdf, high quality xlsx to pdf, secure excel converter, business spreadsheet to pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/excel-to-pdf/professional",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const convertToPDF = async () => {
    if (!file) return;
    setConverting(true);
    try {
      const htmlContent = await convertExcelToHTML(file);
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      const opt = {
        margin: 10,
        filename: file.name.replace(/\.(xlsx|xls)$/i, '.pdf'),
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };
      await html2pdf().set(opt).from(element).save();
      toast({ title: "Success!", description: "Professional PDF generated successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to convert", variant: "destructive" });
    } finally {
      setConverting(false);
    }
  };

  const faqItems: FAQItem[] = [
    { question: "Is this professional converter free?", answer: "Yes, it is completely free for all professional and personal use cases." },
    { question: "Does it support complex formatting?", answer: "We use high-fidelity rendering to preserve your spreadsheet layout as accurately as possible in the PDF." }
  ];

  return (
    <>
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold">Professional Excel to PDF</h1>
            <p className="text-muted-foreground">High-quality document conversion for business spreadsheets.</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Convert Spreadsheet</CardTitle>
              <CardDescription>Upload XLSX or XLS for professional PDF output.</CardDescription>
            </CardHeader>
            <CardContent>
              {!file ? (
                <div 
                  className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p>Click to upload professional spreadsheet</p>
                  <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleFileSelect} className="hidden" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <span>{file.name}</span>
                    <Button variant="ghost" size="icon" onClick={() => setFile(null)}><X className="h-4 w-4" /></Button>
                  </div>
                  <Button onClick={convertToPDF} disabled={converting} className="w-full">
                    {converting ? "Processing..." : "Generate Professional PDF"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-bold">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">Local processing ensures data remains private.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-bold">Instant Render</h3>
                <p className="text-sm text-muted-foreground">Fast conversion without server delays.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Lock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-bold">100% Private</h3>
                <p className="text-sm text-muted-foreground">Your files never leave your computer.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
