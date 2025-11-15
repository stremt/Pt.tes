import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileSpreadsheet, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { convertExcelToHTML, formatFileSize } from "@/lib/spreadsheet-utils";
import html2pdf from "html2pdf.js";

export default function ExcelToPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Excel to PDF Converter Online - Convert XLSX to PDF | Pixocraft Tools",
    description: "Convert Excel files to PDF online for free. Transform XLSX, XLS spreadsheets to PDF format instantly. No software installation required, works offline in your browser.",
    keywords: "excel to pdf converter, xlsx to pdf, convert excel to pdf free, spreadsheet to pdf, xls to pdf online, excel pdf converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/excel-to-pdf",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];

    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(xlsx|xls)$/i)) {
      toast({
        title: "Invalid File",
        description: "Please select an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
      return;
    }

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

      toast({
        title: "Success!",
        description: "Excel file converted to PDF successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to convert Excel to PDF",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "How do I convert Excel to PDF?",
      answer: "Simply upload your Excel file (.xlsx or .xls), and click the Convert to PDF button. The tool will process all sheets in your workbook and generate a PDF document. All conversion happens in your browser, ensuring your data remains private."
    },
    {
      question: "Will all Excel sheets be included in the PDF?",
      answer: "Yes! Our converter processes all sheets in your Excel workbook and includes them in the PDF. Each sheet will appear as a separate section in the resulting PDF document, maintaining the structure of your original spreadsheet."
    },
    {
      question: "Is my Excel data secure?",
      answer: "Absolutely! All conversion happens entirely in your browser using JavaScript. Your Excel files are never uploaded to our servers or transmitted over the internet. Once you close the page, all data is completely removed from memory."
    },
    {
      question: "What Excel formats are supported?",
      answer: "Our tool supports the most common Excel formats: XLSX (Excel 2007 and later) and XLS (Excel 97-2003). These formats cover the vast majority of Excel files you'll encounter in business and personal use."
    },
    {
      question: "Are there any file size limits?",
      answer: "The limit depends on your browser's available memory. Most modern browsers can handle Excel files up to several megabytes. Very large spreadsheets with hundreds of thousands of rows may take longer to convert or may exceed browser memory limits."
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
            <span className="text-foreground">Excel to PDF</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Excel to PDF Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert Excel spreadsheets to PDF format instantly. Free, secure, and works offline in your browser.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">All Sheets Included</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Excel File</CardTitle>
                  <CardDescription>
                    Select an Excel file to convert to PDF (.xlsx or .xls)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload an Excel file</p>
                    <p className="text-sm text-muted-foreground">
                      Supports XLSX and XLS formats
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="input-file"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Convert to PDF</CardTitle>
                      <CardDescription>{file.name} ({formatFileSize(file.size)})</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      data-testid="button-reset"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={convertToPDF}
                    disabled={converting}
                    className="w-full"
                    size="lg"
                    data-testid="button-convert"
                  >
                    {converting ? (
                      <>Converting to PDF...</>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Convert & Download PDF
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
