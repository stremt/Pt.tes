import { useRef, useState, useEffect, useCallback } from "react";
import {
  PenTool, Check, ArrowRight, Lock, Upload, Type,
  Download, Trash2, Undo2, Redo2, MousePointer,
  Plus, Copy, RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument, degrees } from "pdf-lib";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const MAX_MB = 10;

const FONTS = [
  "Great Vibes", "Sacramento", "Dancing Script", "Pinyon Script",
  "Allura", "Parisienne", "Alex Brush", "Satisfy", "Courgette",
  "Kaushan Script", "Cookie", "Merienda", "Italianno", "Lobster",
];

const STEP_LABELS = ["Create signature", "Upload document", "Place & Download"];

// ── Types ─────────────────────────────────────────────────────────────────────
interface SigInstance {
  id: number;
  x: number;        // fraction of container width (left edge)
  y: number;        // fraction of container height (top edge)
  width: number;    // fraction of container width
  rotation: number; // degrees
  opacity: number;  // 0–1
}

type ActionType = "move" | "resize-tl" | "resize-tr" | "resize-br" | "resize-bl" | "rotate";

interface DragState {
  sigId: number;
  action: ActionType;
  startClientX: number;
  startClientY: number;
  startSig: SigInstance;
  containerW: number;
  containerH: number;
  sigAspect: number;
}

interface PDFSignatureToolProps {
  ctaLabel?: string;
}

