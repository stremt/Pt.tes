import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO, StructuredData } from "@/lib/seo";
import { Upload, Download, Eye, RotateCcw, FileSpreadsheet, Copy, Trash2, ClipboardPaste } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
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
  const [pastedCSV, setPastedCSV] = useState("");
  const [viewMode, setViewMode] = useState<"upload" | "paste">("upload");
  const { toast } = useToast();

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
        toast({
          title: "Success",
          description: "File converted successfully!",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to convert file");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handlePasteCSV = () => {
    if (!pastedCSV.trim()) {
      setError("Please paste some CSV content");
      return;
    }
    setCSVData(pastedCSV);
    setFileName("pasted_data.csv");
    setSheetName("Pasted Data");
    setError("");
    toast({
      title: "Success",
      description: "CSV data loaded successfully!",
    });
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
    toast({
      title: "Success",
      description: "CSV file downloaded!",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(csvData);
    toast({
      title: "Copied",
      description: "CSV content copied to clipboard!",
    });
  };

  const handleClear = () => {
    setCSVData("");
    setFileName("");
    setError("");
    setSheetName("");
    setPastedCSV("");
  };

  const previewRows = csvData.split("\n").slice(0, 15);

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <ToolLayout
        title="Convert Excel Files to CSV Format Instantly"
        description="Transform Excel spreadsheets into CSV format with one click. Upload XLSX, paste CSV, and download instantly. No signup required, completely offline, 100% free."
        icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
        toolId="xlsx-to-csv-converter"
        category="Developer Tool"
        howItWorks={[
          { step: 1, title: "Upload or Paste", description: "Select your Excel file or paste CSV content directly." },
          { step: 2, title: "Convert or View", description: "XLSX files are automatically converted to CSV format." },
          { step: 3, title: "Download or Edit", description: "Download your CSV file or copy the content to edit." },
        ]}
        benefits={[
          { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "Quick Conversion", description: "Convert Excel files to CSV instantly without any waiting." },
          { icon: <Eye className="h-6 w-6 text-primary" />, title: "Preview Data", description: "See the first 15 rows before downloading to verify the conversion." },
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
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Tab Switcher */}
          <div className="flex gap-2 border-b">
            <Button
              variant={viewMode === "upload" ? "default" : "ghost"}
              onClick={() => { setViewMode("upload"); setError(""); }}
              className="rounded-b-none"
              data-testid="button-tab-upload"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload XLSX
            </Button>
            <Button
              variant={viewMode === "paste" ? "default" : "ghost"}
              onClick={() => { setViewMode("paste"); setError(""); }}
              className="rounded-b-none"
              data-testid="button-tab-paste"
            >
              <ClipboardPaste className="h-4 w-4 mr-2" />
              Paste CSV
            </Button>
          </div>

          {/* Upload Section */}
          {viewMode === "upload" && (
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
          )}

          {/* Paste Section */}
          {viewMode === "paste" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardPaste className="h-5 w-5" />
                  Paste CSV Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste your CSV content here... (headers,values&#10;data1,value1&#10;data2,value2)"
                    value={pastedCSV}
                    onChange={(e) => setPastedCSV(e.target.value)}
                    className="font-mono text-sm min-h-32"
                    data-testid="textarea-csv-input"
                  />
                  <Button onClick={handlePasteCSV} className="w-full" data-testid="button-paste-load">
                    <ClipboardPaste className="h-4 w-4 mr-2" />
                    Load CSV Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg" data-testid="status-error-convert">
              <p className="text-sm font-semibold text-destructive">Error: {error}</p>
            </div>
          )}

          {csvData && (
            <>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">File Name:</span>
                      <span className="font-medium">{fileName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Source:</span>
                      <Badge variant="secondary">{sheetName}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Rows:</span>
                      <span className="font-medium">{csvData.split("\n").length - 1}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Preview (First 15 Rows)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <pre className="p-4 bg-muted rounded-lg text-xs font-mono max-h-96 overflow-auto whitespace-pre-wrap break-words" data-testid="text-preview">
                      {previewRows.map((row, idx) => (
                        <div key={idx}>{row}</div>
                      ))}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CSV Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={csvData}
                    onChange={(e) => setCSVData(e.target.value)}
                    className="font-mono text-xs min-h-40"
                    data-testid="textarea-csv-output"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={downloadCSV} className="flex-1" data-testid="button-download">
                      <Download className="h-4 w-4 mr-2" />
                      Download CSV
                    </Button>
                    <Button onClick={copyToClipboard} variant="outline" className="flex-1" data-testid="button-copy">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button onClick={handleClear} variant="outline" className="flex-1" data-testid="button-clear">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
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

          {/* Long-tail SEO Pages */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>More XLSX to CSV Converter Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/tools/xlsx-to-csv-converter/free-online" asChild>
                  <Button variant="outline" className="justify-center" data-testid="link-free-online">Free Online Converter</Button>
                </Link>
                <Link href="/tools/xlsx-to-csv-converter/no-excel" asChild>
                  <Button variant="outline" className="justify-center" data-testid="link-no-excel">Without Excel Required</Button>
                </Link>
                <Link href="/tools/xlsx-to-csv-converter/with-preview" asChild>
                  <Button variant="outline" className="justify-center" data-testid="link-preview">With Preview Feature</Button>
                </Link>
                <Link href="/tools/xlsx-to-csv-converter/bulk-convert" asChild>
                  <Button variant="outline" className="justify-center" data-testid="link-bulk">Bulk Conversion</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Back Link */}
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link>
          </p>
        </div>
      </ToolLayout>
    </>
  );
}
