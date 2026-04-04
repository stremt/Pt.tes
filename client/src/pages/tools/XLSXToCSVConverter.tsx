import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO, StructuredData } from "@/lib/seo";
import { Upload, Download, Eye, RotateCcw, FileSpreadsheet, Copy, Trash2, ClipboardPaste, ArrowRight, Shield, Zap, Info, FileUp, CheckCircle2, FileText } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  const handleFileUpload = (file: File) => {
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.ms-excel.sheet.macroEnabled.12': ['.xlsm']
    },
    multiple: false
  });

  useSEO({
    title: "XLSX to CSV Converter – Convert Excel to CSV Online Free",
    description: "Best free XLSX to CSV converter online. Convert Excel files (.xlsx, .xls, .xlsm) to CSV instantly without Excel. 100% client-side, secure, and fast for large files.",
    keywords: "xlsx to csv, xlsx to csv converter, convert excel to csv, excel to csv converter, convert xlsx to csv online, xlsx to csv online free, excel to csv free, excel to csv online, convert excel file to csv, excel file converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/xlsx-to-csv-converter",
  });

  const faqs = [
    { question: "What is XLSX to CSV conversion?", answer: "XLSX to CSV conversion is the process of transforming a modern Microsoft Excel XML-based spreadsheet (.xlsx) into a plain text format where values are separated by commas. This makes data more portable and easier to import into databases, Python scripts, or other data analysis tools." },
    { question: "How to convert XLSX to CSV without Excel?", answer: "You can convert XLSX to CSV without Excel using our free online converter. Simply upload your file, and our tool processes it entirely in your browser using JavaScript, meaning you don't need any office software installed." },
    { question: "Is this Excel to CSV converter secure?", answer: "Yes, it is 100% secure. Our tool uses client-side processing, which means your files are never uploaded to our servers. All data stays on your local machine, making it perfect for sensitive enterprise data." },
    { question: "Does it support large Excel files?", answer: "Yes, our converter is optimized for performance and can handle large datasets. Since it uses your browser's memory, it can process files with hundreds of thousands of rows quickly without server-side timeouts." },
    { question: "Can I convert .xls and .xlsm files too?", answer: "Absolutely. We support the older .xls format as well as macro-enabled .xlsm files. All these can be converted to standard CSV format in seconds." },
    { question: "Will I lose formatting or formulas during conversion?", answer: "CSV is a plain text format, so it only preserves the values currently displayed in the cells. Formulas, cell colors, fonts, and multiple sheets are not supported by the CSV standard." },
    { question: "Is it compatible with Python Pandas or databases?", answer: "Yes, the generated CSV follows standard encoding (UTF-8) and formatting, making it perfectly compatible with Python Pandas (pd.read_csv), MySQL LOAD DATA, PostgreSQL COPY, and Shopify imports." },
    { question: "Does it support Unicode and special characters?", answer: "Yes, our tool handles Unicode characters perfectly, ensuring that international data and special symbols are preserved correctly in the CSV output." },
    { question: "Can I convert multiple sheets at once?", answer: "Currently, our tool converts the first active sheet. For multi-sheet workbooks, we recommend saving the specific sheet you need as a separate file or converting them one by one." },
    { question: "Is there a limit on the number of conversions?", answer: "No, there are no limits. You can convert as many files as you need, completely free of charge, with no registration required." },
    { question: "How does this tool compare to desktop software?", answer: "Unlike heavy desktop software, our online converter is instant, requires no installation, and works on any operating system (Windows, Mac, Linux, ChromeOS)." },
    { question: "Can I use this tool offline?", answer: "Yes. Once the page is loaded, the conversion logic runs entirely in your browser. You can disconnect from the internet and continue converting files securely." },
    { question: "What delimiter does the output use?", answer: "The tool uses the standard comma (,) as a delimiter. If you need a semicolon or tab, you can easily use our CSV Editor to change the format after conversion." },
    { question: "Is it mobile-friendly?", answer: "Yes, you can convert Excel files to CSV on your smartphone or tablet just as easily as on a desktop." },
    { question: "Do you store my data for analytics?", answer: "No. We prioritize your privacy. We do not track the contents of your files, nor do we store any data on our servers." }
  ];

  const howItWorks = [
    { step: 1, title: "Upload Excel File", description: "Select your .xlsx, .xls, or .xlsm file. Our tool handles all modern and legacy Excel formats instantly." },
    { step: 2, title: "Instant Processing", description: "Your file is converted locally in your browser. No data is ever uploaded to a server, ensuring 100% privacy." },
    { step: 3, title: "Preview & Download", description: "See a live preview of your data and download your clean CSV file ready for import or analysis." }
  ];

  const benefits = [
    { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "Enterprise Grade", description: "High-performance processing for large datasets and complex workbooks." },
    { icon: <Eye className="h-6 w-6 text-primary" />, title: "Data Integrity", description: "Preserves values and Unicode characters perfectly for reliable data migration." },
    { icon: <RotateCcw className="h-6 w-6 text-primary" />, title: "Privacy First", description: "100% client-side. Your sensitive business data never leaves your device." },
    { icon: <Upload className="h-6 w-6 text-primary" />, title: "Zero Software", description: "The best way to convert Excel to CSV without installing heavy office suites." }
  ];

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
      <StructuredData data={[
        generateBreadcrumbSchema(),
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "XLSX to CSV Converter",
          "operatingSystem": "Web",
          "applicationCategory": "DeveloperApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        },
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to convert XLSX to CSV online",
          "step": howItWorks.map(step => ({
            "@type": "HowToStep",
            "name": step.title,
            "text": step.description
          }))
        }
      ]} />
      <ToolLayout
        title="XLSX to CSV Converter – Convert Excel to CSV Online"
        description="Convert your Excel spreadsheets to CSV format quickly and securely. 100% client-side processing for ultimate privacy."
        icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
        toolId="xlsx-to-csv-converter"
        category="developer"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Tool Area - Temp Mail Style */}
          <Card className="border-none shadow-2xl bg-card overflow-hidden">
            <div className="bg-primary/5 p-1 border-b">
               <div className="flex gap-1">
                <Button
                  variant={viewMode === "upload" ? "secondary" : "ghost"}
                  onClick={() => { setViewMode("upload"); setError(""); }}
                  className={cn("flex-1 rounded-none py-6", viewMode === "upload" && "bg-background shadow-sm")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload XLSX
                </Button>
                <Button
                  variant={viewMode === "paste" ? "secondary" : "ghost"}
                  onClick={() => { setViewMode("paste"); setError(""); }}
                  className={cn("flex-1 rounded-none py-6", viewMode === "paste" && "bg-background shadow-sm")}
                >
                  <ClipboardPaste className="h-4 w-4 mr-2" />
                  Paste CSV
                </Button>
              </div>
            </div>

            <CardContent className="p-8">
              {(viewMode === "upload" && !csvData) ? (
                <div 
                  {...getRootProps()} 
                  className={cn(
                    "relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center p-12 overflow-hidden",
                    isDragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/5"
                  )}
                >
                  <input {...getInputProps()} />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className={cn(
                      "p-6 rounded-3xl bg-primary/10 transition-transform duration-500",
                      isDragActive ? "scale-110 rotate-12" : "group-hover:scale-105"
                    )}>
                      <FileUp className="h-16 w-16 text-primary" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold tracking-tight">
                        {isDragActive ? "Drop your spreadsheet here" : "Click or drag file to convert"}
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        Supports .xlsx, .xls, .xlsm (Max 50MB)
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border">
                        <Shield className="h-4 w-4 text-green-500" />
                        100% Private
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Instant Result
                      </div>
                    </div>
                  </div>
                </div>
              ) : viewMode === "paste" && !csvData ? (
                <div className="space-y-6">
                  <div className="relative">
                    <Textarea
                      placeholder="Paste your Excel/CSV data here... (e.g., column1, column2)"
                      value={pastedCSV}
                      onChange={(e) => setPastedCSV(e.target.value)}
                      className="font-mono text-base min-h-[250px] p-6 rounded-2xl border-2 border-muted-foreground/20 focus:border-primary transition-all bg-muted/5 shadow-inner"
                    />
                    <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground bg-background/80 px-2 py-1 rounded border">
                      RAW INPUT
                    </div>
                  </div>
                  <Button 
                    onClick={handlePasteCSV} 
                    className="w-full py-8 text-lg font-bold rounded-2xl shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
                    size="lg"
                  >
                    <ClipboardPaste className="h-6 w-6 mr-3" />
                    Load & Convert Content
                  </Button>
                </div>
              ) : csvData && (
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <FileSpreadsheet className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold truncate max-w-[200px]">{fileName}</p>
                      <p className="text-xs text-muted-foreground">Sheet: {sheetName}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground hover:text-destructive">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Convert Another
                  </Button>
                </div>
              )}

              {error && (
                <div className="mt-8 p-6 bg-destructive/10 border-2 border-destructive/20 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
                  <div className="p-2 rounded-full bg-destructive/20">
                    <Info className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-bold text-destructive">Conversion Error</h4>
                    <p className="text-sm text-destructive/80 font-medium">{error}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {csvData && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-xl bg-primary/5 flex flex-col items-center justify-center p-6 text-center">
                  <div className="p-3 rounded-2xl bg-primary/10 mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">File Name</p>
                  <p className="font-bold truncate w-full px-2">{fileName}</p>
                </Card>
                <Card className="border-none shadow-xl bg-primary/5 flex flex-col items-center justify-center p-6 text-center">
                  <div className="p-3 rounded-2xl bg-primary/10 mb-3">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Source Sheet</p>
                  <p className="font-bold">{sheetName}</p>
                </Card>
                <Card className="border-none shadow-xl bg-primary/5 flex flex-col items-center justify-center p-6 text-center">
                  <div className="p-3 rounded-2xl bg-primary/10 mb-3">
                    <RotateCcw className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Total Rows</p>
                  <p className="font-bold">{csvData.split("\n").length - 1}</p>
                </Card>
              </div>

              <Card className="border-none shadow-2xl overflow-hidden">
                <CardHeader className="bg-muted/30 flex-row items-center justify-between py-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Conversion Preview
                  </CardTitle>
                  <Badge variant="outline" className="bg-background">First 15 Rows</Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <pre className="p-8 bg-muted/10 text-sm font-mono max-h-[400px] overflow-auto whitespace-pre scrolling-touch">
                      {previewRows.map((row, idx) => (
                        <div key={idx} className="hover:bg-primary/5 transition-colors px-4 -mx-4 border-b border-primary/5 last:border-0 py-1">
                          <span className="inline-block w-8 text-muted-foreground/50 select-none">{idx + 1}</span>
                          {row}
                        </div>
                      ))}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-muted/20 rounded-3xl border border-muted-foreground/10">
                <Button onClick={downloadCSV} className="flex-1 py-10 text-xl font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-transform" size="lg">
                  <Download className="h-8 w-8 mr-3" />
                  Download CSV
                </Button>
                <div className="flex flex-1 gap-4">
                  <Button onClick={copyToClipboard} variant="secondary" className="flex-1 h-auto py-8 rounded-2xl font-bold" size="lg">
                    <Copy className="h-5 w-5 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={handleClear} variant="outline" className="flex-1 h-auto py-8 rounded-2xl font-bold hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20" size="lg">
                    <Trash2 className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <section className="mt-20 space-y-16 text-foreground pb-20 border-t pt-16">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6 tracking-tight">What is XLSX to CSV Conversion?</h2>
              <p className="text-lg leading-relaxed mb-6">
                XLSX to CSV conversion is the technical process of transforming a modern Microsoft Excel XML-based spreadsheet (.xlsx) into a plain text format where values are separated by commas. While XLSX is great for formatting and formulas, CSV is the universal standard for <strong>data portability</strong>. Our <strong>excel to csv converter</strong> ensures this transition is seamless, preserving your raw data integrity for use in any other application.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-muted/30 p-6 rounded-xl border">
                  <h3 className="text-xl font-bold mb-3">Why Convert Excel to CSV?</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                      <span><strong>Universal Compatibility:</strong> CSV works with Python, R, SQL, and all CRMs.</span>
                    </li>
                    <li className="flex gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                      <span><strong>Lightweight Data:</strong> Reduce file size by removing Excel's heavy metadata.</span>
                    </li>
                    <li className="flex gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                      <span><strong>Database Ready:</strong> Most databases prefer CSV for high-speed bulk imports.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-6 rounded-xl border">
                  <h3 className="text-xl font-bold mb-3">Pain Points We Solve</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                      <span><strong>No Excel Needed:</strong> Convert <strong>xlsx to csv without excel</strong> installed.</span>
                    </li>
                    <li className="flex gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                      <span><strong>Large File Support:</strong> No browser crashes on massive spreadsheets.</span>
                    </li>
                    <li className="flex gap-2">
                      <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                      <span><span><strong>Security First:</strong> 100% local processing. No data upload.</span></span>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">XLSX vs CSV: Technical Comparison</h2>
              <div className="overflow-x-auto mb-12 border rounded-xl">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-bold">Feature</TableHead>
                      <TableHead className="font-bold">Excel (XLSX)</TableHead>
                      <TableHead className="font-bold">CSV (Text)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Structure</TableCell>
                      <TableCell>Binary / XML Compressed</TableCell>
                      <TableCell>Plain Text / Comma Delimited</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Formulas</TableCell>
                      <TableCell>Supported & Active</TableCell>
                      <TableCell>Static Values Only</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Metadata</TableCell>
                      <TableCell>Extensive (Styles, Charts)</TableCell>
                      <TableCell>None (Raw Data Only)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Portability</TableCell>
                      <TableCell>Software Dependent</TableCell>
                      <TableCell>Universal Standard</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <h2 className="text-3xl font-bold mb-6">Professional Use Cases for Excel Conversion</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  { title: "Developers", text: "Convert Excel data for database seeds, JSON mapping, or API testing." },
                  { title: "Data Analysts", text: "Clean and prep datasets for Python Pandas, R, or Tableau visualization." },
                  { title: "E-commerce", text: "Export inventory spreadsheets for Shopify, WooCommerce, or Amazon imports." },
                  { title: "Marketers", text: "Migrate customer contact lists into Mailchimp, HubSpot, or Salesforce CRM." },
                  { title: "Researchers", text: "Transform survey results into machine-readable formats for statistical analysis." },
                  { title: "Accountants", text: "Simplify complex financial reports for import into specialized tax software." }
                ].map((item, i) => (
                  <div key={i} className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-bold mb-6">How to Convert Excel to CSV Online Step-by-Step</h2>
              <div className="space-y-6 mb-12">
                {[
                  { step: "01", title: "Select Your File", desc: "Drag and drop your .xlsx or .xls file into the secure upload zone above." },
                  { step: "02", title: "Automatic Parsing", desc: "Our tool reads the active sheet instantly using high-performance local libraries." },
                  { step: "03", title: "Data Verification", desc: "Use the live preview window to check the first 15 rows of your data." },
                  { step: "04", title: "One-Click Export", desc: "Download your professionally formatted CSV file or copy it to your clipboard." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <span className="text-4xl font-black text-primary/20">{s.step}</span>
                    <div>
                      <h4 className="font-bold text-xl">{s.title}</h4>
                      <p className="text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-bold mb-6">Developer Insights: Encoding & Delimiters</h2>
              <p className="text-lg leading-relaxed mb-8">
                Our <strong>xlsx converter</strong> defaults to UTF-8 encoding, ensuring that special characters and international symbols remain intact. Whether you are working with currency symbols, mathematical notations, or non-English alphabets, our tool handles Unicode perfectly. The output uses the standard comma (,) delimiter, making it instantly compatible with <strong>Python datasets</strong>, <strong>database imports</strong>, and <strong>CRM migrations</strong>.
              </p>

              <h2 className="text-3xl font-bold mb-6">Security & Privacy Architecture</h2>
              <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">100% Client-Side Processing</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  Unlike other <strong>online excel converters</strong>, we never upload your files to a server. The conversion engine runs entirely in your browser's memory. This architecture ensures that your sensitive business data, intellectual property, and personal spreadsheets are 100% private and never stored in any cloud environment.
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-6">Related Data Tools</h2>
              <div className="flex flex-wrap gap-3 mb-12">
                <Link href="/tools/csv-viewer">
                  <Button variant="outline" className="rounded-full px-6">CSV Viewer & Editor</Button>
                </Link>
                <Link href="/tools/json-csv-converter">
                  <Button variant="outline" className="rounded-full px-6">JSON to CSV Converter</Button>
                </Link>
                <Link href="/tools/csv-json-converter">
                  <Button variant="outline" className="rounded-full px-6">CSV to JSON Converter</Button>
                </Link>
                <Link href="/tools/excel-viewer">
                  <Button variant="outline" className="rounded-full px-6">Excel Viewer Online</Button>
                </Link>
                <Link href="/tools/password-generator">
                  <Button variant="outline" className="rounded-full px-6">Secure Password Generator</Button>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <Card key={i} className="hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-bold">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Back Link */}
          <p className="text-center text-sm text-muted-foreground pb-12">
            <Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Back to Developer Tools
            </Link>
          </p>
        </div>
      </ToolLayout>
    </>
  );
}
