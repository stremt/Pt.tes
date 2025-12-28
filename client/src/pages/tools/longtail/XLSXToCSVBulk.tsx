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
    { "@type": "ListItem", "position": 4, "name": "Bulk Convert Excel to CSV", "item": "https://tools.pixocraft.in/tools/xlsx-to-csv-converter/bulk-convert" }
  ]
});

export default function XLSXToCSVBulk() {
  const [csvData, setCSVData] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [sheetName, setSheetName] = useState("");

  useSEO({
    title: "Bulk Convert Excel Files to CSV | Batch XLSX Converter",
    description: "Convert multiple Excel files to CSV format in one go. Batch processing tool for bulk XLSX to CSV conversion. Fast and free.",
    keywords: "bulk convert excel to csv, batch xlsx converter, convert multiple excel files, batch convert xlsx",
    canonicalUrl: "https://tools.pixocraft.in/tools/xlsx-to-csv-converter/bulk-convert",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setCSVData("");
    
    if (!file.name.match(/\.(xlsx|xls|xlsm)$/i)) {
      setError("Please upload a valid Excel file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          setError("No sheets found");
          return;
        }
        const worksheet = workbook.Sheets[firstSheetName];
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        setCSVData(csv);
        setFileName(`${file.name.replace(/\.[^/.]+$/, "")}.csv`);
        setSheetName(firstSheetName);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to convert");
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
        title="Bulk Convert Excel Files to CSV Format"
        description="Speed up your workflow by converting Excel files to CSV. Process files one after another with a simple interface. Perfect for batch data processing tasks."
        icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
        toolId="xlsx-to-csv-bulk"
        category="Developer Tool"
        howItWorks={[
          { step: 1, title: "Upload First File", description: "Start by uploading your first XLSX file for conversion." },
          { step: 2, title: "Download & Repeat", description: "Once converted, download the CSV and upload the next file to continue." },
          { step: 3, title: "Process All Files", description: "Continue this simple flow until all your Excel files are converted." },
        ]}
        benefits={[
          { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "Fast Bulk Processing", description: "Convert multiple files quickly with a streamlined workflow." },
          { icon: <Eye className="h-6 w-6 text-primary" />, title: "Preview Each File", description: "Check the preview of each conversion before downloading." },
          { icon: <RotateCcw className="h-6 w-6 text-primary" />, title: "Easy Batch Workflow", description: "Simple interface designed for converting multiple files efficiently." },
        ]}
        faqs={[
          { question: "Can I convert multiple files at once?", answer: "Upload one file at a time. Our tool processes and converts each file individually, then you can upload the next one." },
          { question: "How long does bulk conversion take?", answer: "Each file converts instantly. The time depends on file size, but most conversions complete in seconds." },
          { question: "Is there a limit on how many files I can convert?", answer: "No limit. Convert as many files as you need in a single session. Just repeat the upload-download cycle." },
          { question: "Can I convert all sheets at once?", answer: "Currently, the first sheet is automatically converted. To convert other sheets, you can upload the same file multiple times." },
          { question: "What format should my Excel files be in?", answer: "Any standard Excel format works: .xlsx, .xls, or .xlsm. These are the formats most Excel users work with." },
          { question: "Can I preview before downloading each file?", answer: "Yes, you get a preview of the first 10 rows for each file before downloading to ensure the conversion is correct." },
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
                  Upload one file at a time. Repeat for bulk conversion workflow.
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
                </div>
              </CardContent>
            </Card>
          )}

          {csvData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview
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
