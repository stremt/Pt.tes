import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO, StructuredData } from "@/lib/seo";
import { Upload, Download, Eye, RotateCcw, FileSpreadsheet } from "lucide-react";
import { Link } from "wouter";
import * as XLSX from "xlsx";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", "position": 4, "name": "XLSX to CSV Converter", "item": "https://tools.pixocraft.in/tools/xlsx-to-csv-converter" }
  ]
});

export default function XLSXToCSVConverter() {
  const [csvData, setCSVData] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [sheetName, setSheetName] = useState("");

  useSEO({
    title: "XLSX to CSV Converter Online | Free, Fast & Offline",
    description: "Convert Excel XLSX files to CSV instantly. Upload your file, preview the data, and download CSV. 100% offline, no server uploads, completely free.",
    keywords: "xlsx to csv converter, excel to csv, convert xlsx, online converter, free tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/xlsx-to-csv-converter",
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
        
        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          setError("No sheets found in the workbook");
          return;
        }
        
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to CSV
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
        title="XLSX to CSV Converter"
        description="Convert Excel XLSX files to CSV format instantly. Upload your spreadsheet, preview the data, and download the CSV file. Works completely offline with no server uploads."
        icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
        toolId="xlsx-to-csv-converter"
        category="Developer Tool"
        howItWorks={[
          { step: 1, title: "Upload XLSX", description: "Select your Excel file (.xlsx, .xls, or .xlsm) from your device." },
          { step: 2, title: "Convert", description: "The first sheet is automatically converted to CSV format." },
          { step: 3, title: "Preview & Download", description: "Preview the CSV data and download the file with one click." },
        ]}
        benefits={[
          { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "Quick Conversion", description: "Convert Excel files to CSV instantly without any waiting." },
          { icon: <Eye className="h-6 w-6 text-primary" />, title: "Preview Data", description: "See the first 10 rows before downloading to verify the conversion." },
          { icon: <RotateCcw className="h-6 w-6 text-primary" />, title: "100% Offline", description: "All processing happens locally. Your files never leave your browser." },
        ]}
        faqs={[
          { question: "Is my file uploaded to a server?", answer: "No. Everything is processed locally in your browser. Your file never leaves your device." },
          { question: "Which sheet gets converted?", answer: "The converter processes the first sheet in your Excel file. For multi-sheet files, only the first sheet is converted to CSV." },
          { question: "What file formats are supported?", answer: "We support .xlsx, .xls, and .xlsm file formats." },
          { question: "Can I convert large files?", answer: "Yes, but very large files may take a moment to process depending on your device's memory." },
          { question: "Is there a file size limit?", answer: "There's no hard limit, but extremely large files (100MB+) may slow down conversion or memory usage." },
          { question: "Does it preserve formatting?", answer: "CSV format doesn't support Excel formatting like colors and fonts. Only the cell values are converted." },
        ]}
        footer={<p className="text-center text-sm text-muted-foreground"><Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link></p>}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Upload Section */}
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

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg" data-testid="status-error-convert">
              <p className="text-sm font-semibold text-destructive">Error: {error}</p>
            </div>
          )}

          {/* File Info */}
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

          {/* Preview Section */}
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

          {/* Actions */}
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
