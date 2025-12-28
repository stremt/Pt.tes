import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "wouter";
import * as XLSX from "xlsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Download, Search, X, Shield, Zap, FileSpreadsheet, Monitor, Maximize2, Minimize2, Highlighter, Edit2, Plus, Trash2, ChevronDown, Undo2, Redo2, ClipboardPaste, ArrowRight, Copy, Columns3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

export default function XLSXViewer() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editCell, setEditCell] = useState<{ rowIndex: number; colKey: string } | null>(null);
  const [history, setHistory] = useState<any[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [pastedContent, setPastedContent] = useState("");
  const [showPaste, setShowPaste] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleXLSXContent = useCallback((arrayBuffer: ArrayBuffer, name: string = "data.xlsx") => {
    try {
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData && jsonData.length > 0) {
        const newHeaders = Object.keys(jsonData[0] as object);
        setHeaders(newHeaders);
        setData(jsonData);
        setFileName(name);
        setDisplayCount(100);
        setHistory([jsonData]);
        setHistoryIndex(0);
        toast({
          title: "Success",
          description: `Loaded ${jsonData.length} rows from "${firstSheet}"`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error parsing file",
        description: error instanceof Error ? error.message : "Failed to parse Excel file",
      });
    }
  }, [toast]);

  useEffect(() => {
    const savedData = localStorage.getItem("xlsx_viewer_data");
    const savedHeaders = localStorage.getItem("xlsx_viewer_headers");
    const savedFileName = localStorage.getItem("xlsx_viewer_filename");

    if (savedData && savedHeaders && savedFileName) {
      try {
        const parsedData = JSON.parse(savedData);
        const parsedHeaders = JSON.parse(savedHeaders);
        setData(parsedData);
        setHeaders(parsedHeaders);
        setFileName(savedFileName);
        setHistory([parsedData]);
        setHistoryIndex(0);
      } catch (e) {
        console.error("Failed to parse saved XLSX data", e);
      }
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      try {
        localStorage.setItem("xlsx_viewer_data", JSON.stringify(data));
        localStorage.setItem("xlsx_viewer_headers", JSON.stringify(headers));
        localStorage.setItem("xlsx_viewer_filename", fileName);
      } catch (e) {
        console.warn("Storage quota exceeded, data not saved locally");
      }
    } else {
      localStorage.removeItem("xlsx_viewer_data");
      localStorage.removeItem("xlsx_viewer_headers");
      localStorage.removeItem("xlsx_viewer_filename");
    }
  }, [data, headers, fileName]);

  const pushToHistory = useCallback((newData: any[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newData]);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setData([...history[newIndex]]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setData([...history[newIndex]]);
    }
  };

  const addRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: "" }), {});
    const newData = [...data, newRow];
    setData(newData);
    pushToHistory(newData);
  };

  const deleteRow = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    pushToHistory(newData);
  };

  const addColumn = () => {
    const newHeader = `Column ${headers.length + 1}`;
    setHeaders([...headers, newHeader]);
    const newData = data.map(row => ({ ...row, [newHeader]: "" }));
    setData(newData);
    pushToHistory(newData);
  };

  const deleteColumn = (colKey: string) => {
    setHeaders(headers.filter(h => h !== colKey));
    const newData = data.map(row => {
      const { [colKey]: _, ...rest } = row;
      return rest;
    });
    setData(newData);
    pushToHistory(newData);
  };

  const renameColumn = (oldKey: string, newKey: string) => {
    if (!newKey || headers.includes(newKey)) return;
    setHeaders(headers.map(h => h === oldKey ? newKey : h));
    const newData = data.map(row => {
      const { [oldKey]: val, ...rest } = row;
      return { ...rest, [newKey]: val };
    });
    setData(newData);
    pushToHistory(newData);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleHighlight = () => {
    setHighlightEnabled(!highlightEnabled);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setEditCell(null);
    if (!isEditing && history.length === 0) {
      setHistory([[...data]]);
      setHistoryIndex(0);
    }
  };

  const handleCellClick = (rowIndex: number, colKey: string) => {
    if (isEditing) {
      setEditCell({ rowIndex, colKey });
    }
  };

  const handleCellChange = (rowIndex: number, colKey: string, value: string) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [colKey]: value };
    setData(newData);
  };

  const handleBlur = () => {
    setEditCell(null);
    pushToHistory(data);
  };

  const handleKeyDown = (e: React.KeyboardEvent, rowIndex: number, colIndex: number) => {
    if (!isEditing) return;

    const colKey = headers[colIndex];

    if (e.key === "Enter" || e.key === "Tab") {
      if (editCell) {
        e.preventDefault();
        setEditCell(null);
        pushToHistory(data);
        
        let nextRow = rowIndex;
        let nextCol = colIndex;

        if (e.key === "Enter") {
          nextRow = e.shiftKey ? rowIndex - 1 : rowIndex + 1;
        } else {
          nextCol = e.shiftKey ? colIndex - 1 : colIndex + 1;
        }

        if (nextRow >= 0 && nextRow < data.length && nextCol >= 0 && nextCol < headers.length) {
          setTimeout(() => setEditCell({ rowIndex: nextRow, colKey: headers[nextCol] }), 0);
        }
      } else {
        e.preventDefault();
        setEditCell({ rowIndex, colKey });
      }
    }
  };

  const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
    if (!highlight.trim() || !highlightEnabled) return <>{text}</>;
    
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded-sm px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullScreen]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx?|xls)$/i)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a valid Excel file (.xls, .xlsx)",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      handleXLSXContent(arrayBuffer, file.name);
    };
    reader.readAsArrayBuffer(file);
  }, [toast, handleXLSXContent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"], "application/vnd.ms-excel": [".xls"] },
    multiple: false,
  });

  const downloadXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName || "data.xlsx");
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const reset = () => {
    setData([]);
    setHeaders([]);
    setFileName("");
    setSearchTerm("");
    setDisplayCount(100);
    setShowPaste(false);
    setPastedContent("");
  };

  const loadMore = useCallback(() => {
    if (displayCount < filteredData.length) {
      setDisplayCount(prev => prev + 100);
    }
  }, [displayCount, filteredData.length]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      loadMore();
    }
  };

  const howItWorks = [
    { step: 1, title: "Upload Excel File", description: "Drag and drop your Excel file or click to browse and select it." },
    { step: 2, title: "Edit & Manage", description: "Click any cell to edit. Add/remove rows and columns, rename headers, and use undo/redo." },
    { step: 3, title: "Export & Save", description: "Your changes are saved locally. Download the updated file as Excel whenever ready." }
  ];

  const benefits = [
    { icon: <Shield className="h-6 w-6 text-primary" />, title: "Privacy First", description: "Your data stays in your browser. No files are uploaded to our servers." },
    { icon: <Zap className="h-6 w-6 text-primary" />, title: "Full Spreadsheet", description: "Editable cells, keyboard navigation, undo/redo, and row/col management." },
    { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "Local Persistence", description: "Changes are automatically saved in your browser for next time." },
    { icon: <Monitor className="h-6 w-6 text-primary" />, title: "Large File Support", description: "View thousands of rows smoothly with optimized rendering." }
  ];

  const faqs = [
    { question: "Is my Excel data safe when I use this tool?", answer: "Yes, completely. Your Excel file is processed entirely in your web browser and never sent to any server. We have no access to your data, and it's not stored on our servers. Your privacy is fully protected." },
    { question: "Can I edit XLSX files and save my changes?", answer: "Yes. Enable editing mode and click any cell to make changes. You can add/remove rows and columns, rename headers, and use undo/redo. Changes are automatically saved to your browser's local storage and can be downloaded as a new Excel file." },
    { question: "What Excel file formats are supported?", answer: "This tool supports .xlsx (Excel 2007+), .xls (older Excel), and standard spreadsheet formats. Just upload your file and it will be parsed instantly." },
    { question: "Will my data be lost if I close the browser?", answer: "No. The tool automatically saves your progress to your browser's local storage. Your data will be there when you return." },
    { question: "Can this tool handle large XLSX files?", answer: "Yes. The tool is optimized to handle large spreadsheets with thousands of rows using efficient lazy loading." },
    { question: "Can I use this on mobile?", answer: "Yes. The tool works on phones, tablets, laptops, and desktops. The interface adapts to smaller screens." },
    { question: "Does this work offline?", answer: "Once the page is loaded, yes. All editing and viewing functions work completely offline." },
    { question: "Can I convert Excel to CSV?", answer: "Yes, you can edit Excel files in this tool and download them back as Excel format. For CSV conversion, use our CSV tools." }
  ];

  return (
    <ToolLayout
      title="XLSX Viewer & Editor"
      description="View, edit, and explore your Excel files directly in your browser with full spreadsheet capabilities."
      toolId="xlsx-viewer"
      category="developer"
      icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <Helmet>
        <title>Free XLSX & Excel Viewer & Editor - Edit Online Instantly</title>
        <meta name="description" content="Edit Excel and XLSX files online instantly. View, search, and modify spreadsheets directly in your browser. Works offline, saves locally—no uploads." />
      </Helmet>

      <div className="space-y-6">
        {!data.length ? (
          <div className={cn("grid gap-6 transition-all duration-300", showPaste ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
            <Card className={cn("border-dashed border-2 transition-all", showPaste && "md:h-[400px]")}>
              <CardContent
                {...getRootProps()}
                className="flex flex-col items-center justify-center p-12 h-full cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <input {...getInputProps()} />
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isDragActive ? "Drop your Excel file here" : "Upload your Excel file"}
                </h3>
                <p className="text-muted-foreground text-center max-w-sm mb-6">
                  Drag and drop .xlsx or .xls file here, or click to browse.
                </p>
              </CardContent>
            </Card>
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
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="truncate flex-1">
                  <p className="font-medium truncate text-sm sm:text-base">{fileName}</p>
                  <p className="text-xs text-muted-foreground">{data.length} rows detected</p>
                </div>
                {isEditing && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={undo} 
                      disabled={historyIndex <= 0} 
                      title="Undo"
                      className="h-9 w-9"
                    >
                      <Undo2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={redo} 
                      disabled={historyIndex >= history.length - 1} 
                      title="Redo"
                      className="h-9 w-9"
                    >
                      <Redo2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search in table..."
                    className="pl-9 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {isEditing && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={addRow} 
                        title="Add Row"
                        className="flex-1 sm:flex-none"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Row</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={addColumn} 
                        title="Add Column"
                        className="flex-1 sm:flex-none"
                      >
                        <Columns3 className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Col</span>
                      </Button>
                    </>
                  )}
                  
                  <Button 
                    variant={isEditing ? "default" : "outline"} 
                    size="sm"
                    onClick={toggleEditing} 
                    title={isEditing ? "Disable Editing" : "Enable Editing"}
                    className="flex-1 sm:flex-none"
                  >
                    <Edit2 className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  
                  <Button 
                    variant={highlightEnabled ? "default" : "outline"} 
                    size="sm"
                    onClick={toggleHighlight} 
                    title={highlightEnabled ? "Disable Highlight" : "Enable Highlight"}
                    className="flex-1 sm:flex-none"
                  >
                    <Highlighter className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Find</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleFullScreen} 
                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                    className="hidden sm:flex flex-1 sm:flex-none"
                  >
                    {isFullScreen ? <Minimize2 className="h-4 w-4 mr-1" /> : <Maximize2 className="h-4 w-4 mr-1" />}
                    <span>Full</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={downloadXLSX} 
                    title="Download"
                    className="flex-1 sm:flex-none"
                  >
                    <Download className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={reset} 
                    title="Close"
                    className="flex-1 sm:flex-none"
                  >
                    <X className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Close</span>
                  </Button>
                </div>
              </div>
            </div>

            <Card className={cn("overflow-hidden flex flex-col", isFullScreen && "flex-1 min-h-0 h-full")}>
              <div 
                className={cn(
                  "overflow-auto border rounded-md custom-scrollbar",
                  isFullScreen ? "flex-1 h-full" : "max-h-[600px]"
                )} 
                onScroll={handleScroll}
              >
                <Table>
                  <TableHeader className="bg-muted/50 sticky top-0 z-10 shadow-sm">
                    <TableRow>
                      {isEditing && <TableHead className="w-10"></TableHead>}
                      {headers.map((header) => (
                        <TableHead key={header} className="whitespace-nowrap font-bold text-foreground group relative">
                          <div className="flex items-center gap-2">
                            {header}
                            {isEditing && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronDown className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => {
                                    const newName = prompt("Enter new column name:", header);
                                    if (newName) renameColumn(header, newName);
                                  }}>
                                    Rename
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive" onClick={() => deleteColumn(header)}>
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
                    {filteredData.length > 0 ? (
                      filteredData.slice(0, displayCount).map((row, idx) => (
                        <TableRow key={idx}>
                          {isEditing && (
                            <TableCell className="p-2">
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => deleteRow(idx)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TableCell>
                          )}
                          {headers.map((header, colIdx) => (
                            <TableCell 
                              key={`${idx}-${header}`} 
                              tabIndex={isEditing ? 0 : -1}
                              data-row={idx}
                              data-col={colIdx}
                              className={cn(
                                "whitespace-nowrap cursor-pointer border outline-none focus:ring-2 focus:ring-primary focus:ring-inset",
                                isEditing && "hover:bg-accent/50",
                                editCell?.rowIndex === idx && editCell?.colKey === header && "p-0 ring-2 ring-primary"
                              )}
                              onClick={() => handleCellClick(idx, header)}
                              onKeyDown={(e) => handleKeyDown(e, idx, colIdx)}
                            >
                              {editCell?.rowIndex === idx && editCell?.colKey === header ? (
                                <Input
                                  autoFocus
                                  className="h-9 border-0 rounded-none shadow-none focus-visible:ring-0 px-2 min-w-[150px]"
                                  value={String(row[header])}
                                  onChange={(e) => handleCellChange(idx, header, e.target.value)}
                                  onBlur={handleBlur}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === "Tab") {
                                      handleKeyDown(e, idx, colIdx);
                                    }
                                  }}
                                />
                              ) : (
                                <div className="px-2 py-2 min-w-[150px]">
                                  <HighlightText text={String(row[header])} highlight={searchTerm} />
                                </div>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={headers.length} className="h-24 text-center">
                          No results found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {filteredData.length > displayCount && (
                <div className="p-4 bg-muted/20 text-center text-sm text-muted-foreground border-t">
                  Scroll more to load more... ({displayCount} of {filteredData.length} shown)
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Related XLSX Tools Section */}
        <div className="mt-12 border-t pt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">More Excel Tools & Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/tools/xlsx-viewer/edit-without-excel">
              <Card className="cursor-pointer hover-elevate h-full transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-start justify-between gap-2">
                    <span>Edit Without Excel</span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Edit spreadsheets in your browser without needing Microsoft Excel installed.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/xlsx-viewer/view-large-files">
              <Card className="cursor-pointer hover-elevate h-full transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-start justify-between gap-2">
                    <span>View Large Files</span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Efficiently view and search massive Excel files with thousands of rows.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/xlsx-viewer/convert-and-edit">
              <Card className="cursor-pointer hover-elevate h-full transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-start justify-between gap-2">
                    <span>Convert & Edit</span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Convert between Excel, CSV, and JSON formats with full editing capabilities.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/xlsx-viewer/view-in-browser">
              <Card className="cursor-pointer hover-elevate h-full transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-start justify-between gap-2">
                    <span>View in Browser</span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View any Excel file directly in your browser without downloading or installing anything.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
