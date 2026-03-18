import { useRef, useState, useEffect, useCallback } from "react";
import {
  PenTool, Check, ArrowRight, Lock, Upload, Type,
  Download, Trash2, Undo2, Redo2, MousePointer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from "pdf-lib";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const FONTS = [
  "Great Vibes", "Sacramento", "Dancing Script", "Pinyon Script",
  "Allura", "Parisienne", "Alex Brush", "Satisfy", "Courgette",
  "Kaushan Script", "Cookie", "Merienda", "Italianno", "Lobster",
];

const STEP_LABELS = [
  "Create signature",
  "Upload PDF",
  "Place & Download",
];

interface PDFSignatureToolProps {
  ctaLabel?: string;
}

export function PDFSignatureTool({ ctaLabel = "Insert Signature into PDF" }: PDFSignatureToolProps) {
  const { toast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1
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

  // Step 2 / 3
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfPreviews, setPdfPreviews] = useState<Record<number, string>>({});
  const [placements, setPlacements] = useState<Record<number, { x: number; y: number; relX: number; relY: number }>>({});
  const previewRef = useRef<HTMLDivElement>(null);
  const [sigSizePct, setSigSizePct] = useState(25);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // ── Canvas helpers ─────────────────────────────────────────────────────────
  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    ctx.putImageData(history[history.length - 1], 0, 0);
    setHistory((h) => h.slice(0, -1));
  };

  const redo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas || redoStack.length === 0) return;
    setHistory((h) => [...h, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    ctx.putImageData(redoStack[redoStack.length - 1], 0, 0);
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

  // ── Confirm signature ─────────────────────────────────────────────────────
  const confirmSignature = useCallback(() => {
    if (sigMode === "draw") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const hasContent = Array.from(data).some((v, i) => i % 4 !== 3 && v < 250);
      if (!hasContent) { toast({ title: "Draw your signature first", variant: "destructive" }); return; }
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const octx = offscreen.getContext("2d");
      if (!octx) return;
      octx.drawImage(canvas, 0, 0);
      const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const r = imgData.data[i], g = imgData.data[i + 1], b = imgData.data[i + 2];
        if (r > 230 && g > 230 && b > 230) imgData.data[i + 3] = 0;
      }
      octx.putImageData(imgData, 0, 0);
      setSignaturePng(offscreen.toDataURL("image/png"));
      setStep(2);
    } else {
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

  // ── PDF helpers ───────────────────────────────────────────────────────────
  const renderPage = useCallback(async (file: File, pageNum: number, cache: Record<number, string>) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await getDocument({ data: arrayBuffer }).promise;
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return cache;
    await page.render({ canvasContext: ctx, viewport }).promise;
    return { ...cache, [pageNum]: canvas.toDataURL("image/png") };
  }, []);

  const handlePdfUpload = useCallback(async (file: File) => {
    if (!file.type.includes("pdf")) { toast({ title: "Please upload a PDF file", variant: "destructive" }); return; }
    setPdfLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await getDocument({ data: arrayBuffer }).promise;
      setPdfPageCount(pdfDoc.numPages);
      setPdfFile(file);
      setCurrentPage(1);
      setPlacements({});
      const cache = await renderPage(file, 1, {});
      setPdfPreviews(cache);
      setStep(3);
    } catch {
      toast({ title: "Failed to load PDF. Please try another file.", variant: "destructive" });
    } finally {
      setPdfLoading(false);
    }
  }, [toast, renderPage]);

  const goToPage = useCallback(async (page: number) => {
    setCurrentPage(page);
    if (!pdfPreviews[page] && pdfFile) {
      const updated = await renderPage(pdfFile, page, pdfPreviews);
      setPdfPreviews(updated);
    }
  }, [pdfFile, pdfPreviews, renderPage]);

  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const div = previewRef.current;
    if (!div) return;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPlacements((p) => ({ ...p, [currentPage]: { x, y, relX: x / rect.width, relY: y / rect.height } }));
  };

  const downloadSigned = useCallback(async () => {
    if (!pdfFile || !signaturePng || Object.keys(placements).length === 0) {
      toast({ title: "Place your signature on the PDF first", variant: "destructive" });
      return;
    }
    setDownloadLoading(true);
    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const res = await fetch(signaturePng);
      const sigBytes = await (await res.blob()).arrayBuffer();
      const sigImage = await pdfDoc.embedPng(sigBytes);
      const pages = pdfDoc.getPages();

      for (const [pageNumStr, placement] of Object.entries(placements)) {
        const pdfPage = pages[Number(pageNumStr) - 1];
        if (!pdfPage) continue;
        const { width: pw, height: ph } = pdfPage.getSize();
        const sigWidth = pw * (sigSizePct / 100);
        const sigHeight = sigWidth * (sigImage.height / sigImage.width);
        const x = Math.max(0, Math.min(placement.relX * pw - sigWidth / 2, pw - sigWidth));
        const y = Math.max(0, Math.min(ph - placement.relY * ph - sigHeight / 2, ph - sigHeight));
        pdfPage.drawImage(sigImage, { x, y, width: sigWidth, height: sigHeight });
      }

      const blob = new Blob([await pdfDoc.save()], { type: "application/pdf" });
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

  // ── RENDER ─────────────────────────────────────────────────────────────────
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
        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Step 1 — Create your signature</p>
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
                  placeholder="Type your name…"
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
                Confirm Signature — Upload PDF
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Step 2 — Upload your PDF</p>
            <p className="text-xs text-muted-foreground mb-4">Your signature is confirmed. Now upload the PDF you want to sign.</p>
            {signaturePng && (
              <div className="mb-4 flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <img src={signaturePng} alt="Your confirmed signature" className="h-10 bg-white rounded border" />
                <span className="text-sm text-muted-foreground">Signature ready</span>
                <Button size="icon" variant="ghost" onClick={() => setStep(1)} data-testid="button-edit-sig" className="ml-auto shrink-0">
                  <PenTool className="h-4 w-4" />
                </Button>
              </div>
            )}
            <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-muted/30 hover-elevate cursor-pointer p-10 transition-colors" data-testid="label-pdf-upload">
              <Upload className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="font-semibold text-foreground text-sm">Upload PDF to sign</p>
                <p className="text-xs text-muted-foreground mt-1">Click or drag & drop · PDF files only · processed locally in your browser</p>
              </div>
              <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && handlePdfUpload(e.target.files[0])} data-testid="input-pdf-upload" />
            </label>
            {pdfLoading && (
              <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                Loading PDF preview…
              </p>
            )}
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <p className="text-sm font-semibold text-foreground">Step 3 — Click on the PDF to place your signature</p>
              <div className="flex gap-2 flex-wrap">
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
            <p className="text-xs text-muted-foreground mb-3">Click anywhere on the preview to position your signature. Click again to reposition.</p>

            <div
              ref={previewRef}
              className="relative w-full rounded-xl border overflow-hidden cursor-crosshair bg-muted/30"
              style={{ maxHeight: 480 }}
              onClick={handlePreviewClick}
              data-testid="div-pdf-preview"
            >
              {pdfPreviews[currentPage] ? (
                <img src={pdfPreviews[currentPage]} alt={`PDF page ${currentPage} preview`} className="w-full object-contain" draggable={false} />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground text-sm gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  Loading page…
                </div>
              )}
              {placements[currentPage] && signaturePng && previewRef.current && (
                <img
                  src={signaturePng}
                  alt="Placed signature preview"
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
                  : <Download className="h-4 w-4" />}
                {ctaLabel}
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
                {" "}Navigate pages above to sign additional pages.
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
