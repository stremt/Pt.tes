import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import {
  useSEO,
  StructuredData,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  PenTool,
  Shield,
  Zap,
  Smartphone,
  Star,
  Check,
  FileText,
  Mail,
  Globe,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  AlertCircle,
  BadgeCheck,
  Upload,
  Type,
  Download,
  Trash2,
  Undo2,
  Redo2,
  FileCheck,
  MousePointer,
  Receipt,
  Briefcase,
  FilePen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from "pdf-lib";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const CANONICAL = "https://tools.pixocraft.in/tools/add-signature-to-pdf";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

// ── Handwriting fonts for the Type tab ────────────────────────────────────────
const FONTS = [
  "Great Vibes", "Sacramento", "Dancing Script", "Pinyon Script",
  "Allura", "Parisienne", "Alex Brush", "Satisfy", "Courgette",
  "Kaushan Script", "Cookie", "Merienda", "Italianno", "Lobster",
];

const FAQS = [
  {
    question: "How do I sign a PDF online?",
    answer:
      "Use this tool's four-step workflow: (1) Create your signature by drawing, typing your name, or uploading an image. (2) Upload your PDF file. (3) Click the location on the PDF preview where you want your signature placed. (4) Click Download Signed PDF to get your finished document. The entire process takes under 30 seconds.",
  },
  {
    question: "Is adding a signature to PDF free?",
    answer:
      "Yes — 100% free, forever. No subscription, no watermark on the signed PDF, no hidden upgrade. Sign unlimited PDFs at no cost.",
  },
  {
    question: "Is it legal to sign a PDF with an electronic signature in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 and its 2008 Amendment (Section 3A), electronic signatures — including image-based signatures embedded in PDFs — are legally recognised for contracts, GST invoices, NDAs, employment letters, and most business agreements. For MCA ROC filings, court submissions, and property registration, a certified DSC is required.",
  },
  {
    question: "Can I use this to sign a GST invoice PDF?",
    answer:
      "Yes. GST invoices require the signature of the supplier or their authorised representative. Embedding your signature PNG into a GST invoice PDF satisfies this requirement for manually generated invoices. Download the signed PDF and share or archive as needed.",
  },
  {
    question: "Does this tool work on mobile phones?",
    answer:
      "Yes. The Draw tab supports single-touch signature input on any smartphone or tablet. PDF upload, preview, and signature placement all work on mobile browsers including Chrome, Safari, and Firefox for iOS and Android.",
  },
  {
    question: "Is my PDF or signature stored on your servers?",
    answer:
      "Never. This tool runs 100% inside your browser. Your PDF, your signature, and the signed output are all processed locally using PDF.js and pdf-lib. Nothing is ever uploaded to any server or stored anywhere.",
  },
  {
    question: "How do I insert a signature into a PDF?",
    answer:
      "Create your signature in Step 1 (draw, type, or upload). Upload your PDF in Step 2. In Step 3, click anywhere on the PDF preview where you want the signature placed. The tool previews the placement. Click Download Signed PDF to embed the signature and download the finished document.",
  },
  {
    question: "Can I sign multiple pages?",
    answer:
      "Yes. Use the page navigator in Step 3 to switch between PDF pages and click to place your signature on each page where needed. Each page placement is tracked independently, and the final download includes all your signature placements across all pages.",
  },
  {
    question: "What format should my signature be in?",
    answer:
      "For best results, create your signature using the Draw or Type tab on this page — the output is automatically a transparent PNG at optimal resolution. If you have an existing signature image, upload it in the Upload tab for automatic background removal before proceeding to the PDF step.",
  },
  {
    question: "How long does signing a PDF take?",
    answer:
      "The entire process — creating a signature, uploading a PDF, placing the signature, and downloading the signed result — takes under 30 seconds for most documents. Processing happens instantly in your browser with no server round-trips.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Create your signature",       description: "Draw freehand, type your name in a handwriting font, or upload an existing signature. Click Confirm Signature when done." },
  { step: 2, title: "Upload your PDF",              description: "Click Upload PDF or drag and drop your file. The PDF preview loads instantly — all processing happens in your browser." },
  { step: 3, title: "Click to place signature",    description: "Click anywhere on the PDF page preview to position your signature. Use the page navigator for multi-page documents." },
  { step: 4, title: "Download your signed PDF",    description: "Click Download Signed PDF. pdf-lib embeds your signature at the exact position and outputs a clean, ready-to-use PDF." },
];

// ── INLINE TOOL COMPONENT ──────────────────────────────────────────────────────
function AddSignatureToPDFTool() {
  const { toast } = useToast();

  // ─ Step state ─
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // ─ Step 1: Signature creation ─
  const [sigMode, setSigMode] = useState<"draw" | "type">("draw");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [inkColor, setInkColor] = useState("#1a1a2e");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [signaturePng, setSignaturePng] = useState<string | null>(null); // base64 data URL

  // ─ Step 2 / 3: PDF state ─
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfPreviews, setPdfPreviews] = useState<Record<number, string>>({}); // page → dataURL
  const [placements, setPlacements] = useState<Record<number, { x: number; y: number; relX: number; relY: number }>>({});
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewSize, setPreviewSize] = useState({ w: 0, h: 0 });
  const [sigSizePct, setSigSizePct] = useState(25); // % of page width
  const [pdfLoading, setPdfLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // ─ Canvas draw helpers ─────────────────────────────────────────────────────
  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    setHistory((h) => [...h.slice(-19), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    setRedoStack([]);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    saveHistory();
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = getCtx();
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas || history.length === 0) return;
    setRedoStack((r) => [...r, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    const prev = history[history.length - 1];
    ctx.putImageData(prev, 0, 0);
    setHistory((h) => h.slice(0, -1));
  };

  const redo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas || redoStack.length === 0) return;
    setHistory((h) => [...h, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    const next = redoStack[redoStack.length - 1];
    ctx.putImageData(next, 0, 0);
    setRedoStack((r) => r.slice(0, -1));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    saveHistory();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // ─ Confirm signature → get PNG ─────────────────────────────────────────────
  const confirmSignature = useCallback(() => {
    if (sigMode === "draw") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Check if anything was drawn (compare to blank canvas)
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const hasContent = Array.from(data).some((v, i) => i % 4 !== 3 && v < 250);
      if (!hasContent) { toast({ title: "Draw your signature first", variant: "destructive" }); return; }
      // Render to transparent PNG
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const octx = offscreen.getContext("2d");
      if (!octx) return;
      octx.drawImage(canvas, 0, 0);
      // Remove white background → transparent
      const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const r = imgData.data[i], g = imgData.data[i + 1], b = imgData.data[i + 2];
        if (r > 230 && g > 230 && b > 230) imgData.data[i + 3] = 0;
      }
      octx.putImageData(imgData, 0, 0);
      setSignaturePng(offscreen.toDataURL("image/png"));
      setStep(2);
    } else {
      // Type mode
      if (!typedName.trim()) { toast({ title: "Type your name first", variant: "destructive" }); return; }
      const canvas = document.createElement("canvas");
      canvas.width = 800; canvas.height = 200;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, 800, 200);
      ctx.font = `80px '${selectedFont}', cursive`;
      ctx.fillStyle = inkColor;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(typedName, 400, 100);
      setSignaturePng(canvas.toDataURL("image/png"));
      setStep(2);
    }
  }, [sigMode, typedName, selectedFont, inkColor, toast]);

  // ─ PDF upload & render ─────────────────────────────────────────────────────
  const renderPage = useCallback(async (file: File, pageNum: number, cacheObj: Record<number, string>) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await getDocument({ data: arrayBuffer }).promise;
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return cacheObj;
    await page.render({ canvasContext: ctx, viewport }).promise;
    return { ...cacheObj, [pageNum]: canvas.toDataURL("image/png") };
  }, []);

  const handlePdfUpload = useCallback(async (file: File) => {
    if (!file.type.includes("pdf")) { toast({ title: "Please upload a PDF file", variant: "destructive" }); return; }
    setPdfLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await getDocument({ data: arrayBuffer }).promise;
      const count = pdfDoc.numPages;
      setPdfPageCount(count);
      setPdfFile(file);
      setCurrentPage(1);
      setPlacements({});
      // Render first page immediately
      let cache: Record<number, string> = {};
      cache = await renderPage(file, 1, cache);
      setPdfPreviews(cache);
      setStep(3);
    } catch {
      toast({ title: "Failed to load PDF. Please try another file.", variant: "destructive" });
    } finally {
      setPdfLoading(false);
    }
  }, [toast, renderPage]);

  // Render a page on demand
  const goToPage = useCallback(async (page: number) => {
    setCurrentPage(page);
    if (!pdfPreviews[page] && pdfFile) {
      const updated = await renderPage(pdfFile, page, pdfPreviews);
      setPdfPreviews(updated);
    }
  }, [pdfFile, pdfPreviews, renderPage]);

  // ─ Click-to-place signature ────────────────────────────────────────────────
  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const div = previewRef.current;
    if (!div) return;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = x / rect.width;
    const relY = y / rect.height;
    setPlacements((p) => ({ ...p, [currentPage]: { x, y, relX, relY } }));
    setPreviewSize({ w: rect.width, h: rect.height });
  };

  // ─ Download signed PDF ─────────────────────────────────────────────────────
  const downloadSigned = useCallback(async () => {
    if (!pdfFile || !signaturePng || Object.keys(placements).length === 0) {
      toast({ title: "Place your signature on the PDF first", variant: "destructive" });
      return;
    }
    setDownloadLoading(true);
    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Convert signature PNG to bytes
      const res = await fetch(signaturePng);
      const sigBlob = await res.blob();
      const sigBytes = await sigBlob.arrayBuffer();
      const sigImage = await pdfDoc.embedPng(sigBytes);

      const pages = pdfDoc.getPages();

      for (const [pageNumStr, placement] of Object.entries(placements)) {
        const pageNum = Number(pageNumStr);
        const pdfPage = pages[pageNum - 1];
        if (!pdfPage) continue;

        const { width: pw, height: ph } = pdfPage.getSize();
        const sigWidth = pw * (sigSizePct / 100);
        const aspect = sigImage.height / sigImage.width;
        const sigHeight = sigWidth * aspect;

        // PDF coordinate system: origin is bottom-left
        const x = placement.relX * pw - sigWidth / 2;
        const y = ph - placement.relY * ph - sigHeight / 2;

        pdfPage.drawImage(sigImage, {
          x: Math.max(0, Math.min(x, pw - sigWidth)),
          y: Math.max(0, Math.min(y, ph - sigHeight)),
          width: sigWidth,
          height: sigHeight,
        });
      }

      const outputBytes = await pdfDoc.save();
      const blob = new Blob([outputBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `signed-${pdfFile.name}`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Signed PDF downloaded successfully" });
    } catch {
      toast({ title: "Failed to create signed PDF. Please try again.", variant: "destructive" });
    } finally {
      setDownloadLoading(false);
    }
  }, [pdfFile, signaturePng, placements, sigSizePct, toast]);

  const resetAll = () => {
    setStep(1);
    setSignaturePng(null);
    setPdfFile(null);
    setPdfPreviews({});
    setPlacements({});
    clearCanvas();
  };

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-xl border bg-card overflow-hidden mb-6">
      {/* Step indicator */}
      <div className="border-b bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-1 flex-wrap">
          {HOW_TO_STEPS.map(({ step: s, title }) => (
            <div key={s} className="flex items-center gap-1">
              <span className={`h-6 w-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</span>
              <span className={`text-xs hidden sm:inline font-medium ${step === s ? "text-foreground" : "text-muted-foreground"}`}>{title}</span>
              {s < 4 && <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-5">

        {/* ── STEP 1: Create signature ── */}
        {step === 1 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Step 1 — Create your signature</p>
            {/* Mode tabs */}
            <div className="flex gap-2 mb-4">
              {(["draw", "type"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSigMode(m)}
                  data-testid={`tab-sig-${m}`}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${sigMode === m ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-transparent hover-elevate"}`}
                >
                  {m === "draw" ? <PenTool className="h-4 w-4" /> : <Type className="h-4 w-4" />}
                  {m === "draw" ? "Draw" : "Type"}
                </button>
              ))}
            </div>

            {sigMode === "draw" && (
              <>
                <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">Ink:</span>
                    <input type="color" value={inkColor} onChange={(e) => setInkColor(e.target.value)} className="h-7 w-7 rounded cursor-pointer border" data-testid="input-ink-color" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">Width: {strokeWidth}px</span>
                    <input type="range" min={1} max={8} value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="w-20" data-testid="input-stroke-width" />
                  </div>
                  <div className="flex gap-1 ml-auto">
                    <Button size="icon" variant="ghost" onClick={undo} disabled={history.length === 0} data-testid="button-undo"><Undo2 className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={redo} disabled={redoStack.length === 0} data-testid="button-redo"><Redo2 className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={clearCanvas} data-testid="button-clear"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={200}
                  className="w-full rounded-lg border bg-white cursor-crosshair touch-none"
                  style={{ maxHeight: 160 }}
                  onMouseDown={startDraw}
                  onMouseMove={draw}
                  onMouseUp={endDraw}
                  onMouseLeave={endDraw}
                  onTouchStart={startDraw}
                  onTouchMove={draw}
                  onTouchEnd={endDraw}
                  data-testid="canvas-draw"
                />
                <p className="text-xs text-muted-foreground mt-1">Draw your signature above using mouse or touch</p>
              </>
            )}

            {sigMode === "type" && (
              <>
                <input
                  type="text"
                  placeholder="Type your name..."
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  className="w-full rounded-lg border bg-background px-4 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  data-testid="input-typed-name"
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto mb-3 pr-1">
                  {FONTS.map((font) => (
                    <button
                      key={font}
                      onClick={() => setSelectedFont(font)}
                      data-testid={`font-option-${font.replace(/\s/g, "-")}`}
                      className={`rounded-lg border px-3 py-2 text-left transition-colors ${selectedFont === font ? "border-primary bg-primary/5" : "hover-elevate"}`}
                      style={{ fontFamily: `'${font}', cursive`, fontSize: 18 }}
                    >
                      {typedName || "Signature"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-muted-foreground text-xs">Ink:</span>
                  <input type="color" value={inkColor} onChange={(e) => setInkColor(e.target.value)} className="h-7 w-7 rounded cursor-pointer border" data-testid="input-ink-color-type" />
                </div>
              </>
            )}

            <div className="mt-4">
              <Button onClick={confirmSignature} className="gap-2 w-full sm:w-auto" data-testid="button-confirm-signature">
                <Check className="h-4 w-4" />
                Confirm Signature — Continue to PDF
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Upload PDF ── */}
        {step === 2 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Step 2 — Upload your PDF</p>
            <p className="text-xs text-muted-foreground mb-4">Your signature is ready. Now upload the PDF you want to sign.</p>
            {signaturePng && (
              <div className="mb-4 flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <img src={signaturePng} alt="Your signature" className="h-10 bg-white rounded border" />
                <div className="text-sm text-muted-foreground">Signature confirmed</div>
                <Button size="icon" variant="ghost" onClick={() => setStep(1)} data-testid="button-edit-sig" className="ml-auto shrink-0"><PenTool className="h-4 w-4" /></Button>
              </div>
            )}
            <label
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-muted/30 hover-elevate cursor-pointer p-10 transition-colors"
              data-testid="label-pdf-upload"
            >
              <Upload className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-semibold text-foreground text-sm">Upload PDF to sign</p>
                <p className="text-xs text-muted-foreground mt-1">Click or drag & drop · PDF files only · processed locally</p>
              </div>
              <input
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handlePdfUpload(e.target.files[0])}
                data-testid="input-pdf-upload"
              />
            </label>
            {pdfLoading && <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2"><span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />Loading PDF preview…</p>}
          </div>
        )}

        {/* ── STEP 3: Place signature + Download ── */}
        {step === 3 && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <p className="text-sm font-semibold text-foreground">Step 3 — Click to place signature on PDF</p>
              <div className="flex gap-2">
                {pdfPageCount > 1 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground border rounded-lg px-2 py-1">
                    <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage <= 1} className="disabled:opacity-30 px-1" data-testid="button-prev-page">‹</button>
                    <span>Page {currentPage} / {pdfPageCount}</span>
                    <button onClick={() => currentPage < pdfPageCount && goToPage(currentPage + 1)} disabled={currentPage >= pdfPageCount} className="disabled:opacity-30 px-1" data-testid="button-next-page">›</button>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground border rounded-lg px-2 py-1">
                  <span>Size: {sigSizePct}%</span>
                  <input type="range" min={5} max={50} value={sigSizePct} onChange={(e) => setSigSizePct(Number(e.target.value))} className="w-16" data-testid="input-sig-size" />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Click anywhere on the PDF preview to position your signature.</p>

            <div
              ref={previewRef}
              className="relative w-full rounded-xl border overflow-hidden cursor-crosshair bg-muted/30"
              style={{ maxHeight: 480 }}
              onClick={handlePreviewClick}
              data-testid="div-pdf-preview"
            >
              {pdfPreviews[currentPage] ? (
                <img src={pdfPreviews[currentPage]} alt={`PDF page ${currentPage}`} className="w-full object-contain" draggable={false} />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                  <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full mr-2" />Loading page…
                </div>
              )}
              {placements[currentPage] && signaturePng && previewRef.current && (
                <img
                  src={signaturePng}
                  alt="Placed signature"
                  className="absolute pointer-events-none"
                  style={{
                    left: placements[currentPage].x - (previewRef.current.getBoundingClientRect().width * sigSizePct / 100 / 2),
                    top: placements[currentPage].y - 20,
                    width: `${sigSizePct}%`,
                  }}
                />
              )}
              {!placements[currentPage] && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-xl bg-black/50 text-white text-sm px-4 py-2 flex items-center gap-2">
                    <MousePointer className="h-4 w-4" />
                    Click to place your signature
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                onClick={downloadSigned}
                disabled={downloadLoading || Object.keys(placements).length === 0}
                className="gap-2"
                data-testid="button-download-signed"
              >
                {downloadLoading
                  ? <span className="h-4 w-4 animate-spin border-2 border-primary-foreground border-t-transparent rounded-full" />
                  : <Download className="h-4 w-4" />
                }
                Download Signed PDF
              </Button>
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2" data-testid="button-change-pdf">
                <Upload className="h-4 w-4" />
                Change PDF
              </Button>
              <Button variant="ghost" onClick={resetAll} className="gap-2" data-testid="button-start-over">
                <Trash2 className="h-4 w-4" />
                Start Over
              </Button>
            </div>

            {Object.keys(placements).length > 0 && (
              <p className="text-xs text-muted-foreground mt-3">
                Signature placed on {Object.keys(placements).length} page{Object.keys(placements).length > 1 ? "s" : ""}.
                {" "}Click a different spot to reposition on the current page.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="border-t px-5 py-2 bg-muted/20">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Lock className="h-3 w-3" />
          100% private · All processing happens in your browser · No upload to any server
        </p>
      </div>
    </div>
  );
}

// ── PAGE COMPONENT ─────────────────────────────────────────────────────────────
const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,   title: "GST Invoices",            desc: "Embed your signature directly into GST invoice PDFs. Satisfies the CBIC signature requirement for manually generated invoices." },
  { icon: <FileText className="h-5 w-5 text-primary" />,  title: "Contracts & Agreements",   desc: "Sign freelance contracts, NDAs, service agreements, and employment letters — legally valid under the IT Act 2000." },
  { icon: <FilePen className="h-5 w-5 text-primary" />,   title: "Offer Letters",            desc: "HR teams can sign and send offer letters as signed PDFs without printing, scanning, or external tools." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Freelancing Documents",    desc: "Proposals, SOWs, client agreements — sign and deliver professional PDFs in seconds, every time." },
  { icon: <Globe className="h-5 w-5 text-primary" />,     title: "Government Forms",         desc: "Many government form submissions accept image-embedded signatures in PDF. Download and submit directly." },
  { icon: <Mail className="h-5 w-5 text-primary" />,      title: "Business Correspondence",  desc: "Letters, memos, and formal business documents signed and ready to email as clean PDFs." },
];

const TIPS = [
  { title: "Always use PNG for signature", body: "PNG supports transparency — your signature overlays cleanly on any PDF background without a white box. The tool automatically exports as transparent PNG." },
  { title: "Position bottom-right of signature line", body: "Convention places signatures in the bottom-right of a signature block. Click just to the right of the dotted line for the most natural placement." },
  { title: "Keep size balanced (15–25%)", body: "A signature at 20–25% of page width looks natural on most A4/Letter documents. Use the size slider to adjust proportionally before downloading." },
  { title: "Maintain consistency across documents", body: "Use the same signature PNG across all your documents. Restart the tool, create your signature once, and reuse the PNG for a consistent professional identity." },
  { title: "Preview before downloading", body: "After placing, zoom in on the preview to confirm alignment before hitting Download. Repositioning is as simple as clicking again." },
];

const MISTAKES = [
  { title: "Using a JPG signature", body: "JPG has no transparency support. A white background box will appear around your signature on any PDF with coloured sections. Always use PNG (this tool does this automatically)." },
  { title: "Placing signature in the wrong position", body: "A signature placed over text or in a margin looks careless. Click precisely on or just below the designated signature line." },
  { title: "Signature too large or too small", body: "An oversized signature dominates the page; an undersized one is illegible. 15–25% of page width is the professional range for most business documents." },
  { title: "Low-resolution signature image", body: "A blurry or pixelated signature undermines professionalism. This tool exports at 4× resolution — use it rather than a scanned phone photo." },
];

export default function AddSignatureToPDF() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Add Signature to PDF Free Online – Sign PDF in Seconds | Pixocraft",
    description:
      "Add signature to PDF free online in seconds. Create and insert signature instantly into any PDF. No login required, 100% private, GST ready.",
    keywords:
      "add signature to PDF, sign PDF online, insert signature in PDF, PDF signing tool, eSign PDF free, create signature for PDF, sign documents online, add signature to PDF free",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Add Signature to PDF – Pixocraft",
    description:
      "Add your signature to any PDF free online. Create signature, upload PDF, click to place, download signed PDF instantly. 100% private — runs entirely in your browser.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                  url: "https://tools.pixocraft.in/" },
    { name: "Tools",                 url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Generator",   url: PARENT_URL },
    { name: "Add Signature to PDF",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Add Signature to PDF Free Online – Sign PDF in Seconds | Pixocraft",
    description:
      "Add signature to PDF free online in seconds. Create and insert signature instantly into any PDF. No login required, 100% private, GST ready.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Add Signature to PDF Online",
    description:
      "Use Pixocraft's free PDF signing tool to create a signature, upload your PDF, click to place the signature, and download the signed PDF — all in your browser in under 30 seconds.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.description })),
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-8">

        <Breadcrumb items={[
          { label: "Home",                 url: "https://tools.pixocraft.in/" },
          { label: "Tools",                url: "/tools" },
          { label: "Signature Generator",  url: "/tools/signature-pad-tool" },
          { label: "Add Signature to PDF" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Add Signature to PDF Free Online – Sign PDF in Seconds
              </h1>
              <p className="text-sm text-muted-foreground">Free · No Login · 100% Private · GST &amp; Contract Ready</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Add your signature to any PDF instantly. <strong>No login, no software, fully private</strong> — create your signature,
            upload your PDF, click to place, and download your signed document in under 30 seconds.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />,       label: "Add Signature in 30 Seconds" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "No Signup Required" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Works on Mobile" },
              { icon: <Shield className="h-3.5 w-3.5" />,     label: "100% Private" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "GST & Contract Ready" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Visual step flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {HOW_TO_STEPS.map(({ step, title }) => (
              <div key={step} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{step}</span>
                <p className="text-xs font-medium text-foreground leading-snug">{title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <AddSignatureToPDFTool />
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* What it means */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What Does "Add Signature to PDF" Mean?</h2>
            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                Adding a signature to a PDF means embedding an electronic representation of your handwritten signature
                directly into the PDF document — so the document reads as officially signed without printing, scanning,
                or using any external software.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              When you <strong>sign a PDF online</strong>, you are using a browser-based tool to create a digital image of your
              signature and embed it into the PDF file at a precise location. The result is a legally valid, professionally signed
              document that can be shared, archived, or submitted — instantly, without a printer in sight.
            </p>
            <p className="text-muted-foreground mb-4">
              The technical process involves two components: creating a transparent PNG image of your signature (through drawing,
              typing, or uploading), and then using a PDF manipulation library — in this case, pdf-lib running entirely in your
              browser — to embed that PNG at the exact coordinates you specify. The output is a standard PDF file with the signature
              embedded as a permanent element of the page.
            </p>
            <p className="text-muted-foreground mb-4">
              This approach to <strong>electronic signing</strong> is referred to as a Simple Electronic Signature (SES) — the
              most widely used form of electronic signature for everyday business documents. It is legally recognised under
              India's IT Act 2000 for contracts, invoices, agreements, and most commercial documents.
            </p>
            <p className="text-muted-foreground">
              Pixocraft's <strong>PDF signing tool</strong> handles the entire workflow in your browser. Your PDF and signature
              are never uploaded to any server — all processing happens locally using PDF.js for rendering and pdf-lib for
              signature embedding. This makes it one of the most private and secure tools available for signing PDF documents online.
            </p>
          </section>

          {/* How to — structured for featured snippet */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Add Signature to PDF — Step by Step</h2>
            <p className="text-muted-foreground mb-5">Follow these four steps to sign any PDF in under 30 seconds:</p>
            <ol className="space-y-3 mb-5">
              {HOW_TO_STEPS.map(({ step, title, description }) => (
                <li key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="text-center">
              <Button
                onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
                data-testid="button-sign-pdf-hero-cta"
              >
                <FileCheck className="h-4 w-4" />
                Add Signature to PDF Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Key features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Key Features of the PDF Signature Tool</h2>
            <p className="text-muted-foreground mb-5">Built for speed, privacy, and professional results:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Shield className="h-5 w-5 text-primary" />,       title: "Transparent PNG support",       desc: "Signature PNG is exported without a white background — overlays cleanly on any PDF page colour or section." },
                { icon: <MousePointer className="h-5 w-5 text-primary" />, title: "Click-to-place positioning",   desc: "Click anywhere on the PDF preview to position your signature at the exact location you need." },
                { icon: <FileText className="h-5 w-5 text-primary" />,     title: "Live PDF preview",             desc: "See your PDF rendered in the browser and preview the signature placement before downloading." },
                { icon: <Smartphone className="h-5 w-5 text-primary" />,   title: "Full mobile support",          desc: "Touch-optimised signature drawing and PDF interaction — works on any smartphone or tablet." },
                { icon: <Zap className="h-5 w-5 text-primary" />,          title: "Multi-page support",           desc: "Navigate between PDF pages and place your signature on multiple pages with independent positioning." },
                { icon: <Lock className="h-5 w-5 text-primary" />,         title: "100% browser-side privacy",   desc: "PDF and signature are processed entirely in your browser using pdf-lib and PDF.js. No server upload, ever." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Three Methods to Add Signature to PDF</h2>
            <p className="text-muted-foreground mb-5">Depending on your workflow, choose the method that fits best:</p>
            <div className="space-y-4">
              {[
                {
                  label: "Method 1 — Direct (Recommended)",
                  color: "bg-primary/5 border-primary/20",
                  steps: ["Create your signature in the tool above (Draw or Type tab)", "Upload your PDF file in Step 2", "Click to place your signature on the PDF preview", "Download the signed PDF — done in under 30 seconds"],
                  note: "Best for: all users. The fastest, most private, and most professional workflow.",
                },
                {
                  label: "Method 2 — Download PNG, Insert Manually",
                  color: "bg-muted/30",
                  steps: ["Create your signature using the standalone Signature Generator", "Download as a transparent PNG", "Open your PDF in Adobe Acrobat, Smallpdf, or Google Docs", "Insert the PNG image over the signature line and export as PDF"],
                  note: "Best for: users who need more precise control over signature size in Acrobat's layout tools.",
                },
                {
                  label: "Method 3 — Mobile (Quick Signing)",
                  color: "bg-muted/30",
                  steps: ["Open this page on your smartphone", "Draw your signature directly on the touch canvas", "Upload your PDF from your phone's files or cloud storage", "Tap to place the signature and download the signed PDF"],
                  note: "Best for: quick signing on the go — no desktop or special app needed.",
                },
              ].map(({ label, color, steps, note }) => (
                <div key={label} className={`rounded-xl border p-5 ${color}`}>
                  <p className="font-semibold text-foreground mb-3">{label}</p>
                  <ol className="space-y-1.5 mb-3">
                    {steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-primary font-medium">{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Add Signature vs eSignature */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Add Signature to PDF vs eSignature — What's the Difference?</h2>
            <p className="text-muted-foreground mb-5">
              These terms describe different parts of the same process. Understanding the distinction helps you communicate
              clearly in professional and legal contexts:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Aspect</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Add Signature to PDF</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">eSignature (General)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { a: "Scope",         b: "Specifically refers to inserting a signature image into a PDF file", c: "Broad term for any electronic signing method — PDF, form, contract platform" },
                    { a: "Output",        b: "A signed PDF document with the signature embedded", c: "Could be a signed PDF, a digitally certified document, or an audit trail" },
                    { a: "Technology",    b: "PDF manipulation library (pdf-lib) + PNG embedding", c: "Could be PNG embedding, cryptographic DSC, or SaaS platforms like DocuSign" },
                    { a: "Use case",      b: "You have a PDF and need it signed", c: "You need to sign any type of document electronically" },
                    { a: "Legal basis",   b: "IT Act 2000 — SES (Simple Electronic Signature)", c: "IT Act 2000 — covers SES, AES, and QES (DSC)" },
                    { a: "Cost",          b: "Free with this tool", c: "Free (image-based) to ₹3,000/yr (DSC)" },
                  ].map(({ a, b, c }) => (
                    <tr key={a} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{a}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{b}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground">
              In everyday usage, "add signature to PDF" and "eSign PDF" are used interchangeably — both refer to inserting your
              signature into a PDF document electronically. The distinction only matters in formal legal or compliance contexts.
            </p>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Real Use Cases — When to Add Signature to a PDF</h2>
            <p className="text-muted-foreground mb-5">
              The most common professional situations where you need to sign a PDF electronically:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USE_CASES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Legal Validity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Is Signing a PDF Online Legally Valid in India?</h2>
            <p className="text-muted-foreground mb-5">
              Yes — for the vast majority of everyday commercial and personal documents:
            </p>
            <div className="space-y-4 mb-5">
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-primary" />IT Act 2000</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Information Technology Act 2000 gives electronic signatures the same legal weight as handwritten signatures
                  for most civil and commercial purposes. An image-based signature embedded in a PDF — created and placed using this
                  tool — constitutes a Simple Electronic Signature (SES) and is legally valid for contracts, invoices, business
                  agreements, and HR documents under Indian law.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-primary" />GST Acceptance</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  CBIC guidelines permit image-based signatures on manually generated GST invoices. Embedding your signature PNG
                  into a GST invoice PDF using this tool satisfies the signature requirement for B2B and B2C transactions in Tally,
                  Zoho Books, and custom billing software. For E-Invoice (IRN-based) GST submissions, the system QR code serves as authentication.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-primary" />Practical Usage</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hundreds of thousands of freelancers, consultants, SMBs, and corporate professionals sign PDF documents
                  electronically every day in India — contracts, offer letters, purchase orders, NDAs — without any legal
                  challenge. The key requirement is that both parties intend to be bound by the signed document.
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" />Legal Note:</strong>
              For MCA ROC filings, court submissions, income tax e-verification, and property registration, a certified Digital
              Signature Certificate (DSC) from a licensed CA is mandatory. Consult a legal professional for high-stakes documents.
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes When Adding Signature to PDF</h2>
            <p className="text-muted-foreground mb-5">Avoid these errors for a professional result:</p>
            <div className="space-y-3">
              {MISTAKES.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center"><AlertCircle className="h-3 w-3 text-destructive" /></span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for Signing PDFs Like a Professional</h2>
            <p className="text-muted-foreground mb-5">Best practices that make a visible difference in the final result:</p>
            <div className="space-y-3">
              {TIPS.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center"><Check className="h-3 w-3 text-primary" /></span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Pixocraft */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Use Pixocraft to Add Signature to PDF?</h2>
            <p className="text-muted-foreground mb-5">What makes this tool different from other PDF signing options:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "Complete in 30 seconds",      body: "The fastest four-step signing workflow available — no registration, no upload queue, no processing wait." },
                { icon: <Lock className="h-4 w-4 text-primary" />,       title: "Zero server processing",      body: "PDF and signature stay in your browser. pdf-lib and PDF.js run locally — nothing leaves your device." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "No account, no watermark",   body: "Unlike DocuSign, Adobe Sign, or Smallpdf — no account required and no watermark on the signed PDF." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Full mobile support",        body: "Touch drawing, PDF upload, signature placement, and download — the entire flow works on smartphones." },
                { icon: <FileText className="h-4 w-4 text-primary" />,   title: "Multi-page signing",         body: "Place your signature on multiple pages of the same PDF with independent positioning per page." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "GST & India ready",         body: "Built with Indian business users in mind. GST invoice signing, IT Act compliance, and practical legal context." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
                data-testid="button-sign-pdf-cta"
              >
                <FileCheck className="h-4 w-4" />
                Add Signature to PDF Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal Linking */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Related Signature Tools</h2>
            <p className="text-muted-foreground mb-5">Create and manage your signature with Pixocraft's full signature toolkit:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/esignature-maker",                  title: "eSignature Maker",               desc: "The authority hub for electronic signatures — GST & legal ready." },
                { href: "/tools/signature-creator",                  title: "Signature Creator",              desc: "Full creative control to design a unique signature that represents you." },
                { href: "/tools/handwritten-signature-generator",   title: "Handwritten Signature Generator", desc: "50+ real handwriting styles for an authentic pen-on-paper look." },
                { href: "/tools/signature-maker",                   title: "Signature Maker",                 desc: "The flagship signature maker — all methods, maximum control." },
                { href: "/tools/free-signature-generator",          title: "Free Signature Generator",        desc: "100% free signature creation with no costs or premium tiers." },
                { href: "/tools/signature-pad-tool",                title: "Signature Pad Tool",              desc: "The core signature pad powering all Pixocraft signature tools." },
              ].map(({ href, title, desc }) => (
                <Link key={href} href={href}>
                  <div className="flex items-start gap-3 p-4 rounded-xl border bg-card hover-elevate cursor-pointer">
                    <PenTool className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 ml-auto mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions — Add Signature to PDF</h2>
            <p className="text-muted-foreground mb-5">Everything you need to know about signing PDFs online:</p>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-toggle-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-foreground text-sm pr-4">{faq.question}</span>
                    {openFaq === i ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="rounded-xl border bg-primary/5 px-6 py-8 text-center">
            <FileCheck className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to Sign Your PDF?</h2>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto text-sm">
              Create your signature, upload your PDF, click to place, download — done in under 30 seconds.
              No login. No watermark. 100% private. Free forever.
            </p>
            <Button
              onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
              className="gap-2"
              data-testid="button-sign-pdf-final"
            >
              <FileCheck className="h-4 w-4" />
              Add Signature to PDF Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
