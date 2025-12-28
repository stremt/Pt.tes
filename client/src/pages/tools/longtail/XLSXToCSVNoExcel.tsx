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
    { "@type": "ListItem", "position": 4, "name": "Convert Excel to CSV Without Excel", "item": "https://tools.pixocraft.in/tools/xlsx-to-csv-converter/no-excel" }
  ]
});

export default function XLSXToCSVNoExcel() {
  const [csvData, setCSVData] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [sheetName, setSheetName] = useState("");

  useSEO({
    title: "Convert Excel to CSV Without Microsoft Excel | Free Tool",
    description: "Convert XLSX files to CSV without needing Excel installed. Works on any device without licenses or software. Online, instant, and completely private.",
    keywords: "convert excel to csv without excel, xlsx to csv without microsoft excel, excel to csv alternative, free xlsx converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/xlsx-to-csv-converter/no-excel",
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
        title="Convert Excel to CSV Without Microsoft Excel"
        description="Transform Excel spreadsheets to CSV format without Excel, Office, or any expensive software. Works on Windows, Mac, Linux, and online. Free and instant."
        icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
        toolId="xlsx-to-csv-no-excel"
        category="Developer Tool"
        howItWorks={[
          { step: 1, title: "Skip the Software", description: "No need to install Excel, Office, or any paid software on your device." },
          { step: 2, title: "Upload Your File", description: "Simply drag and drop your XLSX file or click to select it." },
          { step: 3, title: "Get Your CSV Instantly", description: "Download the converted CSV file in seconds without any software required." },
        ]}
        benefits={[
          { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "No Software Needed", description: "Works without Excel, Office, or any external applications." },
          { icon: <Eye className="h-6 w-6 text-primary" />, title: "Works Anywhere", description: "Convert on any device—Windows, Mac, Linux, or even tablets and phones." },
          { icon: <RotateCcw className="h-6 w-6 text-primary" />, title: "Instant Conversion", description: "Get results in seconds without waiting or downloading anything." },
        ]}
        faqs={[
          { question: "Do I need Excel installed to use this?", answer: "No. This tool works in your web browser without needing any software like Microsoft Excel or Office." },
          { question: "What if I'm using a Mac or Linux?", answer: "Works perfectly on all operating systems. Since it's web-based, Mac, Windows, and Linux users all get the same experience." },
          { question: "Is there a cost to use this converter?", answer: "Completely free. There are no subscriptions, hidden fees, or premium versions." },
          { question: "Can I convert password-protected Excel files?", answer: "Files without password protection convert instantly. Password-protected files may not work with this tool." },
          { question: "How many files can I convert?", answer: "Convert as many files as you want. There's no limit on the number of conversions per day." },
          { question: "Will this work on my mobile phone?", answer: "Yes, the tool is fully responsive and works on smartphones and tablets running any modern browser." },
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
                  No Excel needed. Works with .xlsx, .xls, and .xlsm files.
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
