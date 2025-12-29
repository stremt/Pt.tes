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
    title: "Excel to CSV Converter Online | Free XLSX Conversion",
    description: "Convert Excel XLSX to CSV instantly with preview. No signup, offline processing, completely free. Export spreadsheets in seconds.",
    keywords: "convert xlsx to csv, excel to csv converter, xlsx converter, online converter free",
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
        title="Convert Excel Files to CSV Format Instantly"
        description="Transform Excel spreadsheets into CSV format with one click. Upload XLSX, preview the data, and download instantly. No signup required, completely offline, 100% free."
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
          { question: "Is my Excel file uploaded to any server?", answer: "No. The conversion happens entirely on your device using your browser. Your file is never sent to any server and is never stored." },
          { question: "Why use CSV instead of Excel?", answer: "CSV is a universal format that works with almost any application—databases, spreadsheet programs, data analytics tools, and programming languages. It's simpler and more portable than Excel." },
          { question: "What Excel formats can I convert?", answer: "We support .xlsx (modern Excel), .xls (older Excel), and .xlsm (Excel with macros). Simply upload any of these formats." },
          { question: "What if my Excel file has multiple sheets?", answer: "The first sheet in your workbook is automatically converted to CSV. To convert other sheets, open your file in Excel and save each sheet separately, then convert them one at a time." },
          { question: "Are there file size restrictions?", answer: "No strict limit. However, very large files (over 100MB) may be slow to process depending on your device's memory. Most files convert in seconds." },
          { question: "Does the converter keep Excel formatting and formulas?", answer: "CSV format only preserves cell values and text. Excel formatting like colors, fonts, merged cells, and formulas are not included in the CSV output." },
          { question: "Can I use this tool on my phone?", answer: "Yes, the converter works on smartphones, tablets, and computers. Just open it in any web browser and use the same way." },
          { question: "Do I need to create an account or sign in?", answer: "No account needed. The tool is free and works immediately without any signup, registration, or login." },
        ]}
        footer={
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground"><Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link></p>
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <p className="text-sm font-semibold text-center mb-3">More XLSX to CSV Tools:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/tools/xlsx-to-csv-converter/free-online" asChild>
                  <Button variant="outline" size="sm" className="text-xs" data-testid="link-free-online">Free Online Converter</Button>
                </Link>
                <Link href="/tools/xlsx-to-csv-converter/no-excel" asChild>
                  <Button variant="outline" size="sm" className="text-xs" data-testid="link-no-excel">Without Excel</Button>
                </Link>
                <Link href="/tools/xlsx-to-csv-converter/with-preview" asChild>
                  <Button variant="outline" size="sm" className="text-xs" data-testid="link-preview">With Preview</Button>
                </Link>
                <Link href="/tools/xlsx-to-csv-converter/bulk-convert" asChild>
                  <Button variant="outline" size="sm" className="text-xs" data-testid="link-bulk">Bulk Convert</Button>
                </Link>
              </div>
            </div>
          </div>
        }
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

          {/* About This Tool */}
          <Card>
            <CardHeader>
              <CardTitle>Why Convert Excel to CSV?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                CSV (Comma-Separated Values) is one of the most universal data formats. While Excel is powerful for spreadsheets, CSV is simpler, smaller, and works everywhere. Converting Excel files to CSV is essential for data portability, database imports, data analysis, and integration with other tools.
              </p>
              <p>
                Whether you're a student working on a research project, a business analyst preparing data for databases, a developer integrating spreadsheets into applications, or anyone needing to share data across different platforms, this converter simplifies the process.
              </p>
              <p>
                <strong>Real-world use cases:</strong> Import Excel data into databases, migrate data between applications, prepare datasets for analysis tools, share data with systems that only accept CSV, reduce file size for storage, or comply with data standards that require CSV format.
              </p>
              <p>
                The entire conversion happens on your device—no files are sent anywhere, no tracking occurs, and nothing is stored. Your data remains completely private and secure throughout the process.
              </p>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <Card>
            <CardHeader>
              <CardTitle>More Tools You Might Need</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link href="/tools/json-csv-converter" asChild>
                  <Button variant="outline" className="justify-center" data-testid="link-json-csv">JSON CSV Converter</Button>
                </Link>
                <Link href="/tools/csv-viewer" asChild>
                  <Button variant="outline" className="justify-center" data-testid="link-csv-viewer">CSV Viewer & Editor</Button>
                </Link>
                <Link href="/tools/xlsx-viewer" asChild>
                  <Button variant="outline" className="justify-center" data-testid="link-xlsx-viewer">XLSX Viewer & Editor</Button>
                </Link>
                <Link href="/tools/file-to-base64" asChild>
                  <Button variant="outline" className="justify-center" data-testid="link-base64">File to Base64</Button>
                </Link>
                <Link href="/tools/json-yaml-converter" asChild>
                  <Button variant="outline" className="justify-center" data-testid="link-json-yaml">JSON YAML Converter</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
