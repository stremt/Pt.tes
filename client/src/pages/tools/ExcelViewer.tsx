import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, Edit2, FileSpreadsheet, Maximize2, Minimize2, Redo2, Search, Undo2, Upload, X, Shield, Zap, 
  Copy, Columns3, Trash2, ChevronDown, Type, Monitor 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { readExcelFile, createExcelFromData, type SheetData } from "@/lib/spreadsheet-utils";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";

export default function ExcelViewer() {
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [fileName, setFileName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(200);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCell, setEditCell] = useState<{ rowIndex: number; colIndex: number } | null>(null);
  const [history, setHistory] = useState<SheetData[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  
  const [pastedContent, setPastedContent] = useState("");
  const [showPaste, setShowPaste] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    const savedSheets = localStorage.getItem("excel_viewer_sheets");
    const savedFileName = localStorage.getItem("excel_viewer_filename");
    const savedIndex = localStorage.getItem("excel_viewer_active_index");

    if (savedSheets && savedFileName) {
      try {
        const parsedSheets = JSON.parse(savedSheets);
        setSheets(parsedSheets);
        setFileName(savedFileName);
        setActiveSheetIndex(savedIndex ? parseInt(savedIndex) : 0);
        setHistory([parsedSheets]);
        setHistoryIndex(0);
      } catch (e) {
        console.error("Failed to parse saved Excel data", e);
      }
    }
  }, []);

  // Save to localStorage whenever sheets change
  useEffect(() => {
    if (sheets.length > 0) {
      try {
        localStorage.setItem("excel_viewer_sheets", JSON.stringify(sheets));
        localStorage.setItem("excel_viewer_filename", fileName);
        localStorage.setItem("excel_viewer_active_index", activeSheetIndex.toString());
      } catch (e) {
        console.warn("Storage quota exceeded, data not saved locally");
      }
    }
  }, [sheets, fileName, activeSheetIndex]);

  const pushToHistory = useCallback((newSheets: SheetData[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    const historyEntry = newSheets.map(s => ({
      ...s,
      headers: [...s.headers],
      data: s.data.map(r => [...r])
    }));
    newHistory.push(historyEntry);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const historicSheets = history[newIndex];
      setSheets(historicSheets.map(s => ({
        ...s,
        headers: [...s.headers],
        data: s.data.map(r => [...r])
      })));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const historicSheets = history[newIndex];
      setSheets(historicSheets.map(s => ({
        ...s,
        headers: [...s.headers],
        data: s.data.map(r => [...r])
      })));
    }
  };

  const updateCurrentSheet = useCallback((updater: (sheet: SheetData) => SheetData) => {
    const newSheets = [...sheets];
    newSheets[activeSheetIndex] = updater(newSheets[activeSheetIndex]);
    setSheets(newSheets);
    pushToHistory(newSheets);
  }, [sheets, activeSheetIndex, pushToHistory]);

  const addRow = () => {
    updateCurrentSheet(sheet => ({
      ...sheet,
      data: [...sheet.data, new Array(sheet.headers.length).fill("")]
    }));
  };

  const deleteRow = (index: number) => {
    updateCurrentSheet(sheet => ({
      ...sheet,
      data: sheet.data.filter((_, i) => i !== index)
    }));
  };

  const addColumn = () => {
    updateCurrentSheet(sheet => {
      const newHeader = `Column ${sheet.headers.length + 1}`;
      return {
        ...sheet,
        headers: [...sheet.headers, newHeader],
        data: sheet.data.map(row => [...row, ""])
      };
    });
  };

  const deleteColumn = (colIndex: number) => {
    updateCurrentSheet(sheet => ({
      ...sheet,
      headers: sheet.headers.filter((_, i) => i !== colIndex),
      data: sheet.data.map(row => row.filter((_, i) => i !== colIndex))
    }));
  };

  const renameColumn = (colIndex: number, newName: string) => {
    if (!newName) return;
    updateCurrentSheet(sheet => {
      const newHeaders = [...sheet.headers];
      newHeaders[colIndex] = newName;
      return { ...sheet, headers: newHeaders };
    });
  };

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setEditCell(null);
    if (!isEditing && history.length === 0) {
      const initialHistory = sheets.map(s => ({
        ...s,
        headers: [...s.headers],
        data: s.data.map(r => [...r])
      }));
      setHistory([initialHistory]);
      setHistoryIndex(0);
    }
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (isEditing) {
      setEditCell({ rowIndex, colIndex });
    }
  };

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newSheets = [...sheets];
    const currentSheet = { ...newSheets[activeSheetIndex] };
    const newData = [...currentSheet.data];
    const newRow = [...newData[rowIndex]];
    newRow[colIndex] = value;
    newData[rowIndex] = newRow;
    currentSheet.data = newData;
    newSheets[activeSheetIndex] = currentSheet;
    setSheets(newSheets);
  };

  const handleBlur = () => {
    setEditCell(null);
    pushToHistory(sheets);
  };

  useEffect(() => {
    document.body.style.overflow = isFullScreen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isFullScreen]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    try {
      const sheetData = await readExcelFile(file);
      setSheets(sheetData);
      setFileName(file.name);
      setActiveSheetIndex(0);
      setDisplayCount(200);
      
      const initialHistory = sheetData.map(s => ({
        ...s,
        headers: [...s.headers],
        data: s.data.map(r => [...r])
      }));
      setHistory([initialHistory]);
      setHistoryIndex(0);

      toast({
        title: "Success",
        description: `Loaded ${sheetData.length} sheets from ${file.name}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to read Excel file",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleExcelPaste = useCallback(async (content: string) => {
    const rows = content.trim().split("\n").map(row => row.split(/\t|,/));
    if (rows.length === 0) return;

    const headers = rows[0].map((h, i) => h || `Column ${i + 1}`);
    const data = rows.slice(1);

    const sheetData: SheetData = {
      name: "Pasted Data",
      headers,
      data
    };

    setSheets([sheetData]);
    setFileName("pasted_data.xlsx");
    setActiveSheetIndex(0);
    setDisplayCount(200);
    setHistory([[sheetData]]);
    setHistoryIndex(0);
    setShowPaste(false);
    
    toast({
      title: "Success",
      description: "Data pasted successfully",
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false,
  });

  const downloadExcel = () => {
    const currentSheet = sheets[activeSheetIndex];
    const fullData = [currentSheet.headers, ...currentSheet.data];
    const blob = createExcelFromData(fullData, currentSheet.name);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "edited_data.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const activeSheet = sheets[activeSheetIndex];
  const filteredData = activeSheet ? activeSheet.data.filter((row) =>
    row.some((val) => String(val || "").toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      if (displayCount < filteredData.length) {
        setDisplayCount(prev => prev + 200);
      }
    }
  }, [displayCount, filteredData.length]);

  const reset = () => {
    setSheets([]);
    setFileName("");
    setSearchTerm("");
    setHistory([]);
    setHistoryIndex(-1);
    setIsEditing(false);
    localStorage.removeItem("excel_viewer_sheets");
    localStorage.removeItem("excel_viewer_filename");
    localStorage.removeItem("excel_viewer_active_index");
  };

  const faqItems: FAQItem[] = [
    {
      question: "Is my Excel data safe when I use this editor?",
      answer: "Yes, completely. Your files are processed entirely in your browser using JavaScript and are never uploaded to our servers. Your privacy is 100% protected."
    },
    {
      question: "Can I edit XLSX files online for free?",
      answer: "Absolutely. Our tool allows you to view, search, and edit Excel files (XLSX, XLS) directly in your browser. You can add rows, delete columns, and modify cells without needing Microsoft Office."
    },
    {
      question: "What features does the Excel Editor include?",
      answer: "It includes full cell editing, row and column management (add/delete/rename), search/filter functionality, full-screen mode, undo/redo history, and the ability to download your edited file."
    }
  ];

  const howItWorks = [
    { step: 1, title: "Upload Excel File", description: "Drag and drop your XLSX or XLS file directly into the tool." },
    { step: 2, title: "Edit & Manage", description: "Click any cell to edit. Use history controls, add/remove rows and columns, and switch between sheets." },
    { step: 3, title: "Export & Save", description: "Download your updated Excel file with all changes preserved." }
  ];

  const benefits = [
    { icon: <Shield className="h-6 w-6 text-primary" />, title: "Privacy First", description: "Your data stays in your browser. No files are uploaded to our servers." },
    { icon: <Zap className="h-6 w-6 text-primary" />, title: "Full Spreadsheet", description: "Editable cells, sheet management, and row/column control." },
    { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "Multiple Sheets", description: "Easily navigate and edit all sheets within your Excel workbook." },
    { icon: <Monitor className="h-6 w-6 text-primary" />, title: "Zero Install", description: "View and edit Excel files without Microsoft Office installed." }
  ];

  return (
    <ToolLayout
      title="Excel Viewer & Editor"
      description="Professional online Excel editor. View, modify, and manage XLSX/XLS files with full spreadsheet power—completely in your browser."
      toolId="excel-viewer"
      category="developer"
      icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqItems}
    >
      <Helmet>
        <title>Excel Viewer & Editor - View & Edit XLSX Online | Pixocraft Tools</title>
        <meta name="description" content="Professional Excel editor online. View, search, and edit XLSX/XLS files directly in your browser. No software required, works offline, 100% private." />
      </Helmet>
      <StructuredData data={generateFAQSchema(faqItems)} />

      <div className="space-y-6">
        {!sheets.length ? (
          <div className={cn("grid gap-6 transition-all duration-300", showPaste ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
            <Card className={cn("border-dashed border-2 transition-all", showPaste && "md:h-[400px]")}>
              <CardContent
                {...getRootProps()}
                className="flex flex-col items-center justify-center p-12 h-full cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <input {...getInputProps()} />
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {loading ? <Zap className="h-8 w-8 text-primary animate-pulse" /> : <Upload className="h-8 w-8 text-primary" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isDragActive ? "Drop your Excel file here" : "Upload Excel File"}
                </h3>
                <p className="text-muted-foreground text-center max-w-sm mb-6">
                  Supports XLSX and XLS formats. All processing is local.
                </p>

                {!showPaste && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPaste(true);
                    }}
                    className="mt-4 gap-2 text-primary hover:text-primary hover:bg-primary/5"
                  >
                    <Copy className="h-4 w-4" />
                    Or Paste Data
                  </Button>
                )}
              </CardContent>
            </Card>

            {showPaste && (
              <Card className="flex flex-col md:h-[400px]">
                <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-2">
                    <Copy className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Paste Data from Excel/CSV</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowPaste(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                  <div className="flex-1 relative">
                    <textarea
                      placeholder="Paste your data here (tab or comma separated)..."
                      className="w-full h-full p-4 bg-muted/30 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                      value={pastedContent}
                      onChange={(e) => setPastedContent(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    disabled={!pastedContent.trim()}
                    onClick={() => handleExcelPaste(pastedContent)}
                  >
                    View Data
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div 
            ref={containerRef}
            className={cn(
              "space-y-4 transition-all duration-300",
              isFullScreen && "fixed inset-0 z-[100] bg-background p-4 sm:p-8 overflow-hidden h-screen w-screen m-0"
            )}
          >
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 p-4 border-b">
                <div className="bg-primary/10 p-2 rounded-md flex-shrink-0">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div className="truncate flex-1">
                  <p className="font-medium truncate text-sm sm:text-base">{fileName}</p>
                  <p className="text-xs text-muted-foreground">{activeSheet?.data.length} rows in "{activeSheet?.name}"</p>
                </div>
                {isEditing && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="outline" size="icon" onClick={undo} disabled={historyIndex <= 0} title="Undo">
                      <Undo2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo">
                      <Redo2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-4">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search in table..."
                      className="pl-9 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant={isEditing ? "default" : "outline"} size="sm" onClick={toggleEditing}>
                      <Edit2 className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={toggleFullScreen}>
                      {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                    {isEditing && (
                      <Button variant="default" size="sm" onClick={downloadExcel} className="gap-2">
                        <Download className="h-4 w-4" /> Download
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={reset}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex flex-wrap gap-2 pb-2">
                    <Button variant="outline" size="sm" onClick={addRow}>
                      <Copy className="h-4 w-4 mr-1" /> Add Row
                    </Button>
                    <Button variant="outline" size="sm" onClick={addColumn}>
                      <Columns3 className="h-4 w-4 mr-1" /> Add Column
                    </Button>
                  </div>
                )}

                <Tabs value={activeSheetIndex.toString()} onValueChange={(v) => setActiveSheetIndex(parseInt(v))}>
                  <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-muted/50">
                    {sheets.map((sheet, idx) => (
                      <TabsTrigger key={idx} value={idx.toString()} className="px-4 py-2">
                        {sheet.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {sheets.map((sheet, idx) => (
                    <TabsContent key={idx} value={idx.toString()} className="mt-4">
                      <div 
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className={cn(
                          "overflow-auto border rounded-md bg-white dark:bg-zinc-950",
                          isFullScreen ? "h-[calc(100vh-280px)]" : "max-h-[600px]"
                        )}
                      >
                        <Table>
                          <TableHeader className="sticky top-0 z-10 bg-muted">
                            <TableRow>
                              {isEditing && <TableHead className="w-10 border-r" />}
                              {sheet.headers.map((header, hIdx) => (
                                <TableHead key={hIdx} className="min-w-[120px] border-r">
                                  <div className="flex items-center justify-between group">
                                    <span className="truncate">{header || `Col ${hIdx + 1}`}</span>
                                    {isEditing && (
                                      <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                                            <ChevronDown className="h-3 w-3" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="z-[110]">
                                          <DropdownMenuItem onClick={() => {
                                            const newName = prompt("Rename column to:", header);
                                            if (newName) renameColumn(hIdx, newName);
                                          }}>
                                            <Type className="h-4 w-4 mr-2" /> Rename
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="text-destructive" onClick={() => deleteColumn(hIdx)}>
                                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    )}
                                  </div>
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredData.slice(0, displayCount).map((row, rIdx) => (
                              <TableRow key={rIdx} className="hover:bg-muted/30">
                                {isEditing && (
                                  <TableCell className="p-1 w-10 text-center border-r">
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={() => deleteRow(rIdx)}>
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </TableCell>
                                )}
                                {row.map((cell, cIdx) => (
                                  <TableCell 
                                    key={cIdx} 
                                    className={cn(
                                      "border-r p-0 min-w-[120px] relative group/cell",
                                      isEditing && "cursor-text hover:bg-primary/5"
                                    )}
                                    onClick={() => handleCellClick(rIdx, cIdx)}
                                  >
                                    {isEditing && editCell?.rowIndex === rIdx && editCell?.colIndex === cIdx ? (
                                      <Input
                                        className="h-9 border-0 rounded-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 px-3 font-medium"
                                        autoFocus
                                        defaultValue={String(cell || "")}
                                        onBlur={(e) => {
                                          handleCellChange(rIdx, cIdx, e.target.value);
                                          handleBlur();
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            handleCellChange(rIdx, cIdx, (e.target as HTMLInputElement).value);
                                            handleBlur();
                                          } else if (e.key === "Escape") {
                                            setEditCell(null);
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div className={cn(
                                        "px-3 py-2 truncate h-9 leading-5 flex items-center justify-between min-h-[2.25rem] w-full",
                                        isEditing && "cursor-text"
                                      )}>
                                        <span className="truncate flex-1 min-h-[1.25rem]">
                                          {String(cell || "")}
                                        </span>
                                        {isEditing && (
                                          <Edit2 className="h-2.5 w-2.5 opacity-0 group-hover/cell:opacity-30 flex-shrink-0 ml-1 text-primary" />
                                        )}
                                      </div>
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className={cn(
                  "flex items-center justify-between pt-2 border-t",
                  isFullScreen && "pb-8"
                )}>
                  <p className="text-sm text-muted-foreground italic">
                    {filteredData.length > displayCount ? `Showing top ${displayCount} rows. Scroll for more.` : `Showing all ${filteredData.length} rows.`}
                  </p>
                  <Button variant="outline" size="sm" onClick={() => {
                    containerRef.current?.scrollIntoView({ behavior: "smooth" });
                  }} className="gap-2">
                    Back to Top
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
