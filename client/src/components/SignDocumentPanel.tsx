import { useRef, useState, useEffect, useCallback } from "react";
import {
  Upload, Download, Trash2, Plus, Copy, RotateCcw,
  MousePointer, Lock, X, ChevronLeft, ChevronRight, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument, degrees } from "pdf-lib";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const MAX_MB = 20;

interface SigInstance {
  id: number;
  x: number;
  y: number;
  width: number;
  rotation: number;
  opacity: number;
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

interface SignDocumentPanelProps {
  signaturePng: string;
  sigAspect: number;
  onClose: () => void;
  hideClose?: boolean;
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

function removeWhiteBgFromPng(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const oc = document.createElement("canvas");
      oc.width = img.naturalWidth;
      oc.height = img.naturalHeight;
      const ctx = oc.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const id = ctx.getImageData(0, 0, oc.width, oc.height);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] > 235 && d[i + 1] > 235 && d[i + 2] > 235) d[i + 3] = 0;
      }
      ctx.clearRect(0, 0, oc.width, oc.height);
      ctx.putImageData(id, 0, 0);
      resolve(oc.toDataURL("image/png"));
    };
    img.src = dataUrl;
  });
}

export function SignDocumentPanel({ signaturePng: rawPng, sigAspect, onClose, hideClose = false }: SignDocumentPanelProps) {
  const { toast } = useToast();
  const nextId = useRef(1);

  const [removeWhiteBg, setRemoveWhiteBg] = useState(true);
  const [processedPng, setProcessedPng] = useState<string>(rawPng);

  const [docType, setDocType] = useState<"pdf" | "image" | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docImageUrl, setDocImageUrl] = useState<string | null>(null);
  const [pdfPreviews, setPdfPreviews] = useState<Record<number, string>>({});
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [docLoading, setDocLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Per-page signature instances: pageInstances[pageNum] = SigInstance[]
  const [pageInstances, setPageInstances] = useState<Record<number, SigInstance[]>>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  // Current page's signatures (derived)
  const instances: SigInstance[] = pageInstances[currentPage] ?? [];
  const selectedSig = instances.find((s) => s.id === selectedId) ?? null;

  // Helper to update instances for a specific page
  const setInstancesForPage = useCallback((page: number, updater: SigInstance[] | ((prev: SigInstance[]) => SigInstance[])) => {
    setPageInstances((prev) => {
      const current = prev[page] ?? [];
      const next = typeof updater === "function" ? updater(current) : updater;
      return { ...prev, [page]: next };
    });
  }, []);

  const setInstances = useCallback((updater: SigInstance[] | ((prev: SigInstance[]) => SigInstance[])) => {
    setInstancesForPage(currentPage, updater);
  }, [currentPage, setInstancesForPage]);

  useEffect(() => {
    if (removeWhiteBg) {
      removeWhiteBgFromPng(rawPng).then(setProcessedPng);
    } else {
      setProcessedPng(rawPng);
    }
  }, [removeWhiteBg, rawPng]);

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
      toast({ title: "Unsupported file type", description: "Please upload a PDF, PNG, JPG, or other image format.", variant: "destructive" }); return;
    }
    setDocLoading(true);
    setPageInstances({}); setSelectedId(null);
    try {
      if (isImg) {
        const url = URL.createObjectURL(file);
        setDocType("image"); setDocFile(file); setDocImageUrl(url);
        setPdfPreviews({}); setPdfPageCount(0); setCurrentPage(1);
      } else {
        const buf = await file.arrayBuffer();
        const pdfDoc = await getDocument({ data: buf }).promise;
        const numPages = pdfDoc.numPages;
        const dataUrl = await renderPdfPage(file, 1);
        setPdfPageCount(numPages);
        setDocType("pdf"); setDocFile(file); setDocImageUrl(null);
        setCurrentPage(1);
        setPdfPreviews({ 1: dataUrl });
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
    setSelectedId(null);
    if (!pdfPreviews[page]) {
      try {
        const dataUrl = await renderPdfPage(docFile, page);
        setPdfPreviews((p) => ({ ...p, [page]: dataUrl }));
      } catch { toast({ title: "Failed to load page.", variant: "destructive" }); }
    }
  }, [docFile, docType, pdfPreviews, renderPdfPage, toast]);

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
    setInstances((p) => [...p, { ...orig, id, x: orig.x + 0.05, y: orig.y + 0.05 }]);
    setSelectedId(id);
  };

  const deleteSig = (sigId: number) => {
    setInstances((p) => p.filter((s) => s.id !== sigId));
    if (selectedId === sigId) setSelectedId(null);
  };

  const updateSig = (id: number, upd: Partial<SigInstance>) => {
    setInstances((p) => p.map((s) => s.id === id ? { ...s, ...upd } : s));
  };

  // Copy current page sigs to ALL other pages
  const applyToAllPages = () => {
    if (!instances.length) { toast({ title: "No signatures on this page to copy", variant: "destructive" }); return; }
    setPageInstances((prev) => {
      const result: Record<number, SigInstance[]> = {};
      for (let p = 1; p <= pdfPageCount; p++) {
        result[p] = instances.map((s) => ({ ...s, id: nextId.current++ }));
      }
      return result;
    });
    toast({ title: `Copied to all ${pdfPageCount} pages` });
  };

  // Copy sigs from another specific page to current page
  const copyFromPage = (fromPage: number) => {
    const sourceSigs = pageInstances[fromPage] ?? [];
    if (!sourceSigs.length) { toast({ title: `Page ${fromPage} has no signatures`, variant: "destructive" }); return; }
    setInstances((p) => [...p, ...sourceSigs.map((s) => ({ ...s, id: nextId.current++ }))]);
    toast({ title: `Copied from page ${fromPage} to page ${currentPage}` });
  };

  const onPointerMove = useCallback((e: PointerEvent) => {
    const ds = dragRef.current;
    if (!ds) return;
    const dx = (e.clientX - ds.startClientX) / ds.containerW;
    const dy = (e.clientY - ds.startClientY) / ds.containerH;
    const sig = ds.startSig;

    if (ds.action === "move") {
      // Allow free movement including outside the page (clamped loosely to prevent total escape)
      const newX = Math.max(-0.8, Math.min(1.0, sig.x + dx));
      const newY = Math.max(-0.8, Math.min(1.0, sig.y + dy));
      setPageInstances((prev) => {
        const page = Object.keys(prev).find(
          (k) => (prev[Number(k)] ?? []).some((s) => s.id === ds.sigId)
        );
        if (!page) return prev;
        const pg = Number(page);
        return {
          ...prev,
          [pg]: (prev[pg] ?? []).map((s) => s.id === ds.sigId ? { ...s, x: newX, y: newY } : s),
        };
      });
    } else if (ds.action === "rotate") {
      const cx = ds.containerW * (sig.x + sig.width / 2);
      const cy = ds.containerH * (sig.y + (sig.width / ds.sigAspect) / 2);
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const angle = Math.atan2(e.clientY - (rect.top + cy), e.clientX - (rect.left + cx)) * (180 / Math.PI) + 90;
      setPageInstances((prev) => {
        const page = Object.keys(prev).find((k) => (prev[Number(k)] ?? []).some((s) => s.id === ds.sigId));
        if (!page) return prev;
        const pg = Number(page);
        return { ...prev, [pg]: (prev[pg] ?? []).map((s) => s.id === ds.sigId ? { ...s, rotation: angle } : s) };
      });
    } else {
      const origR = sig.x + sig.width;
      const origB = sig.y + sig.width / ds.sigAspect;
      let nw = sig.width, nx = sig.x, ny = sig.y;

      if (ds.action === "resize-br")      { nw = Math.max(0.04, sig.width + dx); }
      else if (ds.action === "resize-bl") { nw = Math.max(0.04, sig.width - dx); nx = origR - nw; }
      else if (ds.action === "resize-tr") { nw = Math.max(0.04, sig.width + dx); ny = origB - nw / ds.sigAspect; }
      else if (ds.action === "resize-tl") { nw = Math.max(0.04, sig.width - dx); nx = origR - nw; ny = origB - nw / ds.sigAspect; }

      setPageInstances((prev) => {
        const page = Object.keys(prev).find((k) => (prev[Number(k)] ?? []).some((s) => s.id === ds.sigId));
        if (!page) return prev;
        const pg = Number(page);
        return {
          ...prev,
          [pg]: (prev[pg] ?? []).map((s) =>
            s.id === ds.sigId ? { ...s, x: nx, y: ny, width: Math.min(nw, 1.5) } : s
          ),
        };
      });
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

  const downloadSigned = useCallback(async () => {
    const totalSigs = Object.values(pageInstances).reduce((s, arr) => s + arr.length, 0);
    if (totalSigs === 0) { toast({ title: "Add at least one signature first", variant: "destructive" }); return; }
    setDownloading(true);
    try {
      const sigImg = await loadImg(processedPng);

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
          toast({ title: "Downloaded signed document!" });
        }, "image/png");

      } else if (docType === "pdf" && docFile) {
        const pdfBytes = await docFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const sigRes = await fetch(processedPng);
        const sigBytes = await sigRes.arrayBuffer();
        const sigEmbedded = await pdfDoc.embedPng(new Uint8Array(sigBytes));
        const pdfPages = pdfDoc.getPages();

        for (let p = 1; p <= pdfPageCount; p++) {
          const pageSigs = pageInstances[p] ?? [];
          if (!pageSigs.length) continue;
          const pdfPage = pdfPages[p - 1];
          if (!pdfPage) continue;
          const { width: pw, height: ph } = pdfPage.getSize();

          for (const sig of pageSigs) {
            const sw = sig.width * pw;
            const sh = sw / sigAspect;
            const cx = sig.x * pw + sw / 2;
            const cy = ph - sig.y * ph - sh / 2;

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
  }, [pageInstances, instances, processedPng, docType, docFile, docImageUrl, pdfPageCount, sigAspect, toast]);

  const hasDoc = docType !== null && !docLoading;
  const totalSignedPages = Object.values(pageInstances).filter((arr) => arr.length > 0).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-foreground">Add Signature to Document</p>
          <p className="text-xs text-muted-foreground">Upload a PDF or image — 100% private, processed locally</p>
        </div>
        {!hideClose && (
          <Button type="button" size="icon" variant="ghost" onClick={onClose} data-testid="button-close-sign-doc">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Remove white bg toggle */}
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2">
        <button
          type="button"
          role="switch"
          aria-checked={removeWhiteBg}
          onClick={() => setRemoveWhiteBg((v) => !v)}
          data-testid="toggle-remove-white-bg"
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${removeWhiteBg ? "bg-primary" : "bg-input"}`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${removeWhiteBg ? "translate-x-4" : "translate-x-0"}`}
          />
        </button>
        <div className="flex-1">
          <p className="text-xs font-medium">Remove white background</p>
          <p className="text-xs text-muted-foreground">Makes the signature transparent — recommended</p>
        </div>
        <img
          src={processedPng}
          alt="Signature preview"
          className="h-8 rounded border bg-white object-contain shrink-0"
          style={{ maxWidth: 80 }}
        />
      </div>

      {/* Upload area */}
      {!hasDoc && (
        <div>
          <label
            className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-muted/30 hover-elevate cursor-pointer py-10 px-4"
            data-testid="label-sign-doc-upload"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleDocUpload(f); }}
          >
            <Upload className="h-8 w-8 text-primary" />
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">Upload PDF, PNG, JPG or any image</p>
              <p className="text-xs text-muted-foreground mt-1">Click or drag &amp; drop · Max {MAX_MB}MB · 100% local</p>
            </div>
            <input
              type="file"
              accept=".pdf,application/pdf,.png,.jpg,.jpeg,.webp,.bmp,.tiff,image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleDocUpload(e.target.files[0])}
              data-testid="input-sign-doc-file"
            />
          </label>
          {docLoading && (
            <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              Loading document…
            </p>
          )}
        </div>
      )}

      {/* Document + signature placement */}
      {hasDoc && (
        <div className="flex flex-col gap-3">
          {/* Page nav (PDF only) */}
          {docType === "pdf" && pdfPageCount > 1 && (
            <div className="flex items-center justify-between gap-2 rounded-lg border bg-muted/20 px-3 py-2">
              <div className="flex items-center gap-2">
                <Button
                  type="button" variant="outline" size="icon"
                  onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  data-testid="button-prev-page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium tabular-nums">
                  Page {currentPage} <span className="text-muted-foreground font-normal">/ {pdfPageCount}</span>
                </span>
                <Button
                  type="button" variant="outline" size="icon"
                  onClick={() => currentPage < pdfPageCount && goToPage(currentPage + 1)}
                  disabled={currentPage >= pdfPageCount}
                  data-testid="button-next-page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {totalSignedPages > 0 && (
                  <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 font-medium">
                    {totalSignedPages} page{totalSignedPages !== 1 ? "s" : ""} signed
                  </span>
                )}
                {instances.length > 0 && (
                  <Button
                    type="button" variant="outline" size="sm"
                    onClick={applyToAllPages}
                    className="gap-1 text-xs h-7"
                    data-testid="button-apply-all-pages"
                  >
                    <Layers className="h-3 w-3" />
                    Apply to all
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Document canvas */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-2">Drag to move · corner handles to resize · circle to rotate</p>
              <div
                ref={containerRef}
                className="relative w-full rounded-xl border bg-muted/30 select-none overflow-hidden"
                style={{ minHeight: 200 }}
                onClick={(e) => { if (e.target === containerRef.current) setSelectedId(null); }}
                data-testid="div-sign-doc-preview"
              >
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

                {instances.map((sig) => {
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
                      <img src={processedPng} alt="Signature" className="w-full h-full object-contain pointer-events-none" draggable={false} />

                      {isSelected && <div className="absolute inset-0 border-2 border-primary border-dashed rounded pointer-events-none" />}

                      {isSelected && (
                        <>
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

                          <div className="absolute pointer-events-none" style={{ top: -28, left: "calc(50% - 1px)", width: 2, height: 20, background: "hsl(var(--primary) / 0.5)" }} />

                          <div
                            className="absolute h-5 w-5 bg-white border-2 border-primary rounded-full shadow-md flex items-center justify-center"
                            style={{ top: -36, left: "calc(50% - 10px)", cursor: "grab", zIndex: 30 }}
                            onPointerDown={(e) => startDragSig(e, sig.id, "rotate")}
                            data-testid={`handle-rotate-${sig.id}`}
                          >
                            <RotateCcw className="h-2.5 w-2.5 text-primary" />
                          </div>

                          <button
                            type="button"
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

                {instances.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rounded-xl bg-black/50 text-white text-sm px-5 py-3 flex items-center gap-2">
                      <MousePointer className="h-4 w-4" />
                      Click &ldquo;Add Signature&rdquo; to place it
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls sidebar */}
            <div className="w-full sm:w-52 shrink-0 space-y-3">
              <div className="rounded-lg border p-3 bg-muted/20 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Signature</p>
                <img src={processedPng} alt="Signature" className="w-full rounded border bg-white object-contain" style={{ maxHeight: 44 }} />
                <div className="flex gap-2">
                  <Button type="button" size="sm" onClick={addSig} className="flex-1 gap-1" data-testid="button-add-sig">
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </Button>
                  {selectedId !== null && (
                    <Button type="button" size="icon" variant="outline" onClick={() => duplicateSig(selectedId)} title="Duplicate" data-testid="button-duplicate-sig">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Per-page copy controls for PDF */}
              {docType === "pdf" && pdfPageCount > 1 && (
                <div className="rounded-lg border p-3 bg-muted/20 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pages</p>
                  {instances.length > 0 && (
                    <Button
                      type="button" variant="outline" size="sm"
                      onClick={applyToAllPages}
                      className="w-full gap-1.5 text-xs"
                      data-testid="button-apply-all-pages-sidebar"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      Copy to all {pdfPageCount} pages
                    </Button>
                  )}
                  {/* Buttons to copy sigs from any signed page to current page */}
                  {Object.entries(pageInstances)
                    .filter(([pg, sigs]) => Number(pg) !== currentPage && sigs.length > 0)
                    .slice(0, 3)
                    .map(([pg, sigs]) => (
                      <Button
                        key={pg}
                        type="button" variant="ghost" size="sm"
                        onClick={() => copyFromPage(Number(pg))}
                        className="w-full gap-1.5 text-xs justify-start"
                        data-testid={`button-copy-from-page-${pg}`}
                      >
                        <Copy className="h-3 w-3" />
                        Copy from page {pg} ({sigs.length} sig{sigs.length !== 1 ? "s" : ""})
                      </Button>
                    ))
                  }
                  {instances.length === 0 && Object.values(pageInstances).every((a) => !a.length) && (
                    <p className="text-xs text-muted-foreground">Add a signature, then copy it to other pages.</p>
                  )}
                </div>
              )}

              {selectedSig && (
                <div className="rounded-lg border p-3 space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Selected</p>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Size</Label>
                      <span className="text-xs font-medium tabular-nums">{Math.round(selectedSig.width * 100)}%</span>
                    </div>
                    <Slider min={5} max={120} step={1} value={[Math.round(selectedSig.width * 100)]} onValueChange={([v]) => updateSig(selectedSig.id, { width: v / 100 })} data-testid="slider-sig-size" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Rotation</Label>
                      <span className="text-xs font-medium tabular-nums">{Math.round(selectedSig.rotation)}°</span>
                    </div>
                    <Slider min={-180} max={180} step={1} value={[Math.round(selectedSig.rotation)]} onValueChange={([v]) => updateSig(selectedSig.id, { rotation: v })} data-testid="slider-sig-rotation" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Opacity</Label>
                      <span className="text-xs font-medium tabular-nums">{Math.round(selectedSig.opacity * 100)}%</span>
                    </div>
                    <Slider min={10} max={100} step={5} value={[Math.round(selectedSig.opacity * 100)]} onValueChange={([v]) => updateSig(selectedSig.id, { opacity: v / 100 })} data-testid="slider-sig-opacity" />
                  </div>

                  <Button
                    type="button"
                    variant="outline" size="sm"
                    onClick={() => deleteSig(selectedSig.id)}
                    className="w-full gap-1.5 text-destructive border-destructive/30"
                    data-testid="button-delete-selected-sig"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              )}

              <Button
                type="button"
                onClick={downloadSigned}
                disabled={downloading || totalSignedPages === 0}
                className="w-full gap-2"
                data-testid="button-download-signed"
              >
                {downloading
                  ? <span className="h-4 w-4 animate-spin border-2 border-primary-foreground border-t-transparent rounded-full" />
                  : <Download className="h-4 w-4" />}
                Save &amp; Download
              </Button>

              {docType === "pdf" && pdfPageCount > 1 && totalSignedPages > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  {totalSignedPages} of {pdfPageCount} pages have signatures
                </p>
              )}

              <button
                type="button"
                onClick={() => { setDocFile(null); setDocType(null); setDocImageUrl(null); setPdfPreviews({}); setPageInstances({}); setSelectedId(null); }}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
                data-testid="button-change-doc"
              >
                Change document
              </button>

              <div className="flex items-start gap-2 text-xs text-muted-foreground rounded-lg border bg-muted/20 p-2">
                <Lock className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                <span>100% private — your file never leaves your device.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
