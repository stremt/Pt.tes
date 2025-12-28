import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO, StructuredData } from "@/lib/seo";
import { Upload, Download, Eye, RotateCcw, FileSpreadsheet, Zap, Lock, Globe } from "lucide-react";
import { Link } from "wouter";
import * as XLSX from "xlsx";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", "position": 4, "name": "Convert XLSX to CSV Online Free", "item": "https://tools.pixocraft.in/tools/xlsx-to-csv-converter/free-online" }
  ]
});

export default function XLSXToCSVFreeOnline() {
  const [csvData, setCSVData] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [sheetName, setSheetName] = useState("");

  useSEO({
    title: "Convert XLSX to CSV Online Free | No Registration Required",
    description: "Convert Excel XLSX files to CSV online completely free. No registration, no file size limits, no ads. Instant conversion with instant download.",
    keywords: "convert xlsx to csv online free, free xlsx to csv converter, excel to csv free, online converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/xlsx-to-csv-converter/free-online",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setCSVData("");
    
    if (!file.name.match(/\.(xlsx|xls|xlsm)$/i)) {
      setError("Please upload a valid Excel file (.xlsx, .xls, or .xlsm)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          setError("No sheets found in the workbook");
          return;
        }
        const worksheet = workbook.Sheets[firstSheetName];
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        setCSVData(csv);
        setFileName(`${file.name.replace(/\.[^/.]+$/, "")}.csv`);
        setSheetName(firstSheetName);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to convert file");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const downloadCSV = () => {
    if (!csvData) return;
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvData));
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    setCSVData("");
    setFileName("");
    setError("");
    setSheetName("");
  };

  const previewRows = csvData.split("\n").slice(0, 10);

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <ToolLayout
        title="Convert XLSX to CSV Online – Completely Free"
        description="Transform your Excel spreadsheets into CSV format in seconds. Free XLSX to CSV converter that works instantly in your browser. No registration, no limits, no ads. Just upload and download."
        icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
        toolId="xlsx-to-csv-free-online"
        category="Developer Tool"
        howItWorks={[
          { step: 1, title: "Upload Your File", description: "Choose your XLSX, XLS, or XLSM file from your device. There's no file size restriction." },
          { step: 2, title: "Instant Processing", description: "The converter processes your file instantly in your browser without any delays." },
          { step: 3, title: "Download CSV", description: "Preview your converted data and download the CSV file immediately." },
        ]}
        benefits={[
          { icon: <Zap className="h-6 w-6 text-primary" />, title: "Completely Free", description: "No hidden charges, no premium features. Everything is available for free forever." },
          { icon: <Lock className="h-6 w-6 text-primary" />, title: "Your Data Stays Safe", description: "All processing happens locally. We never store or view your files." },
          { icon: <Globe className="h-6 w-6 text-primary" />, title: "No Registration Needed", description: "Start converting immediately. No signup, no email required." },
        ]}
        faqs={[
          { question: "Is this converter really free?", answer: "Yes, 100% free forever. No premium tiers, no watermarks, no limitations. Convert unlimited files at no cost." },
          { question: "Will my Excel file be saved?", answer: "No. Your file is processed only in your browser and never uploaded to our servers or saved anywhere." },
          { question: "Can I convert multiple files at once?", answer: "You can convert one file at a time. Simply clear and upload another file to convert the next one." },
          { question: "What Excel formats are supported?", answer: "We support .xlsx, .xls, and .xlsm formats. Converted data comes from the first sheet in your workbook." },
          { question: "Is there a file size limit?", answer: "No strict limit, but very large files (100MB+) may process slower depending on your device's memory." },
          { question: "Can I preview before downloading?", answer: "Yes, you can see a preview of the first 10 rows of your CSV before downloading the full file." },
        ]}
        footer={<p className="text-center text-sm text-muted-foreground"><Link href="/tools/xlsx-to-csv-converter" className="text-primary hover:text-primary/80 transition-colors">← Back to Main Tool</Link></p>}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Excel File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="file"
                  accept=".xlsx,.xls,.xlsm"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-80 cursor-pointer"
                  data-testid="input-file-upload"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: .xlsx, .xls, .xlsm
                </p>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg" data-testid="status-error-convert">
              <p className="text-sm font-semibold text-destructive">Error: {error}</p>
            </div>
          )}

          {csvData && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">File Name:</span>
                    <span className="font-medium">{fileName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sheet:</span>
                    <Badge variant="secondary">{sheetName}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rows:</span>
                    <span className="font-medium">{previewRows.length - 1}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {csvData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview (First 10 Rows)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <pre className="p-4 bg-muted rounded-lg text-sm font-mono max-h-96 overflow-auto" data-testid="text-preview">
                    {previewRows.map((row, idx) => (
                      <div key={idx}>{row}</div>
                    ))}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}

          {csvData && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={downloadCSV}
                    className="flex-1"
                    data-testid="button-download"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV
                  </Button>
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="flex-1"
                    data-testid="button-clear"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
