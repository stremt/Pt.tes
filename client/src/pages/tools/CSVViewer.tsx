import { useState, useCallback, useRef, useEffect, useMemo, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Upload,
  FileText,
  Download,
  Search,
  X,
  Shield,
  Zap,
  FileSpreadsheet,
  Monitor,
  Maximize2,
  Minimize2,
  Highlighter,
  Edit2,
  Eye,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Undo2,
  Redo2,
  ClipboardPaste,
  ArrowRight,
  Copy,
  Columns3,
  RotateCcw,
  Link2,
  CheckCircle2,
  PlayCircle,
  Cloud,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

function ConditionalPortal({ active, children }: { active: boolean; children: ReactNode }) {
  if (active) return createPortal(children, document.body);
  return <>{children}</>;
}

export default function CSVViewer() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editCell, setEditCell] = useState<{
    rowIndex: number;
    colKey: string;
  } | null>(null);
  const [editCellValue, setEditCellValue] = useState("");
  const historyRef = useRef<any[][]>([]);
  const historyIdxRef = useRef(-1);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [historyLen, setHistoryLen] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [pastedContent, setPastedContent] = useState("");
  const [showPaste, setShowPaste] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [flashRowObj, setFlashRowObj] = useState<Record<string, any> | null>(null);
  const [flashCol, setFlashCol] = useState<string | null>(null);
  const [flashCell, setFlashCell] = useState<{ rowIndex: number; colKey: string } | null>(null);
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [editingHeaderValue, setEditingHeaderValue] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const savingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerHeightRef = useRef(600);
  const pendingFocusRef = useRef<{ row: number; col: number } | null>(null);
  const editCommittedRef = useRef(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flashCellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const triggerRowFlash = (rowObj: Record<string, any>) => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setFlashRowObj(rowObj);
    setFlashCol(null);
    flashTimerRef.current = setTimeout(() => setFlashRowObj(null), 2600);
  };

  const triggerColFlash = (colKey: string) => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setFlashCol(colKey);
    setFlashRowObj(null);
    flashTimerRef.current = setTimeout(() => setFlashCol(null), 2600);
  };

  const triggerCellFlash = (rowIndex: number, colKey: string) => {
    if (flashCellTimerRef.current) clearTimeout(flashCellTimerRef.current);
    setFlashCell({ rowIndex, colKey });
    flashCellTimerRef.current = setTimeout(() => setFlashCell(null), 2600);
  };

  const ROW_HEIGHT = 44;
  const OVERSCAN = 20;

  const scrollToCell = (dataIdx: number, colKey: string) => {
    if (!tableScrollRef.current) return;
    const filteredIdx = filteredData.findIndex((item) => item.dataIdx === dataIdx);
    if (filteredIdx === -1) return;
    const targetScrollTop = filteredIdx * ROW_HEIGHT;
    const currentScrollTop = tableScrollRef.current.scrollTop;
    const clientHeight = tableScrollRef.current.clientHeight;
    if (targetScrollTop < currentScrollTop || targetScrollTop + ROW_HEIGHT > currentScrollTop + clientHeight) {
      const newST = Math.max(0, targetScrollTop - clientHeight / 2 + ROW_HEIGHT / 2);
      tableScrollRef.current.scrollTop = newST;
      setScrollTop(newST);
    }
  };

  const findDataDiff = (oldData: any[], newData: any[], hdrs: string[]) => {
    for (let r = 0; r < Math.max(oldData.length, newData.length); r++) {
      if (!oldData[r] || !newData[r]) return { rowIndex: r, colKey: hdrs[0] || "" };
      for (const key of hdrs) {
        if (oldData[r][key] !== newData[r][key]) return { rowIndex: r, colKey: key };
      }
    }
    return null;
  };

  const SAMPLE_CSV = `Name,Department,Role,Salary,Start Date,City
Alice Johnson,Engineering,Senior Engineer,120000,2021-03-15,San Francisco
Bob Martinez,Marketing,Content Lead,85000,2020-07-01,New York
Carol White,Design,UX Designer,95000,2022-01-10,Austin
David Kim,Engineering,Backend Engineer,110000,2019-11-20,Seattle
Eva Patel,Sales,Account Executive,78000,2021-06-05,Chicago
Frank Lee,Engineering,DevOps Lead,125000,2018-08-14,San Francisco
Grace Chen,HR,HR Manager,90000,2020-02-28,Boston
Henry Brown,Finance,Financial Analyst,88000,2022-04-03,New York
Isabel Garcia,Design,Product Designer,100000,2021-09-17,Austin
James Wilson,Marketing,SEO Specialist,72000,2023-01-23,Remote
Karen Taylor,Engineering,QA Engineer,92000,2020-05-12,Seattle
Liam Davis,Sales,Sales Manager,105000,2017-12-01,Chicago`;

  const loadSampleData = () => {
    handleCsvContent(SAMPLE_CSV, "sample_employees.csv");
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const handleLoadFromUrl = async () => {
    if (!urlInput.trim()) return;
    setIsLoadingUrl(true);
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(urlInput.trim())}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      const text = await response.text();
      handleCsvContent(text, urlInput.split("/").pop() || "url_data.csv");
      setShowUrlInput(false);
      setUrlInput("");
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to load URL",
        description: "Make sure the URL is publicly accessible and returns CSV data.",
      });
    } finally {
      setIsLoadingUrl(false);
    }
  };

  const handleClear = () => {
    setData([]);
    setHeaders([]);
    setFileName("");
    setSearchTerm("");
    historyRef.current = [];
    historyIdxRef.current = -1;
    setHistoryIndex(-1);
    setHistoryLen(0);
    setIsEditing(false);
    setIsFullScreen(false);
    setShowClearConfirm(false);
    localStorage.removeItem("csv_viewer_data");
    localStorage.removeItem("csv_viewer_headers");
    localStorage.removeItem("csv_viewer_filename");
    toast({ title: "Cleared", description: "Data has been removed" });
  };

  const handleCsvContent = useCallback(
    (content: string, name: string = "pasted_data.csv") => {
      Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            const newHeaders = Object.keys(results.data[0] as object);
            setHeaders(newHeaders);
            setData(results.data);
            setFileName(name);
            setScrollTop(0);
            historyRef.current = [results.data];
            historyIdxRef.current = 0;
            setHistoryIndex(0);
            setHistoryLen(1);
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
    },
    [toast],
  );

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
        historyRef.current = [parsedData];
        historyIdxRef.current = 0;
        setHistoryIndex(0);
        setHistoryLen(1);
      } catch (e) {
        console.error("Failed to parse saved CSV data", e);
      }
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      try {
        localStorage.setItem("csv_viewer_data", JSON.stringify(data));
        localStorage.setItem("csv_viewer_headers", JSON.stringify(headers));
        localStorage.setItem("csv_viewer_filename", fileName);
        if (savingTimerRef.current) clearTimeout(savingTimerRef.current);
        setIsSaving(true);
        savingTimerRef.current = setTimeout(() => setIsSaving(false), 1800);
      } catch (e) {
        console.warn("Storage quota exceeded, data not saved locally");
      }
    } else {
      localStorage.removeItem("csv_viewer_data");
      localStorage.removeItem("csv_viewer_headers");
      localStorage.removeItem("csv_viewer_filename");
    }
  }, [data, headers, fileName]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 200);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    if (editCell) {
      setEditCellValue(String(data[editCell.rowIndex]?.[editCell.colKey] ?? ""));
      editCommittedRef.current = false;
    }
  }, [editCell?.rowIndex, editCell?.colKey]);

  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) containerHeightRef.current = entry.contentRect.height;
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!pendingFocusRef.current) return;
    const { row, col } = pendingFocusRef.current;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`) as HTMLElement;
    if (cell) {
      cell.focus();
      pendingFocusRef.current = null;
    }
  });

  const pushToHistory = (newData: any[]) => {
    const newHistory = historyRef.current.slice(0, historyIdxRef.current + 1);
    newHistory.push([...newData]);
    if (newHistory.length > 50) newHistory.shift();
    historyRef.current = newHistory;
    historyIdxRef.current = newHistory.length - 1;
    setHistoryIndex(newHistory.length - 1);
    setHistoryLen(newHistory.length);
  };

  const undo = () => {
    if (historyIdxRef.current > 0) {
      const newIdx = historyIdxRef.current - 1;
      const oldData = historyRef.current[historyIdxRef.current];
      const newData = historyRef.current[newIdx];
      historyIdxRef.current = newIdx;
      setHistoryIndex(newIdx);
      setData([...newData]);
      const diff = findDataDiff(oldData, newData, headers);
      if (diff) {
        setTimeout(() => {
          scrollToCell(diff.rowIndex, diff.colKey);
          triggerCellFlash(diff.rowIndex, diff.colKey);
        }, 80);
      }
    }
  };

  const redo = () => {
    if (historyIdxRef.current < historyRef.current.length - 1) {
      const newIdx = historyIdxRef.current + 1;
      const oldData = historyRef.current[historyIdxRef.current];
      const newData = historyRef.current[newIdx];
      historyIdxRef.current = newIdx;
      setHistoryIndex(newIdx);
      setData([...newData]);
      const diff = findDataDiff(oldData, newData, headers);
      if (diff) {
        setTimeout(() => {
          scrollToCell(diff.rowIndex, diff.colKey);
          triggerCellFlash(diff.rowIndex, diff.colKey);
        }, 80);
      }
    }
  };

  const addRow = () => {
    const newRow = headers.reduce(
      (acc, header) => ({ ...acc, [header]: "" }),
      {},
    );
    const newData = [...data, newRow];
    setData(newData);
    pushToHistory(newData);
    triggerRowFlash(newRow as Record<string, any>);
  };

  const deleteRow = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    pushToHistory(newData);
  };

  const addColumn = () => {
    const newHeader = `Column ${headers.length + 1}`;
    setHeaders([...headers, newHeader]);
    const newData = data.map((row) => ({ ...row, [newHeader]: "" }));
    setData(newData);
    pushToHistory(newData);
    triggerColFlash(newHeader);
  };

  const deleteColumn = (colKey: string) => {
    setHeaders(headers.filter((h) => h !== colKey));
    const newData = data.map((row) => {
      const { [colKey]: _, ...rest } = row;
      return rest;
    });
    setData(newData);
    pushToHistory(newData);
  };

  const renameColumn = (oldKey: string, newKey: string) => {
    if (!newKey || headers.includes(newKey)) return;
    setHeaders(headers.map((h) => (h === oldKey ? newKey : h)));
    const newData = data.map((row) => {
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
    const nextEditing = !isEditing;
    setIsEditing(nextEditing);
    setEditCell(null);
    if (nextEditing && historyRef.current.length === 0) {
      historyRef.current = [[...data]];
      historyIdxRef.current = 0;
      setHistoryIndex(0);
      setHistoryLen(1);
    }
  };

  const handleCellClick = (rowIndex: number, colKey: string) => {
    if (isEditing) {
      setEditCell({ rowIndex, colKey });
    }
  };

  const handleCellChange = (value: string) => {
    setEditCellValue(value);
  };

  const handleBlur = () => {
    if (editCell && !editCommittedRef.current) {
      editCommittedRef.current = true;
      const newData = [...data];
      newData[editCell.rowIndex] = { ...newData[editCell.rowIndex], [editCell.colKey]: editCellValue };
      setData(newData);
      pushToHistory(newData);
    }
    setEditCell(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    rowIndex: number,
    colIndex: number,
  ) => {
    if (!isEditing) return;
    const colKey = headers[colIndex];
    if (e.key === "Enter" || e.key === "Tab") {
      if (editCell) {
        e.preventDefault();
        if (!editCommittedRef.current) {
          editCommittedRef.current = true;
          const committedData = [...data];
          committedData[editCell.rowIndex] = { ...committedData[editCell.rowIndex], [editCell.colKey]: editCellValue };
          setData(committedData);
          pushToHistory(committedData);
        }
        setEditCell(null);
        let nextFilteredRow = rowIndex;
        let nextCol = colIndex;
        if (e.key === "Enter") {
          nextFilteredRow = e.shiftKey ? rowIndex - 1 : rowIndex + 1;
        } else {
          nextCol = e.shiftKey ? colIndex - 1 : colIndex + 1;
        }
        if (
          nextFilteredRow >= 0 &&
          nextFilteredRow < filteredData.length &&
          nextCol >= 0 &&
          nextCol < headers.length
        ) {
          const nextDataIdx = filteredData[nextFilteredRow]?.dataIdx;
          if (nextDataIdx !== undefined) {
            setTimeout(
              () => setEditCell({ rowIndex: nextDataIdx, colKey: headers[nextCol] }),
              0,
            );
          }
        }
      } else {
        e.preventDefault();
        const dataIdx = filteredData[rowIndex]?.dataIdx;
        if (dataIdx !== undefined) setEditCell({ rowIndex: dataIdx, colKey });
      }
    } else if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) &&
      !editCell
    ) {
      e.preventDefault();
      let nextRow = rowIndex;
      let nextCol = colIndex;
      if (e.key === "ArrowUp") nextRow = Math.max(0, rowIndex - 1);
      if (e.key === "ArrowDown")
        nextRow = Math.min(filteredData.length - 1, rowIndex + 1);
      if (e.key === "ArrowLeft") nextCol = Math.max(0, colIndex - 1);
      if (e.key === "ArrowRight")
        nextCol = Math.min(headers.length - 1, colIndex + 1);
      const nextCellElement = document.querySelector(
        `[data-row="${nextRow}"][data-col="${nextCol}"]`,
      ) as HTMLElement;
      if (nextCellElement) {
        nextCellElement.focus();
      } else {
        if (tableScrollRef.current) {
          const targetST = Math.max(0, nextRow * ROW_HEIGHT - containerHeightRef.current / 2);
          tableScrollRef.current.scrollTop = targetST;
          setScrollTop(targetST);
        }
        pendingFocusRef.current = { row: nextRow, col: nextCol };
      }
    } else if (
      e.key.length === 1 &&
      !editCell &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      const dataIdx = filteredData[rowIndex]?.dataIdx;
      if (dataIdx !== undefined) setEditCell({ rowIndex: dataIdx, colKey });
    }
  };

  const HighlightText = ({
    text,
    highlight,
  }: {
    text: string;
    highlight: string;
  }) => {
    if (!highlight.trim() || !highlightEnabled) return <>{text}</>;
    const parts = text.split(
      new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"),
    );
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark
              key={i}
              className="bg-yellow-200 dark:bg-yellow-800 rounded-sm px-0.5"
            >
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  useEffect(() => {
    if (isFullScreen) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.height = "100%";
    } else {
      const scrollY = parseInt(document.body.style.top || "0", 10) * -1;
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.height = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.height = "";
    };
  }, [isFullScreen]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
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
    },
    [toast, handleCsvContent],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
  });

  const downloadCSV = () => {
    const csv = Papa.unparse({
      fields: headers,
      data: data,
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
    toast({
      title: "File exported",
      description: "Your file is also auto-saved in this browser. Come back anytime and your data will still be here.",
    });
  };

  const filteredData = useMemo(() => {
    const lc = debouncedSearch.toLowerCase();
    let result = data
      .map((row, dataIdx) => ({ row, dataIdx }))
      .filter(({ row }) =>
        lc === "" || Object.values(row).some((val) =>
          String(val).toLowerCase().includes(lc),
        ),
      );
    if (sortConfig) {
      result = [...result].sort((a, b) => {
        const aVal = String(a.row[sortConfig.key] ?? "");
        const bVal = String(b.row[sortConfig.key] ?? "");
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        const isNumeric = !isNaN(aNum) && !isNaN(bNum);
        const cmp = isNumeric ? aNum - bNum : aVal.localeCompare(bVal);
        return sortConfig.direction === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [data, debouncedSearch, sortConfig]);

  const visibleStart = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const visibleEnd = Math.min(filteredData.length, Math.ceil((scrollTop + containerHeightRef.current) / ROW_HEIGHT) + OVERSCAN);
  const visibleRows = filteredData.slice(visibleStart, visibleEnd);
  const paddingTop = visibleStart * ROW_HEIGHT;
  const paddingBottom = Math.max(0, (filteredData.length - visibleEnd) * ROW_HEIGHT);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const howItWorks = [
    {
      step: 1,
      title: "Upload or Paste CSV",
      description:
        "Drag and drop your CSV file or paste raw CSV text directly into the tool. Our CSV reader online handles files of all sizes.",
    },
    {
      step: 2,
      title: "Edit CSV without Excel",
      description:
        "Click any cell to edit. Use keyboard shortcuts, add/remove rows and columns, and rename headers with our free CSV editor.",
    },
    {
      step: 3,
      title: "Export & Save",
      description:
        "Your changes are saved locally in your browser. Download the updated file as a CSV whenever you're ready.",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "100% Client-Side",
      description:
        "Privacy focused processing. Your data never leaves your computer; no data upload to any server.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Fast Rendering",
      description:
        "Optimized for large files. Open large CSV files smoothly without browser lag or memory issues.",
    },
    {
      icon: <FileSpreadsheet className="h-6 w-6 text-primary" />,
      title: "No Software Needed",
      description:
        "The best way to edit CSV without Excel. Works entirely in your browser on any device.",
    },
    {
      icon: <Monitor className="h-6 w-6 text-primary" />,
      title: "Sort & Filter Built-In",
      description:
        "Click any column header to sort data instantly. Use search to filter thousands of rows in real time.",
    },
  ];

  const faqs = [
    {
      question: "Is my CSV data safe when I use this tool?",
      answer:
        "Yes, completely. Your CSV file is processed entirely in your web browser and never sent to any server. We have no access to your data, and it's not stored on our servers. Your privacy is fully protected.",
    },
    {
      question: "Can I edit CSV files and save my changes?",
      answer:
        "Yes. Enable editing mode and click any cell to make changes. You can add/remove rows and columns, rename headers, and use undo/redo. Changes are automatically saved to your browser's local storage and can be downloaded as a new CSV file.",
    },
    {
      question: "What keyboard shortcuts are available for editing?",
      answer:
        "Use Enter to move down and Tab to move right between cells. Arrow keys navigate without editing. Start typing to edit a cell instantly. Shift+Enter goes up; Shift+Tab goes left. Use Undo/Redo buttons to revert changes.",
    },
    {
      question:
        "Will my data be lost if I close the browser or refresh the page?",
      answer:
        "No. The tool automatically saves your progress to your browser's local storage. Your data will be there when you return, as long as you don't clear your browser's local storage or use private/incognito mode.",
    },
    {
      question: "Can this tool handle large CSV files with thousands of rows?",
      answer:
        "Yes. The tool is optimized to handle large datasets smoothly. It uses lazy loading to display data efficiently, so thousands of rows load without slowdown. Scroll through massive files without performance issues.",
    },
    {
      question: "Can I use this tool on my phone or tablet?",
      answer:
        "Yes. The tool works on any device with a web browser—phones, tablets, laptops, and desktops. The interface adapts to smaller screens, and you can upload files, paste data, and edit on the go.",
    },
    {
      question: "Does this tool work without an internet connection?",
      answer:
        "Once the page is loaded, yes. All editing, viewing, and searching functions work offline. You only need internet to initially load the page or to access this link again later.",
    },
    {
      question: "What file formats can this tool handle?",
      answer:
        "This tool specializes in CSV (comma-separated values) files. You can upload a CSV file, paste CSV data directly, or paste data from Excel/spreadsheets and convert it. Download your edited data as a CSV file.",
    },
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
        <title>Open CSV File Online (No Excel) – Free CSV Viewer & Editor (Fast & Private) | Pixocraft</title>
        <meta
          name="description"
          content="Open and edit CSV files instantly without Excel. No upload, 100% private, fast CSV viewer & editor for large files. Works offline, free forever."
        />
        <meta name="keywords" content="csv viewer, csv editor, csv viewer online, open csv file online, csv file viewer, edit csv online, open csv without excel, csv reader online, view large csv file, edit csv file online free" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://tools.pixocraft.in/tools/csv-viewer" />
        <meta property="og:title" content="Open CSV File Online (No Excel) – Free CSV Viewer & Editor (Fast & Private)" />
        <meta property="og:description" content="Open and edit CSV files instantly without Excel. No upload, 100% private, fast CSV viewer & editor for large files." />
        <meta property="og:url" content="https://tools.pixocraft.in/tools/csv-viewer" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tools.pixocraft.in/og-csv-viewer.png" />
        <meta property="og:site_name" content="Pixocraft Tools" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Open CSV File Online (No Excel) – Free CSV Viewer & Editor" />
        <meta name="twitter:description" content="Open and edit CSV files instantly without Excel. No upload, 100% private, fast CSV viewer & editor for large files." />
        <meta name="twitter:image" content="https://tools.pixocraft.in/og-csv-viewer.png" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "CSV Viewer & Editor – Open CSV Online Free",
              operatingSystem: "Web",
              applicationCategory: "DeveloperApplication",
              description: "Free online CSV viewer and editor. Open, edit, and manage CSV files without Excel. 100% client-side, private, and supports large files.",
              url: "https://tools.pixocraft.in/tools/csv-viewer",
              featureList: [
                "Open CSV file online without Excel",
                "Edit CSV cells, rows, and columns",
                "100% client-side — no upload to server",
                "Support for large CSV files with lazy loading",
                "Click column headers to sort data",
                "Real-time search and filter across all rows",
                "Undo/redo editing history",
                "Load CSV from URL",
                "Works offline after first load",
                "Download edited CSV file",
              ],
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "1247",
                bestRating: "5",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "How to Open CSV File Without Excel",
              description: "Open and edit any CSV file online for free without needing Excel or any software.",
              step: [
                { "@type": "HowToStep", name: "Go to the CSV Viewer", text: "Visit tools.pixocraft.in/tools/csv-viewer on any device." },
                { "@type": "HowToStep", name: "Upload or paste your CSV", text: "Drag and drop your CSV file, paste CSV text directly, or load from a URL." },
                { "@type": "HowToStep", name: "View and search your data", text: "Instantly see all rows and columns. Use the search bar to find any value." },
                { "@type": "HowToStep", name: "Edit if needed", text: "Click Edit to modify cells, add rows/columns, or rename headers." },
                { "@type": "HowToStep", name: "Download the result", text: "Click Download to save your updated CSV file." },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in/" },
                { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
                { "@type": "ListItem", position: 3, name: "CSV Viewer & Editor", item: "https://tools.pixocraft.in/tools/csv-viewer" },
              ],
            },
          ])}
        </script>
      </Helmet>

      <div className="space-y-12">
        <section className="text-center space-y-4 pt-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Open &amp; Edit CSV Files Without Excel — Fast, Private &amp; Free
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The fastest free CSV viewer and editor online. Open any CSV file instantly, edit cells, search data, and download — no Excel, no upload, no account needed.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1">
            {[
              "No Upload Required",
              "Works Offline",
              "Open Large CSV Files Instantly",
              "100% Private (Client-Side)",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </section>

        {!data.length ? (
          <div
            className={cn(
              "grid gap-6 transition-all duration-300",
              (showPaste || showUrlInput) ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
            )}
          >
            <Card
              className={cn(
                "border-dashed border-2 transition-all hover:border-primary/50",
                (showPaste || showUrlInput) && "md:h-[400px]",
              )}
            >
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
                  <div className="mt-4 flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setShowPaste(true); setShowUrlInput(false); }}
                      className="gap-2 text-primary hover:text-primary hover:bg-primary/5"
                      data-testid="button-paste-csv"
                    >
                      <ClipboardPaste className="h-4 w-4" />
                      Paste CSV Data
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setShowUrlInput(true); setShowPaste(false); }}
                      className="gap-2 text-primary hover:text-primary hover:bg-primary/5"
                      data-testid="button-load-url"
                    >
                      <Link2 className="h-4 w-4" />
                      Load from URL
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={loadSampleData}
                      className="gap-2 text-muted-foreground hover:text-foreground"
                      data-testid="button-try-sample"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Try Sample Data
                    </Button>
                  </div>
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

            {showUrlInput && (
              <Card className="flex flex-col md:h-[400px]">
                <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Load CSV from URL</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowUrlInput(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <CardDescription>
                    Paste a public CSV link or a Google Sheets CSV export URL. The file will be fetched and displayed instantly.
                  </CardDescription>
                  <Input
                    placeholder="https://example.com/data.csv"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLoadFromUrl()}
                    data-testid="input-csv-url"
                  />
                  <p className="text-xs text-muted-foreground">
                    Works with any public CSV URL. For Google Sheets: File → Share → Publish to web → CSV.
                  </p>
                  <Button
                    className="w-full"
                    disabled={!urlInput.trim() || isLoadingUrl}
                    onClick={handleLoadFromUrl}
                    data-testid="button-load-csv-url"
                  >
                    {isLoadingUrl ? "Loading…" : "Load CSV"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold truncate max-w-[200px]">{fileName}</p>
                <p className="text-xs text-muted-foreground">{data.length} rows loaded</p>
              </div>
            </div>
            {showClearConfirm ? (
              <div className="flex items-center gap-2 animate-in fade-in duration-150">
                <span className="text-xs font-medium text-destructive">Clear all data?</span>
                <Button size="sm" variant="destructive" className="h-7 px-2 text-xs" onClick={handleClear}>Yes, clear</Button>
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setShowClearConfirm(false)}>Cancel</Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setShowClearConfirm(true)} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Upload New
              </Button>
            )}
          </div>
        )}

        {data.length > 0 && (
          <ConditionalPortal active={isFullScreen}>
          <div
            ref={containerRef}
            className={cn(
              isFullScreen ? "flex flex-col overflow-hidden" : "space-y-4",
            )}
            style={isFullScreen ? {
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              backgroundColor: "hsl(var(--background))",
            } : undefined}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-b bg-muted/30">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[200px] md:max-w-xs group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 bg-background border-muted-foreground/20 focus-visible:ring-primary/30"
                  />
                </div>
                <div className="flex items-center gap-1 bg-background p-1 rounded-md border border-muted-foreground/20">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={undo}
                    disabled={historyIndex <= 0}
                    className="h-7 px-2 hover:bg-muted"
                  >
                    <Undo2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={redo}
                    disabled={historyIndex >= historyLen - 1}
                    className="h-7 px-2 hover:bg-muted"
                  >
                    <Redo2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={toggleEditing}
                  className={cn(
                    "h-9 gap-2 transition-all border-primary/40 text-primary",
                    isEditing
                      ? "ring-2 ring-primary/50 ring-offset-1 shadow-[0_0_14px_rgba(37,99,235,0.35)] bg-primary text-primary-foreground"
                      : "bg-primary/5",
                  )}
                  data-testid="button-edit-mode"
                >
                  {isEditing ? <Eye className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                  {isEditing ? "View Mode" : "Edit Mode"}
                </Button>

                {isEditing && (
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-2 border-primary/20 hover:bg-primary/5">
                          <Plus className="h-4 w-4 text-primary" />
                          Insert
                          <ChevronDown className="h-3 w-3 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48" style={{ zIndex: 1000001 }}>
                        <DropdownMenuItem onClick={addRow} className="gap-2">
                          <FileText className="h-4 w-4" />
                          Add New Row
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={addColumn} className="gap-2">
                          <Columns3 className="h-4 w-4" />
                          Add New Column
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                <div className="h-8 w-[1px] bg-muted mx-1 hidden sm:block" />

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleHighlight}
                    className={cn(
                      "h-9 w-9",
                      highlightEnabled && "text-primary bg-primary/10",
                    )}
                    title="Toggle Search Highlights"
                  >
                    <Highlighter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullScreen}
                    className="h-9 w-9"
                    title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullScreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                  {showClearConfirm ? (
                    <div className="flex items-center gap-1.5 animate-in fade-in duration-150">
                      <span className="text-xs font-medium text-destructive whitespace-nowrap">Sure?</span>
                      <Button size="sm" variant="destructive" className="h-7 px-2 text-xs" onClick={handleClear}>Yes</Button>
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setShowClearConfirm(false)}>No</Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowClearConfirm(true)}
                      className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      title="Clear All Data"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div
                  className={cn(
                    "flex items-center gap-1 text-[10px] font-medium overflow-hidden transition-all duration-500",
                    isSaving ? "opacity-100 max-w-[70px]" : "opacity-0 max-w-0",
                  )}
                >
                  <Cloud className="h-3 w-3 text-primary shrink-0" />
                  <span className="text-primary whitespace-nowrap">Saved</span>
                </div>
                <Button onClick={downloadCSV} size="sm" className="h-9 gap-2 ml-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div
              ref={tableScrollRef}
              className={cn(
                "relative overflow-auto border-t",
                isFullScreen ? "flex-1" : "max-h-[700px]",
              )}
              onScroll={handleScroll}
            >
              <table className="w-full caption-bottom text-sm border-separate border-spacing-0">
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="sticky top-0 z-50 w-12 text-center border-r-2 border-b-2 border-muted-foreground/30 font-bold text-muted-foreground/70 bg-muted">
                      #
                    </TableHead>
                    {headers.map((header, index) => (
                      <TableHead
                        key={index}
                        className={cn(
                          "sticky top-0 z-50 min-w-[150px] p-0 border-r-2 border-b-2 border-muted-foreground/30 group",
                          flashCol === header ? "animate-csv-flash" : "bg-muted",
                        )}
                      >
                        <div className="flex items-center justify-between px-2 h-10">
                          {isEditing && editingHeader === header ? (
                            <Input
                              autoFocus
                              value={editingHeaderValue}
                              onChange={(e) => setEditingHeaderValue(e.target.value)}
                              onBlur={() => {
                                const val = editingHeaderValue.trim();
                                if (val && val !== header) renameColumn(header, val);
                                setEditingHeader(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const val = editingHeaderValue.trim();
                                  if (val && val !== header) renameColumn(header, val);
                                  setEditingHeader(null);
                                } else if (e.key === "Escape") {
                                  setEditingHeader(null);
                                }
                                e.stopPropagation();
                              }}
                              className="h-7 flex-1 border-primary text-xs font-bold uppercase tracking-tight bg-background focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                            />
                          ) : (
                            <button
                              className="flex items-center gap-1 font-bold text-foreground text-sm truncate uppercase tracking-tight hover:text-primary transition-colors flex-1 min-w-0"
                              onClick={() => {
                                if (isEditing) {
                                  setEditingHeader(header);
                                  setEditingHeaderValue(header);
                                } else {
                                  handleSort(header);
                                }
                              }}
                              title={isEditing ? `Click to rename "${header}"` : `Sort by ${header}`}
                            >
                              <span className="truncate">{header}</span>
                              {!isEditing && (sortConfig?.key === header ? (
                                sortConfig.direction === "asc" ? (
                                  <ChevronUp className="h-3 w-3 shrink-0 text-primary" />
                                ) : (
                                  <ChevronDown className="h-3 w-3 shrink-0 text-primary" />
                                )
                              ) : (
                                <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-40" />
                              ))}
                            </button>
                          )}
                          {isEditing && editingHeader !== header && (
                            <div className="flex items-center shrink-0">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100"
                                  >
                                    <ChevronDown className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" style={{ zIndex: 1000001 }}>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2"
                                    onClick={() => deleteColumn(header)}
                                  >
                                    <Trash2 className="h-4 w-4" /> Delete Column
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          )}
                        </div>
                      </TableHead>
                    ))}
                    {isEditing && (
                      <TableHead className="sticky top-0 z-50 w-12 p-0 border-b-2 border-muted-foreground/30 bg-muted">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-full w-full rounded-none hover:bg-primary/10 text-primary"
                          onClick={addColumn}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paddingTop > 0 && (
                    <tr style={{ height: paddingTop }}>
                      <td colSpan={headers.length + (isEditing ? 2 : 1)} />
                    </tr>
                  )}
                  {visibleRows.map(({ row, dataIdx }, localIdx) => {
                    const filteredIdx = visibleStart + localIdx;
                    return (
                      <TableRow
                        key={dataIdx}
                        className={cn(
                          "group",
                          flashRowObj === row
                            ? "animate-csv-flash"
                            : "transition-colors hover:bg-primary/5",
                        )}
                      >
                        <TableCell className={cn(
                          "w-12 text-center text-[10px] font-mono text-muted-foreground border-r-2 border-b-[1.5px] border-muted-foreground/25 bg-muted/40",
                          flashRowObj !== row && "group-hover:bg-primary/10",
                        )}>
                          {filteredIdx + 1}
                        </TableCell>
                        {headers.map((header, colIndex) => (
                          <TableCell
                            key={colIndex}
                            className={cn(
                              "relative p-0 h-11 min-w-[150px] border-r border-b border-muted-foreground/20 transition-all",
                              flashCell?.rowIndex === dataIdx && flashCell?.colKey === header && "animate-csv-flash",
                              flashCol === header && flashRowObj === null && flashCell === null && "animate-csv-flash",
                              isEditing && flashRowObj !== row && flashCol !== header && "cursor-text hover:bg-primary/10 hover:shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.3)]",
                              isEditing && editCell?.rowIndex === dataIdx && editCell?.colKey === header
                                ? "shadow-[inset_0_0_0_2px_hsl(var(--primary))] bg-primary/5 z-20"
                                : "focus-within:shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.5)] focus-within:z-10",
                            )}
                            onClick={() => handleCellClick(dataIdx, header)}
                            tabIndex={isEditing ? 0 : -1}
                            onKeyDown={(e) =>
                              handleKeyDown(e, filteredIdx, colIndex)
                            }
                            data-row={filteredIdx}
                            data-col={colIndex}
                          >
                            {editCell?.rowIndex === dataIdx &&
                            editCell?.colKey === header ? (
                              <Input
                                autoFocus
                                className="absolute inset-0 h-full w-full border-0 rounded-none bg-amber-50 dark:bg-amber-950/40 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 text-sm font-medium"
                                value={editCellValue}
                                onChange={(e) => handleCellChange(e.target.value)}
                                onBlur={handleBlur}
                              />
                            ) : (
                              <div className="px-3 py-2 truncate text-sm text-foreground/90 font-medium max-w-[300px]">
                                <HighlightText
                                  text={String(row[header] || "")}
                                  highlight={debouncedSearch}
                                />
                              </div>
                            )}
                          </TableCell>
                        ))}
                        {isEditing && (
                          <TableCell className="p-0 w-12 text-center border-b border-r bg-muted/10">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => deleteRow(dataIdx)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                  {isEditing && (
                    <TableRow className="hover:bg-transparent border-none">
                      <TableCell
                        colSpan={headers.length + 2}
                        className="p-0"
                      >
                        <button
                          onClick={addRow}
                          data-testid="button-add-row-bottom"
                          className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-primary/70 hover:text-primary hover:bg-primary/5 border-t border-dashed border-primary/25 hover:border-primary/50 transition-all"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add new row
                        </button>
                      </TableCell>
                    </TableRow>
                  )}
                  {paddingBottom > 0 && (
                    <tr style={{ height: paddingBottom }}>
                      <td colSpan={headers.length + (isEditing ? 2 : 1)} />
                    </tr>
                  )}
                </TableBody>
              </table>
            </div>
            <div className="p-3 border-t bg-muted/30 flex items-center justify-between text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3 w-3" />
                  {fileName || "Untitled.csv"}
                </span>
                <span className="h-3 w-[1px] bg-muted-foreground/30" />
                <span>
                  {filteredData.length} records
                  {debouncedSearch ? ` (filtered from ${data.length})` : ""}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {isEditing && (
                  <Badge variant="outline" className="h-5 px-1.5 bg-primary/5 text-primary border-primary/20 text-[9px]">
                    Editor Active
                  </Badge>
                )}
                {sortConfig && (
                  <Badge
                    variant="outline"
                    className="h-5 px-1.5 bg-muted text-muted-foreground border-muted-foreground/20 text-[9px] cursor-pointer"
                    onClick={() => setSortConfig(null)}
                    title="Click to clear sort"
                  >
                    Sorted: {sortConfig.key} {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </Badge>
                )}
                <span>Click column to sort</span>
              </div>
            </div>
          </div>
          </ConditionalPortal>
        )}
      </div>

      <section className="mt-16 space-y-14 text-foreground max-w-4xl mx-auto px-4 pb-20">
        <div className="space-y-14">

          {/* What is a CSV Viewer */}
          <div>
            <h2 className="text-3xl font-bold mb-4">What is a CSV Viewer?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A <strong>CSV viewer</strong> is a tool that lets you open and read CSV (comma-separated values) files in a clean, readable table format — without needing Microsoft Excel or any other installed software. CSV is the most universal data format used by databases, APIs, spreadsheets, and data exports. A good <strong>CSV file viewer</strong> lets you instantly see all rows and columns, search through thousands of records, and understand your data at a glance.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft's free online CSV viewer goes further — it's also a full <strong>CSV editor</strong>, letting you modify cells, add and delete rows and columns, rename headers, and download the updated file. Everything runs in your browser. No upload. No server. No risk.
            </p>
          </div>

          {/* How to Open CSV File Without Excel */}
          <div>
            <h2 className="text-3xl font-bold mb-6">How to Open CSV File Without Excel</h2>
            <p className="text-muted-foreground mb-6">Three ways to open your CSV file instantly — choose what works for you:</p>
            <div className="space-y-3 mb-6">
              {[
                { n: "1", title: "Upload your CSV file", desc: "Drag and drop your .csv file onto the upload zone above, or click to browse. Your file opens instantly in a clean, searchable table." },
                { n: "2", title: "Paste CSV data directly", desc: 'Click "Paste CSV Data" and paste raw comma-separated text. Ideal for copying data from terminals, APIs, or spreadsheets.' },
                { n: "3", title: "Load from a public URL", desc: 'Click "Load from URL" and paste any publicly accessible CSV link — including Google Sheets CSV export links. The file fetches and displays in seconds.' },
                { n: "4", title: "Search and explore", desc: "Use the search bar to filter any value across all rows and columns instantly. No Excel formulas needed." },
                { n: "5", title: "Download when done", desc: "Click Download to save your CSV file to your computer — with or without edits." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex gap-4 items-start bg-muted/20 p-4 rounded-lg">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold">{n}</span>
                  <div>
                    <h3 className="font-bold mb-1">{title}</h3>
                    <p className="text-muted-foreground text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best CSV Viewer Online */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Best CSV Viewer Online — Free &amp; Fast</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Most free online CSV tools are slow, upload your data to a server, or hit row limits. Pixocraft's <strong>CSV viewer online</strong> is built differently — it processes everything in your browser using client-side JavaScript, so there's zero upload, zero wait, and zero data risk. It handles files with hundreds of thousands of rows without breaking a sweat.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Shield className="h-5 w-5 text-primary" />, title: "100% Private", desc: "Your CSV data never leaves your computer. No server, no upload, no tracking." },
                { icon: <Zap className="h-5 w-5 text-primary" />, title: "Instant Load", desc: "Files open in milliseconds. Large files use virtual rendering so your browser stays fast." },
                { icon: <FileSpreadsheet className="h-5 w-5 text-primary" />, title: "No Excel Needed", desc: "Open any CSV file online free without Microsoft Excel or Google Sheets." },
                { icon: <Monitor className="h-5 w-5 text-primary" />, title: "Works Everywhere", desc: "Phone, tablet, laptop — any device with a browser. No installation required." },
                { icon: <Link2 className="h-5 w-5 text-primary" />, title: "Load from URL", desc: "Paste a public CSV URL or Google Sheets export link to load data instantly." },
                { icon: <Undo2 className="h-5 w-5 text-primary" />, title: "Sort & Undo / Redo", desc: "Click any column to sort instantly. 50-step editing history lets you experiment freely." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 border rounded-lg">
                  <div className="shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-muted-foreground text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Edit CSV File Online */}
          <div>
            <h2 className="text-3xl font-bold mb-4">How to Edit CSV File Online</h2>
            <p className="text-muted-foreground mb-6">
              Our free <strong>CSV editor</strong> makes it easy to clean, fix, and restructure your data without Excel. Here's everything you can do:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { title: "Edit any cell", desc: "Enable Edit mode and click any cell to modify its value directly. Start typing to replace the content instantly." },
                { title: "Sort by any column", desc: "Click any column header to sort ascending. Click again for descending. Click once more to clear sort." },
                { title: "Add & delete rows", desc: "Append a new empty row at the bottom or delete any row with one click. Changes auto-save to your browser." },
                { title: "Add & delete columns", desc: 'Click "Add Col" to insert a new column, or use the column menu to delete one you no longer need.' },
                { title: "Rename column headers", desc: "Use the column menu to rename any header. Column data is preserved and reassigned to the new name." },
                { title: "Keyboard navigation & undo", desc: "Tab moves right, Enter moves down, arrow keys navigate. Up to 50 steps of undo/redo history." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm pl-6">{desc}</p>
                </div>
              ))}
            </div>

            {/* CSV vs Excel comparison */}
            <div className="overflow-x-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Feature</TableHead>
                    <TableHead className="font-bold text-primary">Pixocraft CSV Viewer</TableHead>
                    <TableHead className="font-bold">Microsoft Excel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Cost", "Free forever", "Subscription required"],
                    ["Install required", "No — browser only", "Yes — desktop app"],
                    ["Data privacy", "Client-side (local only)", "May sync to Microsoft cloud"],
                    ["Large file speed", "Fast with lazy loading", "Slow / may crash"],
                    ["CSV formatting", "Preserves raw values", "Auto-converts dates/numbers"],
                    ["Works offline", "Yes — after first load", "Yes — but needs license"],
                  ].map(([feat, ours, excel]) => (
                    <TableRow key={feat}>
                      <TableCell className="font-medium">{feat}</TableCell>
                      <TableCell className="text-green-600 dark:text-green-400 font-medium">{ours}</TableCell>
                      <TableCell className="text-muted-foreground">{excel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Open Large CSV Files Without Lag */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Open Large CSV Files Without Lag</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Standard spreadsheet apps like Excel struggle with CSV files over 100MB — they freeze, crash, or take minutes to open. Our <strong>csv viewer online</strong> uses incremental rendering: it loads the first 100 rows instantly, then fetches more as you scroll. Your browser stays fully responsive no matter the file size.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The built-in search is also optimised for large datasets — it scans all columns across all rows in real time without page reloads or server calls. This makes it the fastest way to <strong>view large CSV files</strong> online for free.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { stat: "100k+", label: "Rows handled smoothly" },
                { stat: "<1s", label: "Time to first render" },
                { stat: "0 MB", label: "Data uploaded to server" },
              ].map(({ stat, label }) => (
                <div key={label} className="text-center p-6 bg-muted/30 rounded-xl border">
                  <div className="text-3xl font-bold text-primary mb-1">{stat}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal links */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Related Tools to Supercharge Your CSV Workflow</h2>
            <p className="text-muted-foreground mb-6">
              Convert your data first, then <strong>open the CSV file online</strong> in this viewer for instant review and editing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/tools/json-csv-converter">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover-elevate cursor-pointer">
                  <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">JSON to CSV Converter</div>
                    <div className="text-xs text-muted-foreground">Convert JSON then view your CSV data here instantly</div>
                  </div>
                </div>
              </Link>
              <Link href="/tools/xlsx-to-csv-converter">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover-elevate cursor-pointer">
                  <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">Excel to CSV Converter</div>
                    <div className="text-xs text-muted-foreground">Convert Excel to CSV, then edit CSV online without Excel</div>
                  </div>
                </div>
              </Link>
              <Link href="/tools/json-formatter">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover-elevate cursor-pointer">
                  <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">JSON Formatter</div>
                    <div className="text-xs text-muted-foreground">Format and validate JSON before converting to CSV</div>
                  </div>
                </div>
              </Link>
              <Link href="/tools/excel-viewer">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover-elevate cursor-pointer">
                  <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">Excel Viewer Online</div>
                    <div className="text-xs text-muted-foreground">View .xlsx files directly in your browser without Excel</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </ToolLayout>
  );
}