// ── Helper: load Image promise ────────────────────────────────────────────────
function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export function PDFSignatureTool({ ctaLabel = "Download Signed Document" }: PDFSignatureToolProps) {
  const { toast } = useToast();
  const nextId = useRef(1);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // ── Step 1: signature creation ────────────────────────────────────────────
  const [sigMode, setSigMode] = useState<"draw" | "type">("draw");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [inkColor, setInkColor] = useState("#1a1a2e");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [signaturePng, setSignaturePng] = useState<string | null>(null);
  const [sigAspect, setSigAspect] = useState(4); // width / height

  // ── Step 2/3: document ───────────────────────────────────────────────────
  const [docType, setDocType] = useState<"pdf" | "image" | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docImageUrl, setDocImageUrl] = useState<string | null>(null);
  const [pdfPreviews, setPdfPreviews] = useState<Record<number, string>>({});
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [docLoading, setDocLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // ── Step 3: signature instances ──────────────────────────────────────────
  const [instances, setInstances] = useState<SigInstance[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const selectedSig = instances.find((s) => s.id === selectedId) ?? null;

  // ── Canvas setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // ── Pre-load signature from history (via sessionStorage) ─────────────────
  useEffect(() => {
    try {
      const preloaded = sessionStorage.getItem("pixocraft_preload_sig_png");
      if (!preloaded) return;
      sessionStorage.removeItem("pixocraft_preload_sig_png");
      const img = new Image();
      img.onload = () => {
        setSigAspect(img.naturalWidth / Math.max(img.naturalHeight, 1));
        setSignaturePng(preloaded);
        setStep(2);
      };
      img.src = preloaded;
    } catch (_) {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    setHistory((h) => [...h.slice(-19), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    setRedoStack([]);
  }, []);

  const getDrawPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    if ("touches" in e) return { x: (e.touches[0].clientX - rect.left) * sx, y: (e.touches[0].clientY - rect.top) * sy };
    return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    saveHistory();
    ctx.strokeStyle = inkColor; ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    const { x, y } = getDrawPos(e);
    ctx.beginPath(); ctx.moveTo(x, y);
    setIsDrawing(true);
  };
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getDrawPos(e);
    ctx.lineTo(x, y); ctx.stroke();
  };
  const endDraw = () => setIsDrawing(false);

  const undo = () => {
    const canvas = canvasRef.current; const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas || !history.length) return;
    setRedoStack((r) => [...r, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    ctx.putImageData(history[history.length - 1], 0, 0);
    setHistory((h) => h.slice(0, -1));
  };
  const redo = () => {
    const canvas = canvasRef.current; const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas || !redoStack.length) return;
    setHistory((h) => [...h, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    ctx.putImageData(redoStack[redoStack.length - 1], 0, 0);
    setRedoStack((r) => r.slice(0, -1));
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current; const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    saveHistory(); ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // ── Confirm signature ─────────────────────────────────────────────────────
  const confirmSignature = useCallback(() => {
    if (sigMode === "draw") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      if (!Array.from(data).some((v, i) => i % 4 !== 3 && v < 250)) {
        toast({ title: "Draw your signature first", variant: "destructive" }); return;
      }
      const oc = document.createElement("canvas");
      oc.width = canvas.width; oc.height = canvas.height;
      const octx = oc.getContext("2d")!;
      octx.drawImage(canvas, 0, 0);
      const id = octx.getImageData(0, 0, oc.width, oc.height);
      for (let i = 0; i < id.data.length; i += 4) {
        if (id.data[i] > 230 && id.data[i + 1] > 230 && id.data[i + 2] > 230) id.data[i + 3] = 0;
      }
      octx.putImageData(id, 0, 0);
      setSignaturePng(oc.toDataURL("image/png"));
      setSigAspect(oc.width / oc.height);
      setStep(2);
    } else {
      if (!typedName.trim()) { toast({ title: "Type your name first", variant: "destructive" }); return; }
      const oc = document.createElement("canvas");
      oc.width = 800; oc.height = 200;
      const ctx = oc.getContext("2d")!;
      ctx.clearRect(0, 0, 800, 200);
      ctx.font = `80px '${selectedFont}', cursive`;
      ctx.fillStyle = inkColor;
      ctx.textBaseline = "middle"; ctx.textAlign = "center";
      ctx.fillText(typedName, 400, 100);
      setSignaturePng(oc.toDataURL("image/png"));
      setSigAspect(4);
      setStep(2);
    }
  }, [sigMode, typedName, selectedFont, inkColor, toast]);

  // ── Document upload ───────────────────────────────────────────────────────
  const renderPdfPage = useCallback(async (file: File, pageNum: number): Promise<string> => {
    const buf = await file.arrayBuffer();
    const pdfDoc = await getDocument({ data: buf }).promise;
    const page = await pdfDoc.getPage(pageNum);
    const vp = page.getViewport({ scale: 1.5 });
    const oc = document.createElement("canvas");
    oc.width = vp.width; oc.height = vp.height;
    const ctx = oc.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    return oc.toDataURL("image/png");
  }, []);

  const handleDocUpload = useCallback(async (file: File) => {
    if (file.size > MAX_MB * 1024 * 1024) {
      toast({ title: `File too large`, description: `Maximum ${MAX_MB}MB allowed.`, variant: "destructive" }); return;
    }
    const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImg = file.type.startsWith("image/");
    if (!isPDF && !isImg) {
      toast({ title: "Unsupported file type", description: "Please upload a PDF, PNG, or JPG.", variant: "destructive" }); return;
    }
    setDocLoading(true);
    setInstances([]); setSelectedId(null);
    try {
      if (isImg) {
        const url = URL.createObjectURL(file);
        setDocType("image"); setDocFile(file); setDocImageUrl(url);
        setPdfPreviews({}); setPdfPageCount(0);
        setStep(3);
      } else {
        const dataUrl = await renderPdfPage(file, 1);
        const buf = await file.arrayBuffer();
        const pdfDoc = await getDocument({ data: buf }).promise;
        setPdfPageCount(pdfDoc.numPages);
        setDocType("pdf"); setDocFile(file); setDocImageUrl(null);
        setCurrentPage(1);
        setPdfPreviews({ 1: dataUrl });
        setStep(3);
      }
    } catch {
      toast({ title: "Failed to load file. Please try again.", variant: "destructive" });
    } finally {
      setDocLoading(false);
    }
  }, [renderPdfPage, toast]);

  const goToPage = useCallback(async (page: number) => {
    if (!docFile || docType !== "pdf") return;
    setCurrentPage(page);
    if (!pdfPreviews[page]) {
      try {
        const dataUrl = await renderPdfPage(docFile, page);
        setPdfPreviews((p) => ({ ...p, [page]: dataUrl }));
      } catch { toast({ title: "Failed to load page.", variant: "destructive" }); }
    }
  }, [docFile, docType, pdfPreviews, renderPdfPage, toast]);

  // ── Signature instance management ─────────────────────────────────────────
  const addSig = () => {
    const id = nextId.current++;
    const offset = (instances.length * 0.06) % 0.25;
    setInstances((p) => [...p, { id, x: 0.05 + offset, y: 0.05 + offset, width: 0.28, rotation: 0, opacity: 1 }]);
    setSelectedId(id);
  };

  const duplicateSig = (sigId: number) => {
    const orig = instances.find((s) => s.id === sigId);
    if (!orig) return;
    const id = nextId.current++;
    setInstances((p) => [...p, { ...orig, id, x: Math.min(orig.x + 0.05, 0.65), y: Math.min(orig.y + 0.05, 0.65) }]);
    setSelectedId(id);
  };

  const deleteSig = (sigId: number) => {
    setInstances((p) => p.filter((s) => s.id !== sigId));
    if (selectedId === sigId) setSelectedId(null);
  };

  const updateSig = (id: number, upd: Partial<SigInstance>) => {
    setInstances((p) => p.map((s) => s.id === id ? { ...s, ...upd } : s));
  };

  // ── Pointer drag / resize / rotate ────────────────────────────────────────
  const onPointerMove = useCallback((e: PointerEvent) => {
    const ds = dragRef.current;
    if (!ds) return;
    const dx = (e.clientX - ds.startClientX) / ds.containerW;
    const dy = (e.clientY - ds.startClientY) / ds.containerH;
    const sig = ds.startSig;

    if (ds.action === "move") {
      const maxX = 1 - sig.width;
      const maxY = 1 - sig.width / ds.sigAspect;
      setInstances((p) => p.map((s) => s.id === ds.sigId
        ? { ...s, x: Math.max(0, Math.min(sig.x + dx, maxX)), y: Math.max(0, Math.min(sig.y + dy, maxY)) }
        : s));
    } else if (ds.action === "rotate") {
      const cx = ds.containerW * (sig.x + sig.width / 2);
      const cy = ds.containerH * (sig.y + (sig.width / ds.sigAspect) / 2);
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const angle = Math.atan2(e.clientY - (rect.top + cy), e.clientX - (rect.left + cx)) * (180 / Math.PI) + 90;
      setInstances((p) => p.map((s) => s.id === ds.sigId ? { ...s, rotation: angle } : s));
    } else {
      const origR = sig.x + sig.width;
      const origB = sig.y + sig.width / ds.sigAspect;
      let nw = sig.width, nx = sig.x, ny = sig.y;

      if (ds.action === "resize-br")      { nw = Math.max(0.05, sig.width + dx); }
      else if (ds.action === "resize-bl") { nw = Math.max(0.05, sig.width - dx); nx = origR - nw; }
      else if (ds.action === "resize-tr") { nw = Math.max(0.05, sig.width + dx); ny = origB - nw / ds.sigAspect; }
      else if (ds.action === "resize-tl") { nw = Math.max(0.05, sig.width - dx); nx = origR - nw; ny = origB - nw / ds.sigAspect; }

      setInstances((p) => p.map((s) => s.id === ds.sigId
        ? { ...s, x: Math.max(0, nx), y: Math.max(0, ny), width: Math.min(nw, 0.95) }
        : s));
    }
  }, []);

  const onPointerUp = useCallback(() => { dragRef.current = null; }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  const startDragSig = (e: React.PointerEvent, sigId: number, action: ActionType) => {
    e.preventDefault(); e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    const sig = instances.find((s) => s.id === sigId);
    if (!sig) return;
    const rect = container.getBoundingClientRect();
    dragRef.current = {
      sigId, action,
      startClientX: e.clientX, startClientY: e.clientY,
      startSig: { ...sig },
      containerW: rect.width, containerH: rect.height,
      sigAspect,
    };
    setSelectedId(sigId);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // ── Export ────────────────────────────────────────────────────────────────
  const downloadSigned = useCallback(async () => {
    if (!instances.length) { toast({ title: "Add at least one signature first", variant: "destructive" }); return; }
    if (!signaturePng) return;
    setDownloading(true);
    try {
      const sigImg = await loadImg(signaturePng);

      if (docType === "image" && docImageUrl) {
        const bgImg = await loadImg(docImageUrl);
        const oc = document.createElement("canvas");
        oc.width = bgImg.naturalWidth; oc.height = bgImg.naturalHeight;
        const ctx = oc.getContext("2d")!;
        ctx.drawImage(bgImg, 0, 0);

        for (const sig of instances) {
          const sw = sig.width * bgImg.naturalWidth;
          const sh = sw / sigAspect;
          const cx = sig.x * bgImg.naturalWidth + sw / 2;
          const cy = sig.y * bgImg.naturalHeight + sh / 2;
          ctx.save();
          ctx.globalAlpha = sig.opacity;
          ctx.translate(cx, cy);
          ctx.rotate(sig.rotation * Math.PI / 180);
          ctx.drawImage(sigImg, -sw / 2, -sh / 2, sw, sh);
          ctx.restore();
        }

        oc.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url; a.download = `signed-${docFile?.name ?? "document"}.png`; a.click();
          URL.revokeObjectURL(url);
          toast({ title: "Downloaded signed image!" });
        }, "image/png");

      } else if (docType === "pdf" && docFile) {
        const pdfBytes = await docFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const sigRes = await fetch(signaturePng);
        const sigBytes = await sigRes.arrayBuffer();
        const sigEmbedded = await pdfDoc.embedPng(new Uint8Array(sigBytes));
        const pages = pdfDoc.getPages();
        const pdfPage = pages[currentPage - 1];
        if (!pdfPage) throw new Error("Page not found");

        const { width: pw, height: ph } = pdfPage.getSize();

        for (const sig of instances) {
          const sw = sig.width * pw;
          const sh = sw / sigAspect;
          // Center in PDF coordinates (Y axis inverted)
          const cx = sig.x * pw + sw / 2;
          const cy = ph - sig.y * ph - sh / 2;

          // To rotate around center: compute bottom-left offset after rotation
          const rad = -(sig.rotation * Math.PI / 180);
          const cosA = Math.cos(rad); const sinA = Math.sin(rad);
          const ox = -sw / 2; const oy = -sh / 2;
          const fx = cx + cosA * ox - sinA * oy;
          const fy = cy + sinA * ox + cosA * oy;

          pdfPage.drawImage(sigEmbedded, {
            x: fx, y: fy, width: sw, height: sh,
            rotate: degrees(-sig.rotation),
            opacity: sig.opacity,
          });
        }

        const blob = new Blob([await pdfDoc.save()], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `signed-${docFile.name}`; a.click();
        URL.revokeObjectURL(url);
        toast({ title: "Signed PDF downloaded!" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Export failed. Please try again.", variant: "destructive" });
    } finally {
      setDownloading(false);
    }
  }, [instances, signaturePng, docType, docFile, docImageUrl, currentPage, sigAspect, toast]);

  const resetAll = () => {
    setStep(1); setSignaturePng(null);
    setDocFile(null); setDocType(null); setDocImageUrl(null);
    setPdfPreviews({}); setPdfPageCount(0);
    setInstances([]); setSelectedId(null);
    clearCanvas();
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-xl border bg-card overflow-hidden mb-6">
      {/* Step indicator */}
      <div className="border-b bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-1 flex-wrap">
          {STEP_LABELS.map((label, idx) => {
            const s = idx + 1;
            return (
              <div key={s} className="flex items-center gap-1">
                <span className={`h-6 w-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</span>
                <span className={`text-xs hidden sm:inline font-medium ${step === s ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                {s < STEP_LABELS.length && <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-5">
        {/* ── STEP 1: Create Signature ─────────────────────────────────── */}
        {step === 1 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Step 1 — Create your signature</p>
            <div className="flex gap-2 mb-4">
              {(["draw", "type"] as const).map((m) => (
                <button
                  key={m} onClick={() => setSigMode(m)}
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
                    <Button size="icon" variant="ghost" onClick={undo} disabled={!history.length} data-testid="button-undo"><Undo2 className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={redo} disabled={!redoStack.length} data-testid="button-redo"><Redo2 className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={clearCanvas} data-testid="button-clear"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <canvas
                  ref={canvasRef} width={800} height={200}
                  className="w-full rounded-lg border bg-white dark:bg-zinc-900 cursor-crosshair touch-none"
                  style={{ maxHeight: 160 }}
                  onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                  onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
                  data-testid="canvas-draw"
                />
                <p className="text-xs text-muted-foreground mt-1">Draw using mouse or touch</p>
              </>
            )}

            {sigMode === "type" && (
              <>
                <input
                  type="text" placeholder="Type your name…" value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  className="w-full rounded-lg border bg-background px-4 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  data-testid="input-typed-name"
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto mb-3 pr-1">
                  {FONTS.map((font) => (
                    <button
                      key={font} onClick={() => setSelectedFont(font)}
                      data-testid={`font-option-${font.replace(/\s/g, "-")}`}
                      className={`rounded-lg border px-3 py-2 text-left transition-colors ${selectedFont === font ? "border-primary bg-primary/5" : "hover-elevate"}`}
                      style={{ fontFamily: `'${font}', cursive`, fontSize: 18 }}
                    >
                      {typedName || "Signature"}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">Ink:</span>
                  <input type="color" value={inkColor} onChange={(e) => setInkColor(e.target.value)} className="h-7 w-7 rounded cursor-pointer border" data-testid="input-ink-color-type" />
                </div>
              </>
            )}

            <div className="mt-4">
              <Button onClick={confirmSignature} className="gap-2 w-full sm:w-auto" data-testid="button-confirm-signature">
                <Check className="h-4 w-4" />
                Confirm Signature — Upload Document
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Upload Document ───────────────────────────────────── */}
        {step === 2 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Step 2 — Upload your document</p>
            <p className="text-xs text-muted-foreground mb-4">PDF, PNG, or JPG — max {MAX_MB}MB. Nothing is uploaded to any server.</p>

            {signaturePng && (
              <div className="mb-4 flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <img src={signaturePng} alt="Confirmed signature" className="h-10 bg-white dark:bg-zinc-900 rounded border" />
                <span className="text-sm text-muted-foreground">Signature ready</span>
                <Button size="icon" variant="ghost" onClick={() => setStep(1)} data-testid="button-edit-sig" className="ml-auto">
                  <PenTool className="h-4 w-4" />
                </Button>
              </div>
            )}

            <label
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-muted/30 hover-elevate cursor-pointer p-10"
              data-testid="label-doc-upload"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleDocUpload(f); }}
            >
              <Upload className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-semibold text-foreground text-sm">Upload PDF, PNG, or JPG</p>
                <p className="text-xs text-muted-foreground mt-1">Click or drag & drop · Max {MAX_MB}MB · 100% local</p>
              </div>
              <input type="file" accept=".pdf,application/pdf,.png,.jpg,.jpeg,image/png,image/jpeg" className="hidden" onChange={(e) => e.target.files?.[0] && handleDocUpload(e.target.files[0])} data-testid="input-doc-upload" />
            </label>

            {docLoading && (
              <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                Loading document…
              </p>
            )}
          </div>
        )}

        {/* ── STEP 3: Place & Download ──────────────────────────────────── */}
        {step === 3 && (
          <div className="flex flex-col lg:flex-row gap-5">

            {/* Left: Document canvas with draggable signatures */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-foreground flex-1">Step 3 — Place &amp; arrange signatures</p>
                {docType === "pdf" && pdfPageCount > 1 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground border rounded-lg px-2 py-1">
                    <button onClick={() => currentPage > 1 && goToPage(currentPage - 1)} disabled={currentPage <= 1} className="disabled:opacity-30 px-1" data-testid="button-prev-page">‹</button>
                    <span>Page {currentPage} / {pdfPageCount}</span>
                    <button onClick={() => currentPage < pdfPageCount && goToPage(currentPage + 1)} disabled={currentPage >= pdfPageCount} className="disabled:opacity-30 px-1" data-testid="button-next-page">›</button>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Click <strong>Add Signature</strong> to place one. Drag to move · corner handles to resize · circle handle to rotate.
              </p>

              {/* Document + overlaid signatures */}
              <div
                ref={containerRef}
                className="relative w-full rounded-xl border bg-muted/30 select-none"
                style={{ minHeight: 200 }}
                onClick={(e) => { if (e.target === containerRef.current) setSelectedId(null); }}
                data-testid="div-doc-preview"
              >
                {/* Document background */}
                {docType === "image" && docImageUrl && (
                  <img src={docImageUrl} alt="Document" className="w-full block pointer-events-none rounded-xl" draggable={false} />
                )}
                {docType === "pdf" && (
                  pdfPreviews[currentPage]
                    ? <img src={pdfPreviews[currentPage]} alt={`Page ${currentPage}`} className="w-full block pointer-events-none rounded-xl" draggable={false} />
                    : <div className="flex items-center justify-center h-64 text-muted-foreground text-sm gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                        Loading page…
                      </div>
                )}

                {/* Signature instances */}
                {signaturePng && instances.map((sig) => {
                  const isSelected = selectedId === sig.id;
                  return (
                    <div
                      key={sig.id}
                      className="absolute cursor-move"
                      style={{
                        left: `${sig.x * 100}%`,
                        top: `${sig.y * 100}%`,
                        width: `${sig.width * 100}%`,
                        aspectRatio: `${sigAspect}`,
                        opacity: sig.opacity,
                        transform: `rotate(${sig.rotation}deg)`,
                        transformOrigin: "center center",
                        zIndex: isSelected ? 20 : 10,
                      }}
                      onPointerDown={(e) => startDragSig(e, sig.id, "move")}
                      onClick={(e) => { e.stopPropagation(); setSelectedId(sig.id); }}
                      data-testid={`sig-instance-${sig.id}`}
                    >
                      <img src={signaturePng} alt="Signature" className="w-full h-full object-contain pointer-events-none" draggable={false} />

                      {/* Selection border */}
                      {isSelected && <div className="absolute inset-0 border-2 border-primary border-dashed rounded pointer-events-none" />}

                      {/* Handles (only when selected) */}
                      {isSelected && (
                        <>
                          {/* Corner resize handles */}
                          {(["tl", "tr", "bl", "br"] as const).map((c) => (
                            <div
                              key={c}
                              className="absolute h-4 w-4 bg-primary rounded-full border-2 border-white shadow-md"
                              style={{
                                top: c.includes("t") ? -8 : "calc(100% - 8px)",
                                left: c.includes("l") ? -8 : "calc(100% - 8px)",
                                cursor: c === "tl" || c === "br" ? "nwse-resize" : "nesw-resize",
                                zIndex: 30,
                              }}
                              onPointerDown={(e) => startDragSig(e, sig.id, `resize-${c}` as ActionType)}
                              data-testid={`handle-${c}-${sig.id}`}
                            />
                          ))}

                          {/* Rotation line */}
                          <div className="absolute pointer-events-none" style={{ top: -28, left: "calc(50% - 1px)", width: 2, height: 20, background: "hsl(var(--primary) / 0.5)" }} />

                          {/* Rotation handle */}
                          <div
                            className="absolute h-5 w-5 bg-white border-2 border-primary rounded-full shadow-md flex items-center justify-center"
                            style={{ top: -36, left: "calc(50% - 10px)", cursor: "grab", zIndex: 30 }}
                            onPointerDown={(e) => startDragSig(e, sig.id, "rotate")}
                            data-testid={`handle-rotate-${sig.id}`}
                          >
                            <RotateCcw className="h-2.5 w-2.5 text-primary" />
                          </div>

                          {/* Delete handle */}
                          <button
                            className="absolute flex items-center justify-center h-5 w-5 rounded-full bg-destructive border-2 border-white shadow-md text-white text-xs font-bold leading-none"
                            style={{ top: -10, right: -10, zIndex: 30 }}
                            onClick={(e) => { e.stopPropagation(); deleteSig(sig.id); }}
                            data-testid={`handle-delete-${sig.id}`}
                          >×</button>
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Empty state overlay */}
                {instances.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rounded-xl bg-black/50 text-white text-sm px-5 py-3 flex items-center gap-2">
                      <MousePointer className="h-4 w-4" />
                      Click "Add Signature" on the right to begin
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Controls sidebar */}
            <div className="w-full lg:w-60 shrink-0 space-y-4">

              {/* Signature preview + add button */}
              {signaturePng && (
                <div className="rounded-lg border p-3 bg-muted/20 space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your Signature</p>
                  <img src={signaturePng} alt="Signature preview" className="w-full rounded border bg-white dark:bg-zinc-900 object-contain" style={{ maxHeight: 56 }} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={addSig} className="flex-1 gap-1.5" data-testid="button-add-sig">
                      <Plus className="h-3.5 w-3.5" />
                      Add Signature
                    </Button>
                    {selectedId !== null && (
                      <Button size="icon" variant="outline" onClick={() => duplicateSig(selectedId)} title="Duplicate" data-testid="button-duplicate-sig">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Selected signature controls */}
              {selectedSig && (
                <div className="rounded-lg border p-3 space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Selected Signature</p>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Size</Label>
                      <span className="text-xs font-medium tabular-nums">{Math.round(selectedSig.width * 100)}%</span>
                    </div>
                    <Slider min={5} max={80} step={1} value={[Math.round(selectedSig.width * 100)]} onValueChange={([v]) => updateSig(selectedSig.id, { width: v / 100 })} data-testid="slider-sig-size" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Rotation</Label>
                      <span className="text-xs font-medium tabular-nums">{Math.round(selectedSig.rotation)}°</span>
                    </div>
                    <Slider min={-180} max={180} step={1} value={[Math.round(selectedSig.rotation)]} onValueChange={([v]) => updateSig(selectedSig.id, { rotation: v })} data-testid="slider-sig-rotation" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Opacity</Label>
                      <span className="text-xs font-medium tabular-nums">{Math.round(selectedSig.opacity * 100)}%</span>
                    </div>
                    <Slider min={10} max={100} step={5} value={[Math.round(selectedSig.opacity * 100)]} onValueChange={([v]) => updateSig(selectedSig.id, { opacity: v / 100 })} data-testid="slider-sig-opacity" />
                  </div>

                  <Button
                    variant="outline" size="sm"
                    onClick={() => deleteSig(selectedSig.id)}
                    className="w-full gap-2 text-destructive border-destructive/30"
                    data-testid="button-delete-selected-sig"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              )}

              {/* Multi-signature list */}
              {instances.length > 1 && (
                <div className="rounded-lg border p-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">All ({instances.length})</p>
                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    {instances.map((sig, i) => (
                      <button
                        key={sig.id}
                        className={`w-full text-left text-xs px-2 py-1.5 rounded transition-colors ${selectedId === sig.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover-elevate"}`}
                        onClick={() => setSelectedId(sig.id)}
                        data-testid={`list-sig-${sig.id}`}
                      >
                        #{i + 1} · {Math.round(sig.width * 100)}% · {Math.round(sig.rotation)}° · {Math.round(sig.opacity * 100)}%
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-2">
                <Button
                  onClick={downloadSigned}
                  disabled={downloading || !instances.length}
                  className="w-full gap-2"
                  data-testid="button-download-signed"
                >
                  {downloading
                    ? <span className="h-4 w-4 animate-spin border-2 border-primary-foreground border-t-transparent rounded-full" />
                    : <Download className="h-4 w-4" />}
                  {ctaLabel}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setStep(2)} className="w-full gap-2" data-testid="button-change-doc">
                  <Upload className="h-3.5 w-3.5" />
                  Change Document
                </Button>
                <Button variant="ghost" size="sm" onClick={resetAll} className="w-full gap-2 text-muted-foreground" data-testid="button-reset-all">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Start Over
                </Button>
              </div>

              {/* Privacy badge */}
              <div className="flex items-start gap-2 text-xs text-muted-foreground rounded-lg border bg-muted/20 p-3">
                <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
                <span>100% private — your file never leaves your device. All processing is local.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
