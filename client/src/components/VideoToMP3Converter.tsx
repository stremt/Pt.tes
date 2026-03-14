import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  Download,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  Clock,
  Archive,
  Plus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { convertMP4ToMP3, formatFileSize } from "@/lib/ffmpeg-client";
import JSZip from "jszip";

export const BITRATE_OPTIONS = [
  { value: "128k", label: "128 kbps", description: "Small size, good for speech & podcasts" },
  { value: "192k", label: "192 kbps", description: "Balanced — great for most use cases" },
  { value: "256k", label: "256 kbps", description: "High quality, ideal for music" },
  { value: "320k", label: "320 kbps", description: "Maximum quality, audiophile grade" },
];

type FileStatus = "waiting" | "loading" | "converting" | "done" | "error";

interface FileItem {
  id: string;
  file: File;
  status: FileStatus;
  progress: number;
  statusText: string;
  blobs: Record<string, Blob>;
  selectedBitrate: string;
  duration: number | null;
  error: string | null;
  elapsed: number;
  dots: number;
}

function estimateMp3Size(duration: number | null, bitrateStr: string): number | null {
  if (!duration) return null;
  const kbps = parseInt(bitrateStr, 10);
  if (!kbps) return null;
  return Math.round((kbps * 1000 / 8) * duration);
}

let _uid = 0;
const uid = () => `f${++_uid}`;

interface VideoToMP3ConverterProps {
  title?: string;
}

