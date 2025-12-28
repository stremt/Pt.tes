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
    { "@type": "ListItem", "position": 4, "name": "XLSX to CSV Converter with Preview", "item": "https://tools.pixocraft.in/tools/xlsx-to-csv-converter/with-preview" }
  ]
});

export default function XLSXToCSVWithPreview() {
  const [csvData, setCSVData] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [sheetName, setSheetName] = useState("");

  useSEO({
    title: "Excel to CSV Converter with Preview | Check Before Download",
    description: "Convert Excel XLSX files to CSV with instant preview. Check your data before downloading to ensure accuracy. Safe, fast, offline conversion.",
    keywords: "xlsx to csv converter with preview, excel to csv preview, check csv conversion, safe converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/xlsx-to-csv-converter/with-preview",
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
        title="Excel to CSV Converter with Data Preview"
        description="Convert XLSX to CSV with a full preview feature. Verify your conversion is correct before downloading. See exactly what your CSV will look like."
        icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
        toolId="xlsx-to-csv-preview"
        category="Developer Tool"
        howItWorks={[
          { step: 1, title: "Upload Excel File", description: "Select your XLSX file and watch it convert instantly." },
          { step: 2, title: "Check Preview", description: "See the first 10 rows of your CSV data to verify accuracy." },
          { step: 3, title: "Download with Confidence", description: "Once you're satisfied, download the complete CSV file." },
        ]}
        benefits={[
          { icon: <Eye className="h-6 w-6 text-primary" />, title: "Preview Before Download", description: "Check your data conversion before downloading the file." },
          { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "Accurate Conversion", description: "See exactly how your Excel data will look as CSV." },
          { icon: <RotateCcw className="h-6 w-6 text-primary" />, title: "Risk-Free Conversion", description: "Preview eliminates guesswork and ensures quality results." },
        ]}
        faqs={[
          { question: "Why should I preview before downloading?", answer: "Preview helps catch formatting issues or data problems before you download. It's like quality checking before committing to the file." },
          { question: "Can I see more than 10 rows in the preview?", answer: "The preview shows the first 10 rows to confirm correctness. Download the full file to see all rows." },
          { question: "What if the preview looks wrong?", answer: "If the preview doesn't look right, try clearing and uploading the file again. Some Excel files have special formatting that may affect conversion." },
          { question: "Is the preview data the same as the downloaded file?", answer: "Yes, the preview is from the actual converted data. What you see in preview is exactly what you get in the downloaded CSV." },
          { question: "Can I edit the preview data before downloading?", answer: "This converter shows preview for verification only. For editing, download the file and open it in a spreadsheet application." },
          { question: "Does preview slow down the conversion?", answer: "No, preview is instant. It's generated at the same time as conversion, so there's no speed penalty." },
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
                  Upload your file and preview before downloading
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
                    <span className="text-sm text-muted-foreground">Total Rows:</span>
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
                  Data Preview (First 10 Rows)
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
                <p className="text-xs text-muted-foreground mt-3">
                  Showing first 10 rows. Download to see all {previewRows.length - 1} rows.
                </p>
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
                    Clear & Try Another
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
