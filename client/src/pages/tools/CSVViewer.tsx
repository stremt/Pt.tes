import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Download, Search, X, Shield, Zap, FileSpreadsheet, Monitor, Maximize2, Minimize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";

export default function CSVViewer() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

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
    const csv = Papa.unparse(data);
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

            <Card className={cn("overflow-hidden flex flex-col", isFullScreen && "flex-1 min-h-0")}>
              <div 
                className={cn(
                  "overflow-auto border rounded-md",
                  isFullScreen ? "flex-1" : "max-h-[600px]"
                )} 
                onScroll={handleScroll}
              >
                <Table>
                  <TableHeader className="bg-muted/50 sticky top-0 z-10 shadow-sm">
                    <TableRow>
                      {headers.map((header) => (
                        <TableHead key={header} className="whitespace-nowrap font-bold text-foreground">
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.slice(0, displayCount).map((row, idx) => (
                        <TableRow key={idx}>
                          {headers.map((header) => (
                            <TableCell key={`${idx}-${header}`} className="whitespace-nowrap">
                              {String(row[header])}
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