export default function VideoToMP3Converter({ title = "Video to MP3 Converter" }: VideoToMP3ConverterProps) {
  const [queue, setQueue] = useState<FileItem[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [bitrate, setBitrate] = useState("192k");
  const [isDragging, setIsDragging] = useState(false);
  const [zipping, setZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const runningRef = useRef(false);
  const queueRef = useRef<FileItem[]>([]);
  const { toast } = useToast();

  const setQueueSync = useCallback((updater: (q: FileItem[]) => FileItem[]) => {
    setQueue(q => { const next = updater(q); queueRef.current = next; return next; });
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<FileItem>) => {
    setQueueSync(q => q.map(item => item.id === id ? { ...item, ...patch } : item));
  }, [setQueueSync]);

  const activeId = queue.find(i => i.status === "loading" || i.status === "converting")?.id;
  useEffect(() => {
    if (!activeId) return;
    let tick = 0;
    const timer = setInterval(() => {
      tick++;
      setQueueSync(q => q.map(i => {
        if (i.id !== activeId) return i;
        return {
          ...i,
          dots: (i.dots % 3) + 1,
          elapsed: tick % 2 === 0 ? i.elapsed + 1 : i.elapsed,
        };
      }));
    }, 500);
    return () => clearInterval(timer);
  }, [activeId, setQueueSync]);

  const getVideoDuration = (file: File): Promise<number | null> =>
    new Promise(resolve => {
      const url = URL.createObjectURL(file);
      const vid = document.createElement("video");
      vid.preload = "metadata";
      vid.onloadedmetadata = () => { URL.revokeObjectURL(url); resolve(isFinite(vid.duration) && vid.duration > 0 ? vid.duration : null); };
      vid.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      vid.src = url;
    });

  const ACCEPTED_EXTS = ["mp4", "mov", "mkv", "avi", "webm", "flv", "mpeg", "mpg", "m4v", "3gp", "wmv"];

  const addFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;
    const valid: File[] = [];
    const invalid: string[] = [];
    for (const f of Array.from(fileList)) {
      const ext = f.name.split(".").pop()?.toLowerCase() || "";
      if (f.type.startsWith("video/") || ACCEPTED_EXTS.includes(ext)) valid.push(f);
      else invalid.push(f.name);
    }
    if (invalid.length) {
      toast({ title: "Skipped unsupported files", description: `${invalid.join(", ")} — only video files are supported.`, variant: "destructive" });
    }
    if (!valid.length) return;
    const newItems: FileItem[] = await Promise.all(valid.map(async f => ({
      id: uid(),
      file: f,
      status: "waiting" as FileStatus,
      progress: 0,
      statusText: "",
      blobs: {},
      selectedBitrate: bitrate,
      duration: await getVideoDuration(f),
      error: null,
      elapsed: 0,
      dots: 1,
    })));
    setQueueSync(q => [...q, ...newItems]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [toast, setQueueSync, bitrate]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => addFiles(e.target.files);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const removeItem = (id: string) => {
    if (isRunning) return;
    setQueueSync(q => q.filter(i => i.id !== id));
  };

  const runQueue = useCallback(async (currentBitrate: string) => {
    if (runningRef.current) return;
    runningRef.current = true;
    setIsRunning(true);
    while (true) {
      const nextItem = queueRef.current.find(i => i.status === "waiting");
      if (!nextItem) break;
      const { id, file } = nextItem;
      queueRef.current = queueRef.current.map(i =>
        i.id === id ? { ...i, status: "loading" as FileStatus } : i
      );
      updateItem(id, { status: "loading", statusText: "Loading", progress: 0, elapsed: 0, dots: 1 });
      try {
        const result = await convertMP4ToMP3(file, currentBitrate, ({ ratio }) => {
          const pct = Math.min(Math.round(ratio * 100), 99);
          let txt = "Analysing";
          if (pct >= 20 && pct < 85) txt = "Converting";
          else if (pct >= 85) txt = "Almost done";
          updateItem(id, { status: "converting", progress: pct, statusText: txt });
        });
        setQueueSync(q => q.map(i => i.id === id ? {
          ...i, status: "done", progress: 100, statusText: "Complete!",
          blobs: { ...i.blobs, [currentBitrate]: result },
          selectedBitrate: currentBitrate,
        } : i));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "";
        updateItem(id, {
          status: "error",
          error: msg.includes("memory") || msg.includes("OOM")
            ? "File too large for browser memory"
            : "Could not extract audio — check the file has an audio track",
        });
      }
    }
    runningRef.current = false;
    setIsRunning(false);
  }, [updateItem, setQueueSync]);

  const startConversion = () => {
    if (isRunning || !queue.some(i => i.status === "waiting")) return;
    runQueue(bitrate);
  };

  const reconvertItem = useCallback(async (id: string, newBitrate: string) => {
    if (runningRef.current) {
      toast({ title: "Please wait", description: "Another conversion is in progress.", variant: "destructive" });
      return;
    }
    const item = queueRef.current.find(i => i.id === id);
    if (!item) return;
    if (item.blobs[newBitrate]) {
      updateItem(id, { selectedBitrate: newBitrate });
      return;
    }
    runningRef.current = true;
    updateItem(id, { status: "loading", statusText: "Loading", progress: 0, elapsed: 0, dots: 1, selectedBitrate: newBitrate });
    try {
      const result = await convertMP4ToMP3(item.file, newBitrate, ({ ratio }) => {
        const pct = Math.min(Math.round(ratio * 100), 99);
        let txt = "Analysing";
        if (pct >= 20 && pct < 85) txt = "Converting";
        else if (pct >= 85) txt = "Almost done";
        updateItem(id, { status: "converting", progress: pct, statusText: txt });
      });
      setQueueSync(q => q.map(i => i.id === id ? {
        ...i, status: "done", progress: 100, statusText: "Complete!",
        blobs: { ...i.blobs, [newBitrate]: result },
        selectedBitrate: newBitrate,
      } : i));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      updateItem(id, { status: "done" });
      toast({
        title: "Conversion failed",
        description: msg.includes("memory") ? "File too large for browser memory." : "Could not extract audio at this quality.",
        variant: "destructive",
      });
    } finally {
      runningRef.current = false;
    }
  }, [updateItem, setQueueSync, toast]);

  const downloadItem = (item: FileItem) => {
    const blob = item.blobs[item.selectedBitrate];
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = item.file.name.replace(/\.[^.]+$/, ".mp3");
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    const done = queue.filter(i => i.status === "done" && i.blobs[i.selectedBitrate]);
    if (!done.length) return;
    setZipping(true);
    try {
      const zip = new JSZip();
      done.forEach(i => zip.file(i.file.name.replace(/\.[^.]+$/, ".mp3"), i.blobs[i.selectedBitrate]));
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "pixocraft-audio.zip";
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setZipping(false);
    }
  };

  const clearAll = () => {
    if (isRunning) return;
    setQueueSync(() => []);
  };

  const doneCount = queue.filter(i => i.status === "done").length;
  const waitingCount = queue.filter(i => i.status === "waiting").length;
  const hasAnyDone = doneCount > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap">
        <CardTitle className="text-xl">{title}</CardTitle>
        {queue.length > 0 && !isRunning && (
          <Button variant="outline" size="sm" onClick={clearAll} data-testid="button-clear-all">
            Clear all
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-5">
        <div
          data-testid="upload-area"
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover-elevate"}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {queue.length === 0 ? (
            <>
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-base font-medium mb-1">Drag and drop video files here</p>
              <p className="text-sm text-muted-foreground mb-4">You can add multiple files at once</p>
              <Button data-testid="button-upload" type="button">Upload Video Files</Button>
              <p className="text-xs text-muted-foreground mt-3">MP4 · MOV · MKV · AVI · WEBM · FLV · MPEG · M4V · 3GP · WMV</p>
            </>
          ) : (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Plus className="h-4 w-4" />
              <span>Add more files</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,.mp4,.mov,.mkv,.avi,.webm,.flv,.mpeg,.m4v,.3gp,.wmv"
            multiple
            onChange={handleFileInput}
            className="hidden"
            data-testid="input-file"
          />
        </div>

        {queue.length > 0 && (
          <>
            {(waitingCount > 0 || isRunning) && (
              <div>
                <p className="text-sm font-medium mb-2">Audio Quality</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BITRATE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      data-testid={`button-bitrate-${opt.value}`}
                      onClick={() => !isRunning && setBitrate(opt.value)}
                      disabled={isRunning}
                      className={`rounded-md border p-3 text-left transition-colors toggle-elevate disabled:opacity-50 disabled:cursor-not-allowed ${bitrate === opt.value ? "border-primary bg-primary/10 toggle-elevated" : "border-border"}`}
                    >
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{opt.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2" data-testid="file-list">
              {queue.map((item, idx) => (
                <div
                  key={item.id}
                  className="rounded-lg border bg-muted/20 p-3 space-y-2"
                  data-testid={`file-item-${item.id}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      {item.status === "waiting" && <Clock className="h-4 w-4 text-muted-foreground" />}
                      {(item.status === "loading" || item.status === "converting") && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                      {item.status === "done" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {item.status === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" data-testid={`text-filename-${item.id}`}>
                        {idx + 1}. {item.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatFileSize(item.file.size)}
                        {item.duration != null && (
                          <> · {Math.floor(item.duration / 60)}:{String(Math.floor(item.duration % 60)).padStart(2, "0")}</>
                        )}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {item.status !== "loading" && item.status !== "converting" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          disabled={isRunning}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {(item.status === "loading" || item.status === "converting") && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{item.statusText || "Loading"}{".".repeat(item.dots)}</span>
                        <span className="tabular-nums">{item.elapsed}s{item.progress > 0 ? ` · ${item.progress}%` : ""}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                        {item.progress === 0 ? (
                          <div className="h-full w-full relative overflow-hidden rounded-full">
                            <div className="absolute inset-0 bg-primary/30 rounded-full" />
                            <div className="absolute inset-y-0 w-1/3 bg-primary rounded-full" style={{ animation: "shimmer-scan 1.4s ease-in-out infinite" }} />
                          </div>
                        ) : (
                          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${item.progress}%` }} />
                        )}
                      </div>
                      {item.progress === 0 && (
                        <p className="text-xs text-muted-foreground">Large files may take a moment to start — please keep this tab open</p>
                      )}
                    </div>
                  )}

                  {item.status === "done" && (
                    <div className="pt-1 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {BITRATE_OPTIONS.map(opt => {
                          const hasBlob = !!item.blobs[opt.value];
                          const isSelected = item.selectedBitrate === opt.value;
                          const est = estimateMp3Size(item.duration, opt.value);
                          return (
                            <button
                              key={opt.value}
                              onClick={() => updateItem(item.id, { selectedBitrate: opt.value })}
                              data-testid={`pill-quality-${item.id}-${opt.value}`}
                              className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors toggle-elevate
                                ${isSelected ? "border-primary bg-primary/10 toggle-elevated" : "border-border"}
                              `}
                            >
                              {opt.label}
                              {hasBlob ? (
                                <span className="ml-1 text-green-600 dark:text-green-400">
                                  · {formatFileSize(item.blobs[opt.value].size)}
                                </span>
                              ) : est ? (
                                <span className="ml-1 text-muted-foreground">· ~{formatFileSize(est)}</span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                      {item.blobs[item.selectedBitrate] ? (
                        <Button
                          size="sm"
                          onClick={() => downloadItem(item)}
                          data-testid={`button-download-${item.id}`}
                          className="w-full"
                        >
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          Download MP3 · {formatFileSize(item.blobs[item.selectedBitrate].size)}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => reconvertItem(item.id, item.selectedBitrate)}
                          disabled={runningRef.current}
                          data-testid={`button-reconvert-${item.id}`}
                          className="w-full"
                        >
                          Convert at {item.selectedBitrate}
                          {estimateMp3Size(item.duration, item.selectedBitrate) != null && (
                            <span className="ml-1 text-muted-foreground text-xs">
                              · est. {formatFileSize(estimateMp3Size(item.duration, item.selectedBitrate)!)}
                            </span>
                          )}
                        </Button>
                      )}
                    </div>
                  )}

                  {item.status === "error" && (
                    <p className="text-xs text-destructive">{item.error}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {waitingCount > 0 && (
                <Button
                  onClick={startConversion}
                  disabled={isRunning}
                  className="flex-1"
                  data-testid="button-convert-all"
                >
                  {isRunning ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Converting…</>
                  ) : (
                    <>Convert {waitingCount} file{waitingCount !== 1 ? "s" : ""} to MP3</>
                  )}
                </Button>
              )}
              {queue.length > 1 && hasAnyDone && (
                <Button
                  variant="outline"
                  onClick={downloadAll}
                  disabled={zipping}
                  data-testid="button-download-all"
                >
                  {zipping ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Zipping…</>
                  ) : (
                    <><Archive className="mr-2 h-4 w-4" />Download all ({doneCount}) as ZIP</>
                  )}
                </Button>
              )}
            </div>

            {doneCount > 0 && waitingCount === 0 && !isRunning && (
              <p className="text-sm text-center text-green-600 dark:text-green-400 font-medium" data-testid="text-success">
                {doneCount === queue.length
                  ? `All ${doneCount} file${doneCount !== 1 ? "s" : ""} converted successfully`
                  : `${doneCount} of ${queue.length} files converted`}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
