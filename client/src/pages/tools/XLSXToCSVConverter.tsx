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
    title: "Excel to CSV Converter Online - Convert XLSX to CSV Free",
    description: "Convert Excel XLSX to CSV instantly with preview. No signup, offline processing, completely free. Export spreadsheets in seconds professionally.",
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
        title="XLSX to CSV Converter"
        description="Convert your Excel spreadsheets to CSV format quickly and securely. This tool helps professionals, students, and developers transform complex XLSX files into portable CSV data for easy analysis and integration."
        icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
        toolId="xlsx-to-csv-converter"
        category="developer"
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
              <CardTitle>What problem does this tool solve?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Managing data across different platforms can be challenging when file formats are incompatible. Our XLSX to CSV converter solves the common problem of data portability. While Microsoft Excel is a powerful tool for calculations and formatting, many databases, data analysis software, and web applications require data in a simple Comma-Separated Values (CSV) format. This tool bridges that gap instantly.
              </p>
              <p>
                <strong>Who should use it?</strong>
                Whether you are a student submitting a research project, a business professional migrating data between CRM systems, a developer building data-driven applications, or a data analyst preparing datasets for Python or R, this tool is designed for you. It simplifies the workflow by removing the need for heavy office software just to convert a file.
              </p>
              <p>
                <strong>Practical real-life use cases:</strong>
                Common scenarios include importing customer lists into email marketing tools, uploading inventory data to e-commerce platforms like Shopify, or preparing academic data for statistical software. It is also perfect for developers who need to quickly grab CSV strings from a spreadsheet for testing.
              </p>
              <p>
                <strong>Privacy & Offline Usage:</strong>
                We understand that your data is sensitive. That is why our converter operates entirely within your web browser. Your files are processed locally on your computer and are never uploaded to any server. This means you can even use this tool without an active internet connection once the page is loaded, ensuring your business intelligence and personal information remain 100% private.
              </p>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Q1: Is it safe to upload my confidential business data here?</h4>
                <p className="text-sm text-muted-foreground">A1: Absolutely. Your data never leaves your device. The conversion process happens locally in your browser, meaning no one—not even us—can see or access your files.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Q2: Do I need Microsoft Excel installed to use this converter?</h4>
                <p className="text-sm text-muted-foreground">A2: No, you don't. This tool works independently of any spreadsheet software. You can convert XLSX to CSV on any device that has a modern web browser, including mobile phones.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Q3: Is there a limit on how many rows I can convert?</h4>
                <p className="text-sm text-muted-foreground">A3: While we don't set a hard limit, performance depends on your device's memory. Most standard spreadsheets with thousands of rows convert in a split second.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Q4: Will I lose any data during the conversion?</h4>
                <p className="text-sm text-muted-foreground">A4: The values and text in your cells are preserved perfectly. However, Excel-specific features like formulas, formatting, colors, and charts are not supported by the CSV format.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Q5: Can I convert multiple sheets from one Excel file at once?</h4>
                <p className="text-sm text-muted-foreground">A5: Currently, the tool converts the first active sheet. For multi-sheet workbooks, we recommend saving the specific sheet you need as a separate file or using our advanced viewer to select data.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Q6: Does this tool work on Mac and Linux?</h4>
                <p className="text-sm text-muted-foreground">A6: Yes, it is platform-independent. As long as you have a web browser like Chrome, Firefox, or Safari, it works exactly the same on Windows, macOS, and Linux.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Q7: Is the converted CSV compatible with Google Sheets?</h4>
                <p className="text-sm text-muted-foreground">A7: Yes, the output follows standard CSV encoding, which can be easily imported into Google Sheets, Microsoft Excel, or any other spreadsheet application.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Q8: Why is the tool free and are there any hidden charges?</h4>
                <p className="text-sm text-muted-foreground">A8: We believe in providing essential utility tools to the community for free. There are no signups, no hidden costs, and no limits on the number of conversions you can perform.</p>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Related Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link href="/tools/excel-viewer" asChild>
                  <Button variant="outline" className="justify-center">Excel Viewer</Button>
                </Link>
                <Link href="/tools/csv-viewer" asChild>
                  <Button variant="outline" className="justify-center">CSV Viewer</Button>
                </Link>
                <Link href="/tools/excel-to-pdf" asChild>
                  <Button variant="outline" className="justify-center">Excel to PDF</Button>
                </Link>
                <Link href="/tools/json-csv-converter" asChild>
                  <Button variant="outline" className="justify-center">JSON CSV Converter</Button>
                </Link>
                <Link href="/tools/csv-json-converter" asChild>
                  <Button variant="outline" className="justify-center">CSV JSON Converter</Button>
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
