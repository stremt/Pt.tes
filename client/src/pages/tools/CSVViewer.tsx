import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Download, Search, X, Shield, Zap, FileSpreadsheet, Monitor, Maximize2, Minimize2, Highlighter, Edit2, Plus, Trash2, ChevronDown, Type, Undo2, Redo2, ClipboardPaste, ArrowRight, Copy, Columns3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

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
  const [pastedContent, setPastedContent] = useState("");
  const [showPaste, setShowPaste] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleCsvContent = useCallback((content: string, name: string = "pasted_data.csv") => {
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const newHeaders = Object.keys(results.data[0] as object);
          setHeaders(newHeaders);
          setData(results.data);
          setFileName(name);
          setDisplayCount(100);
          setHistory([results.data]);
          setHistoryIndex(0);
          toast({
            title: "Success",
            description: `Loaded ${results.data.length} rows`,
          });
        }
      },
      error: (error: Error) => {
        toast({
          variant: "destructive",
          title: "Parsing error",
          description: error.message,
        });
      },
    });
  }, [toast]);

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
      try {
        localStorage.setItem("csv_viewer_data", JSON.stringify(data));
        localStorage.setItem("csv_viewer_headers", JSON.stringify(headers));
        localStorage.setItem("csv_viewer_filename", fileName);
      } catch (e) {
        // Silently fail if quota exceeded as requested
        console.warn("Storage quota exceeded, data not saved locally");
      }
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

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleCsvContent(content, file.name);
    };
    reader.readAsText(file);
  }, [toast, handleCsvContent]);

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
    { step: 1, title: "Upload or Paste CSV", description: "Drag and drop your CSV file or paste raw CSV text directly into the tool. Our CSV reader online handles files of all sizes." },
    { step: 2, title: "Edit CSV without Excel", description: "Click any cell to edit. Use keyboard shortcuts, add/remove rows and columns, and rename headers with our free CSV editor." },
    { step: 3, title: "Export & Save", description: "Your changes are saved locally in your browser. Download the updated file as a CSV whenever you're ready." }
  ];

  const benefits = [
    { icon: <Shield className="h-6 w-6 text-primary" />, title: "100% Client-Side", description: "Privacy focused processing. Your data never leaves your computer; no data upload to any server." },
    { icon: <Zap className="h-6 w-6 text-primary" />, title: "Fast Rendering", description: "Optimized for large files. Open large CSV files smoothly without browser lag or memory issues." },
    { icon: <FileSpreadsheet className="h-6 w-6 text-primary" />, title: "No Software Needed", description: "The best way to edit CSV without Excel. Works entirely in your browser on any device." },
    { icon: <Monitor className="h-6 w-6 text-primary" />, title: "Developer Friendly", description: "Includes keyboard shortcuts, undo/redo, and row/column management for efficient data cleaning." }
  ];

  const faqs = [
    { question: "Is my CSV data safe when I use this tool?", answer: "Yes, completely. Your CSV file is processed entirely in your web browser and never sent to any server. We have no access to your data, and it's not stored on our servers. Your privacy is fully protected." },
    { question: "Can I edit CSV files and save my changes?", answer: "Yes. Enable editing mode and click any cell to make changes. You can add/remove rows and columns, rename headers, and use undo/redo. Changes are automatically saved to your browser's local storage and can be downloaded as a new CSV file." },
    { question: "What keyboard shortcuts are available for editing?", answer: "Use Enter to move down and Tab to move right between cells. Arrow keys navigate without editing. Start typing to edit a cell instantly. Shift+Enter goes up; Shift+Tab goes left. Use Undo/Redo buttons to revert changes." },
    { question: "Will my data be lost if I close the browser or refresh the page?", answer: "No. The tool automatically saves your progress to your browser's local storage. Your data will be there when you return, as long as you don't clear your browser's local storage or use private/incognito mode." },
    { question: "Can this tool handle large CSV files with thousands of rows?", answer: "Yes. The tool is optimized to handle large datasets smoothly. It uses lazy loading to display data efficiently, so thousands of rows load without slowdown. Scroll through massive files without performance issues." },
    { question: "Can I use this tool on my phone or tablet?", answer: "Yes. The tool works on any device with a web browser—phones, tablets, laptops, and desktops. The interface adapts to smaller screens, and you can upload files, paste data, and edit on the go." },
    { question: "Does this tool work without an internet connection?", answer: "Once the page is loaded, yes. All editing, viewing, and searching functions work offline. You only need internet to initially load the page or to access this link again later." },
    { question: "What file formats can this tool handle?", answer: "This tool specializes in CSV (comma-separated values) files. You can upload a CSV file, paste CSV data directly, or paste data from Excel/spreadsheets and convert it. Download your edited data as a CSV file." }
  ];

  return (
    <ToolLayout
      title="CSV Viewer & Editor"
      description="View, edit, and explore your CSV files directly in your browser with full spreadsheet capabilities."
      toolId="csv-viewer"
      category="developer"
      icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <Helmet>
        <title>CSV Viewer Online – Free CSV Editor & Reader | Pixocraft</title>
        <meta name="description" content="Use our free CSV Viewer Online to open, edit, and read CSV files without Excel. 100% client-side processing, privacy-focused, and fast rendering for large files." />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "CSV Viewer & Editor",
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
              "name": "How to open and edit CSV online",
              "step": howItWorks.map(step => ({
                "@type": "HowToStep",
                "name": step.title,
                "text": step.description
              }))
            }
          ])}
        </script>
      </Helmet>

      <div className="space-y-12">
        {/* Hero Section with Search Intent Keywords */}
        <section className="text-center space-y-4 pt-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            CSV Viewer Online – Free CSV Editor & Reader
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Open CSV files online, edit data without Excel, and manage large datasets instantly in your browser.
            Secure, private, and 100% client-side.
          </p>
        </section>

        {!data.length ? (
          <div className={cn("grid gap-6 transition-all duration-300", showPaste ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
            <Card className={cn("border-dashed border-2 transition-all hover:border-primary/50", showPaste && "md:h-[400px]")}>
              <CardContent
                {...getRootProps()}
                className="flex flex-col items-center justify-center p-12 h-full cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <input {...getInputProps()} />
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isDragActive ? "Drop your CSV here" : "Upload your CSV file"}
                </h3>
                <p className="text-muted-foreground text-center max-w-sm mb-6">
                  Drag and drop your file here, or click to browse.
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
                    <ClipboardPaste className="h-4 w-4" />
                    Or Paste CSV Data
                  </Button>
                )}
              </CardContent>
            </Card>

            {showPaste && (
              <Card className="flex flex-col md:h-[400px]">
                <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-2">
                    <ClipboardPaste className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Paste CSV Content</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowPaste(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <Textarea
                    placeholder="name,email,city\nJohn Doe,john@example.com,New York\nJane Smith,jane@example.com,London"
                    className="flex-1 font-mono text-sm resize-none"
                    value={pastedContent}
                    onChange={(e) => setPastedContent(e.target.value)}
                  />
                  <Button 
                    className="w-full" 
                    disabled={!pastedContent.trim()}
                    onClick={() => handleCsvContent(pastedContent)}
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
              {/* Top Row: File Info */}
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

              {/* Bottom Row: Search & Actions */}
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
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {isEditing && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          addRow();
                          toast({
                            title: "Success",
                            description: "New row added",
                          });
                        }}
                        title="Add Row"
                        className="flex-1 sm:flex-none"
                      >
                        <Copy className="h-4 w-4 sm:mr-1" />
                        <span>Add Row</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          addColumn();
                          toast({
                            title: "Success",
                            description: "New column added",
                          });
                        }}
                        title="Add Column"
                        className="flex-1 sm:flex-none"
                      >
                        <Columns3 className="h-4 w-4 sm:mr-1" />
                        <span>Add Col</span>
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
                    {isFullScreen ? <Minimize2 className="h-4 w-4 sm:mr-1" /> : <Maximize2 className="h-4 w-4 sm:mr-1" />}
                    <span>{isFullScreen ? "Min" : "Full"}</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={downloadCSV} 
                    title="Download"
                    className="flex-1 sm:flex-none"
                  >
                    <Download className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      const confirmed = window.confirm("Are you sure you want to close? Any unsaved changes will be lost.");
                      if (confirmed) reset();
                    }}
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
                  Scroll more to load more... ({displayCount} of {filteredData.length} shown)
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

        {/* Related CSV Tools Section */}
        <div className="mt-12 border-t pt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">More CSV Tools & Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/tools/csv-viewer/edit-without-excel">
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

            <Link href="/tools/csv-viewer/view-large-files">
              <Card className="cursor-pointer hover-elevate h-full transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-start justify-between gap-2">
                    <span>View Large Files</span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Efficiently view and search massive CSV files with thousands of rows.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/csv-viewer/convert-and-edit">
              <Card className="cursor-pointer hover-elevate h-full transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-start justify-between gap-2">
                    <span>Convert & Edit</span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Convert between Excel, JSON, and CSV formats with full editing capabilities.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/csv-viewer/view-in-browser">
              <Card className="cursor-pointer hover-elevate h-full transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-start justify-between gap-2">
                    <span>View in Browser</span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View any CSV file directly in your browser without downloading or installing anything.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      </section>

      {/* SEO Content Section */}
      <section className="mt-16 space-y-12 text-foreground max-w-4xl mx-auto px-4 pb-20">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">What is a CSV Viewer and Why Use it?</h2>
          <p className="text-lg leading-relaxed mb-4">
            A CSV Viewer is a specialized tool designed to open and read Comma-Separated Values files. While many people default to Microsoft Excel, using a <strong>CSV viewer online</strong> offers a faster, more lightweight alternative. Our tool allows you to <strong>open CSV file online</strong> instantly without waiting for heavy software to load.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            Whether you are a developer debugging data structures, an analyst performing quick data cleaning, or a student working on a project, our <strong>free CSV viewer</strong> provides the essential spreadsheet features you need without the bloat.
          </p>

          <h2 className="text-3xl font-bold mb-6">Why Open CSV Without Excel?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-8">
            <li className="bg-muted/30 p-4 rounded-lg border"><strong>Speed:</strong> Instant loading even for files with thousands of rows.</li>
            <li className="bg-muted/30 p-4 rounded-lg border"><strong>Privacy:</strong> 100% client-side processing means no data upload.</li>
            <li className="bg-muted/30 p-4 rounded-lg border"><strong>Accessibility:</strong> Works on any device with a browser—no installation required.</li>
            <li className="bg-muted/30 p-4 rounded-lg border"><strong>Ease of Use:</strong> Clean interface focused on viewing and editing CSV data.</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6">CSV vs Excel: A Quick Comparison</h2>
          <div className="overflow-x-auto mb-8 border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Feature</TableHead>
                  <TableHead className="font-bold">CSV Viewer</TableHead>
                  <TableHead className="font-bold">Microsoft Excel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">File Size Handling</TableCell>
                  <TableCell>Fast & Lightweight</TableCell>
                  <TableCell>Slow for large files</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Data Privacy</TableCell>
                  <TableCell>Client-side (Local)</TableCell>
                  <TableCell>May sync to cloud</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Formatting</TableCell>
                  <TableCell>Plain Text (Clean)</TableCell>
                  <TableCell>Complex Formatting</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Price</TableCell>
                  <TableCell>Free</TableCell>
                  <TableCell>Subscription Required</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h2 className="text-3xl font-bold mb-6">How to Open Large CSV Files Online</h2>
          <p className="text-lg leading-relaxed mb-4">
            Opening large datasets can often crash standard spreadsheet applications. Our <strong>CSV reader online</strong> uses optimized rendering to handle massive files smoothly. Simply drag your file into the upload zone, and our tool will process it in chunks, ensuring your browser remains responsive while you explore your data.
          </p>

          <h2 className="text-3xl font-bold mb-6">How to Edit CSV Online Step by Step</h2>
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start bg-muted/20 p-4 rounded-lg">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0">1</span>
              <div>
                <h3 className="font-bold">Upload Your File</h3>
                <p>Select your CSV file from your computer or drag it into the viewer zone.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-muted/20 p-4 rounded-lg">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="font-bold">Enable Editing Mode</h3>
                <p>Click the "Edit" button to unlock cell modifications. You can now change any value directly.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-muted/20 p-4 rounded-lg">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="font-bold">Modify Structure</h3>
                <p>Use the "Add Row" or "Add Col" buttons to expand your dataset as needed.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-muted/20 p-4 rounded-lg">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="font-bold">Download Result</h3>
                <p>Once finished, click "Download" to export your clean, updated CSV file.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Keyboard Shortcuts & Developer Tips</h2>
          <div className="bg-card border rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2"><Maximize2 className="h-5 w-5" /> Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><kbd className="bg-muted px-2 py-1 rounded">Enter</kbd> : Move to cell below</li>
                <li><kbd className="bg-muted px-2 py-1 rounded">Tab</kbd> : Move to cell on the right</li>
                <li><kbd className="bg-muted px-2 py-1 rounded">Arrows</kbd> : Navigate between cells</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2"><Edit2 className="h-5 w-5" /> Editing</h3>
              <ul className="space-y-2 text-sm">
                <li><kbd className="bg-muted px-2 py-1 rounded">Double Click</kbd> : Start editing cell</li>
                <li><kbd className="bg-muted px-2 py-1 rounded">Ctrl+Z</kbd> : Undo change</li>
                <li><kbd className="bg-muted px-2 py-1 rounded">Ctrl+Y</kbd> : Redo change</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Use Cases for Our CSV Tool</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Data Cleaning</h3>
              <p className="text-muted-foreground">Quickly fix typos, remove empty rows, or rename headers before importing data into another application.</p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Log Analysis</h3>
              <p className="text-muted-foreground">Open large log files in CSV format to search for specific errors or patterns without system lag.</p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Developer Debugging</h3>
              <p className="text-muted-foreground">Verify the structure of your database exports or API outputs instantly in a readable format.</p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Privacy-Sensitive Work</h3>
              <p className="text-muted-foreground">Work with sensitive PII (Personally Identifiable Information) safely knowing no data is ever uploaded to a server.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">Related Tools for Better Workflow</h2>
          <p className="mb-6">Enhance your data management with these integrated utilities:</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/tools/JSONCSVConverter">
              <Button variant="outline" size="sm" className="rounded-full">JSON to CSV Converter</Button>
            </Link>
            <Link href="/tools/XLSXToCSVConverter">
              <Button variant="outline" size="sm" className="rounded-full">Excel to CSV Online</Button>
            </Link>
            <Link href="/tools/PasswordGenerator">
              <Button variant="outline" size="sm" className="rounded-full">Secure Password Generator</Button>
            </Link>
            <Link href="/tools/TempMail">
              <Button variant="outline" size="sm" className="rounded-full">Temporary Email Service</Button>
            </Link>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
  );
}
