import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileSpreadsheet, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { readExcelFile, type SheetData } from "@/lib/spreadsheet-utils";

export default function ExcelViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Excel Viewer Online - View XLSX Files in Browser | Pixocraft Tools",
    description: "View Excel files online for free without Microsoft Office. Open and preview XLSX, XLS files instantly in your browser. No installation required, completely free.",
    keywords: "excel viewer online, view xlsx files, open excel without office, free spreadsheet viewer, xlsx viewer, xls viewer online, excel file reader",
    canonicalUrl: "https://tools.pixocraft.in/tools/excel-viewer",
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setLoading(true);

    try {
      const sheetData = await readExcelFile(selectedFile);
      setSheets(sheetData);
      toast({
        title: "Success!",
        description: `Excel file loaded. Found ${sheetData.length} sheet(s)`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to read Excel file",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetTool = () => {
    setFile(null);
    setSheets([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Can I view Excel files without Microsoft Office?",
      answer: "Yes! Our Excel viewer lets you open and view XLSX and XLS files directly in your browser without needing Microsoft Office, Excel, or any other software installed. It's completely free and works on any device with a web browser."
    },
    {
      question: "What Excel file formats are supported?",
      answer: "Our viewer supports the most common Excel formats: XLSX (Excel 2007 and later) and XLS (Excel 97-2003). These formats cover the vast majority of Excel files you'll encounter. The tool can read multiple sheets and preserve formatting."
    },
    {
      question: "Is my Excel data secure?",
      answer: "Absolutely! All file processing happens entirely in your browser using JavaScript. Your Excel files are never uploaded to our servers or transmitted over the internet. Once you close or refresh the page, all data is completely removed from memory."
    },
    {
      question: "Can I edit the Excel file?",
      answer: "This tool is designed for viewing only. It displays the data from your Excel file but doesn't support editing. For editing capabilities, you would need Microsoft Excel, Google Sheets, or other spreadsheet software."
    },
    {
      question: "Are there any file size limits?",
      answer: "The limit depends on your browser's available memory. Most modern browsers can handle Excel files up to several megabytes. Very large files with hundreds of thousands of rows may take longer to load or may exceed browser memory limits."
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
            <span className="text-foreground">Excel Viewer</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Excel Viewer</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              View Excel files online without Microsoft Office. Open XLSX and XLS files instantly in your browser.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">No Office Required</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Excel File</CardTitle>
                  <CardDescription>
                    Select an Excel file to view (.xlsx or .xls)
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
            ) : loading ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Loading Excel file...</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{file.name}</CardTitle>
                        <CardDescription>{sheets.length} sheet(s)</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={resetTool}
                        data-testid="button-reset"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                {sheets.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <Tabs defaultValue={sheets[0]?.name || "0"}>
                        <TabsList className="mb-4">
                          {sheets.map((sheet, idx) => (
                            <TabsTrigger key={idx} value={sheet.name} data-testid={`tab-${idx}`}>
                              {sheet.name}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {sheets.map((sheet, idx) => (
                          <TabsContent key={idx} value={sheet.name}>
                            <div className="overflow-auto max-h-[600px]">
                              <table className="w-full border-collapse text-sm">
                                <thead className="bg-muted sticky top-0">
                                  <tr>
                                    {sheet.headers.map((header, hIdx) => (
                                      <th key={hIdx} className="border border-border px-3 py-2 text-left font-medium">
                                        {header || `Column ${hIdx + 1}`}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {sheet.data.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-muted/50">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="border border-border px-3 py-2">
                                          {cell !== undefined && cell !== null ? String(cell) : ''}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
