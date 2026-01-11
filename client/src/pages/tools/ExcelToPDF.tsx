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
    title: "Excel to PDF Converter - Convert XLSX to PDF Online",
    description: "Convert your Excel spreadsheets to PDF format quickly and securely. No software required, 100% private, and works directly in your browser.",
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
      question: "Is my data safe when converting Excel to PDF?",
      answer: "Yes, your privacy is guaranteed. The conversion happens entirely within your browser. Your Excel files are never uploaded to our servers, keeping your sensitive data private."
    },
    {
      question: "Will the PDF preserve all sheets in my Excel workbook?",
      answer: "Yes, our converter is designed to process all worksheets within your file. Each sheet will be rendered as a separate section in the final PDF document."
    },
    {
      question: "Do I need to pay or register to use this tool?",
      answer: "No, this is a completely free tool. There are no hidden charges, no sign-up requirements, and you can convert as many files as you need."
    },
    {
      question: "What Excel formats can I convert to PDF?",
      answer: "We support both modern .xlsx files and older .xls formats. Simply upload your spreadsheet, and we will handle the conversion for you."
    },
    {
      question: "Does this tool work without an internet connection?",
      answer: "Once the page is loaded, the conversion logic runs locally in your browser. This means you can continue to convert files even if you go offline."
    },
    {
      question: "Can I use this on my mobile phone or tablet?",
      answer: "Yes, the tool is fully optimized for mobile devices. You can convert Excel files to PDF on the go using any modern mobile web browser."
    },
    {
      question: "Will the layout of my spreadsheet change in the PDF?",
      answer: "We strive to maintain the original layout as much as possible. However, since PDF is a fixed-page format, very wide spreadsheets may be scaled to fit the page."
    },
    {
      question: "Why should I convert Excel to PDF instead of sharing the file?",
      answer: "PDFs are perfect for sharing because they preserve formatting across all devices and cannot be easily edited, making them ideal for reports and invoices."
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
            <Link href="/tools/pdf" className="hover:text-foreground">PDF Tools</Link>
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
              Convert your Excel spreadsheets to professional PDF documents instantly. Our tool solves the problem of sharing spreadsheets in a non-editable, universally readable format, perfect for students, professionals, and developers.
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

          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/pdf" className="text-primary hover:text-primary/80 transition-colors">PDF Tools</Link>
          </p>
          </div>
        </div>
      </div>
    </>
  );
}
