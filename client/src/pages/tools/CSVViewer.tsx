import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Download, Search, X, Shield, Zap, FileSpreadsheet, Monitor, Maximize2, Minimize2, Highlighter, Edit2, Plus, Trash2, ChevronDown, Type, Undo2, Redo2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function CSVViewer() {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("csv_viewer_data");
    const savedHeaders = localStorage.getItem("csv_viewer_headers");
    const savedFileName = localStorage.getItem("csv_viewer_filename");

    if (savedData && savedHeaders && savedFileName) {
      try {
        const parsedData = JSON.parse(savedData);
        const parsedHeaders = JSON.parse(savedHeaders);
        setData(parsedData);
        setHeaders(parsedHeaders);
        setFileName(savedFileName);
        // Initialize history with loaded data
        setHistory([parsedData]);
        setHistoryIndex(0);
      } catch (e) {
        console.error("Failed to parse saved CSV data", e);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("csv_viewer_data", JSON.stringify(data));
      localStorage.setItem("csv_viewer_headers", JSON.stringify(headers));
      localStorage.setItem("csv_viewer_filename", fileName);
    } else {
      localStorage.removeItem("csv_viewer_data");
      localStorage.removeItem("csv_viewer_headers");
      localStorage.removeItem("csv_viewer_filename");
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
    } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && !editCell) {
      e.preventDefault();
      let nextRow = rowIndex;
      let nextCol = colIndex;

      if (e.key === "ArrowUp") nextRow = Math.max(0, rowIndex - 1);
      if (e.key === "ArrowDown") nextRow = Math.min(data.length - 1, rowIndex + 1);
      if (e.key === "ArrowLeft") nextCol = Math.max(0, colIndex - 1);
      if (e.key === "ArrowRight") nextCol = Math.min(headers.length - 1, colIndex + 1);

      const nextCellElement = document.querySelector(`[data-row="${nextRow}"][data-col="${nextCol}"]`) as HTMLElement;
      if (nextCellElement) nextCellElement.focus();
    } else if (e.key.length === 1 && !editCell && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Start typing directly
      setEditCell({ rowIndex, colKey });
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

    if (!file.name.endsWith(".csv")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a valid CSV file.",
      });
      return;
    }

    setFileName(file.name);
    setDisplayCount(100);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          setHeaders(Object.keys(results.data[0] as object));
          setData(results.data);
          toast({
            title: "Success",
            description: `Loaded ${results.data.length} rows from ${file.name}`,
          });
        }
      },
      error: (error) => {
        toast({
          variant: "destructive",
          title: "Parsing error",
          description: error.message,
        });
      },
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
  });

  const downloadCSV = () => {
    const csv = Papa.unparse({
      fields: headers,
      data: data
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName || "data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    { step: 1, title: "Upload CSV", description: "Drag and drop your CSV file or click to browse and select it from your device." },
    { step: 2, title: "View Data", description: "The tool automatically detects headers and displays your data in a clean, scrollable table." },
    { step: 3, title: "Search & Export", description: "Use the search bar to find specific entries and export the viewed data if needed." }
  ];

  const benefits = [
    { icon: <Shield className="h-6 w-6 text-primary" />, title: "Privacy First", description: "Your data stays in your browser. No files are uploaded to our servers." },
    { icon: <Zap className="h-6 w-6 text-primary" />, title: "Lightning Fast", description: "Built for speed, handling large datasets without performance lag." },
    { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "Auto-Header Detection", description: "Automatically identifies and maps your CSV headers." },
    { icon: <Monitor className="h-6 w-6 text-primary" />, title: "Large File Support", description: "View thousands of rows smoothly with optimized rendering." }
  ];

  const faqs = [
    { question: "Is my data safe?", answer: "Yes, this is a client-side tool. Your CSV file is processed entirely in your web browser and is never uploaded to any server." },
    { question: "Can it handle large CSV files?", answer: "Yes, the tool is optimized to load and scroll through large CSV files smoothly." },
    { question: "Does it support nested headers?", answer: "Standard CSV files with a single header row are supported best. It auto-detects the first row as headers." }
  ];

  return (
    <ToolLayout
      title="CSV Viewer"
      description="View and explore your CSV files directly in your browser with privacy. No data leaves your machine."
      toolId="csv-viewer"
      category="utility"
      icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <Helmet>
        <title>CSV Viewer - View CSV Files Online Privately | Pixocraft Tools</title>
        <meta name="description" content="Free online CSV viewer. Open, view, and search CSV files directly in your browser. Privacy-focused, fast, and handles large files. No upload needed." />
      </Helmet>

      <div className="space-y-6">
        {!data.length ? (
          <Card className="border-dashed border-2">
            <CardContent
              {...getRootProps()}
              className="flex flex-col items-center justify-center p-12 cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <input {...getInputProps()} />
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isDragActive ? "Drop your CSV here" : "Upload your CSV file"}
              </h3>
              <p className="text-muted-foreground text-center max-w-sm">
                Drag and drop your file here, or click to browse. Supported formats: .csv
              </p>
            </CardContent>
          </Card>
        ) : (
          <div 
            ref={containerRef}
            className={cn(
              "space-y-4 transition-all duration-300",
              isFullScreen && "fixed inset-0 z-[100] bg-background p-4 sm:p-8 overflow-hidden h-screen w-screen m-0"
            )}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="bg-primary/10 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="truncate max-w-[200px] sm:max-w-xs">
                  <p className="font-medium truncate">{fileName}</p>
                  <p className="text-xs text-muted-foreground">{data.length} rows detected</p>
                </div>
                {isEditing && (
                  <div className="flex items-center gap-1 ml-2">
                    <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0} title="Undo">
                      <Undo2 className="h-4 w-4 mr-1" /> Undo
                    </Button>
                    <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo">
                      <Redo2 className="h-4 w-4 mr-1" /> Redo
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search in table..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {isEditing && (
                  <>
                    <Button variant="outline" size="sm" onClick={addRow} title="Add Row">
                      <Plus className="h-4 w-4 mr-1" /> Row
                    </Button>
                    <Button variant="outline" size="sm" onClick={addColumn} title="Add Column">
                      <Plus className="h-4 w-4 mr-1" /> Col
                    </Button>
                  </>
                )}
                <Button 
                  variant={isEditing ? "default" : "outline"} 
                  size="icon" 
                  onClick={toggleEditing} 
                  title={isEditing ? "Disable Editing" : "Enable Editing"}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={highlightEnabled ? "default" : "outline"} 
                  size="icon" 
                  onClick={toggleHighlight} 
                  title={highlightEnabled ? "Disable Highlight" : "Enable Highlight"}
                >
                  <Highlighter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleFullScreen} 
                  title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                  className="hidden sm:inline-flex"
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={downloadCSV} title="Download Original">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={reset} title="Close">
                  <X className="h-4 w-4" />
                </Button>
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
                                    <Type className="h-4 w-4 mr-2" /> Rename
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
                  Loading more rows... ({displayCount} of {filteredData.length} shown)
                </div>
              )}
              {filteredData.length <= displayCount && data.length > 0 && (
                <div className="p-4 bg-muted/20 text-center text-sm text-muted-foreground border-t">
                  All {filteredData.length} rows shown.
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
