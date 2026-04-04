import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Download, Zap, AlertCircle, Copy, Check } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEMO_VIDEO_ID = "dQw4w9WgXcQ";
const DEMO_URL = `https://www.youtube.com/watch?v=${DEMO_VIDEO_ID}`;
const MAIN_TOOL = "/tools/youtube-thumbnail-downloader";

const SIZES = [
  { label: "Max HD", key: "maxresdefault", width: 1280, height: 720 },
  { label: "High", key: "hqdefault", width: 480, height: 360 },
  { label: "Medium", key: "mqdefault", width: 320, height: 180 },
  { label: "SD", key: "sddefault", width: 640, height: 480 },
  { label: "Default", key: "default", width: 120, height: 90 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractVideoId(url: string): string | null {
  const patterns = [
    /[?&]v=([^&#]+)/,
    /youtu\.be\/([^?&#]+)/,
    /youtube\.com\/embed\/([^?&#]+)/,
    /youtube\.com\/shorts\/([^?&#]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function buildThumbnails(videoId: string) {
  return SIZES.map((s) => ({
    ...s,
    url: `https://img.youtube.com/vi/${videoId}/${s.key}.jpg`,
    videoId,
  }));
}

type Thumbnail = ReturnType<typeof buildThumbnails>[number];

// ─── Component ────────────────────────────────────────────────────────────────

interface YouTubeThumbnailToolProps {
  label?: string;
  autoFocus?: boolean;
  testIdPrefix?: string;
  variant?: "full" | "compact";
}

export default function YouTubeThumbnailTool({
  label,
  autoFocus,
  testIdPrefix = "yttool",
  variant = "full",
}: YouTubeThumbnailToolProps) {
  const isCompact = variant === "compact";

  const resolvedLabel =
    label ?? (isCompact
      ? "Paste YouTube link → Get thumbnails instantly"
      : "Paste a YouTube link to get thumbnails instantly:");

  const resolvedAutoFocus = autoFocus ?? !isCompact;

  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (resolvedAutoFocus) inputRef.current?.focus();
  }, [resolvedAutoFocus]);

  const extract = useCallback((overrideUrl?: string) => {
    const u = overrideUrl ?? url;
    setError("");
    if (!u.trim()) { setError("Please paste a YouTube URL first."); return; }
    const id = extractVideoId(u);
    if (!id) { setError("Invalid YouTube URL. Try: youtube.com/watch?v=..."); return; }
    setLoading(true);
    setThumbnails([]);
    setTimeout(() => {
      setThumbnails(buildThumbnails(id));
      setSelected(0);
      setLoading(false);
    }, 350);
  }, [url]);

  const download = (thumb: Thumbnail) => {
    const a = document.createElement("a");
    a.href = thumb.url;
    a.download = `thumbnail-${thumb.videoId}-${thumb.key}.jpg`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyUrl = async (thumb: Thumbnail) => {
    await navigator.clipboard.writeText(thumb.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const current = thumbnails[selected];

  return (
    <div className="space-y-3">
      {/* Label */}
      {resolvedLabel && (
        <p className={`font-semibold text-muted-foreground ${isCompact ? "text-xs" : "text-sm"}`}>
          {resolvedLabel}
        </p>
      )}

      {/* Input row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          ref={inputRef}
          placeholder="Paste YouTube URL — e.g. youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && extract()}
          data-testid={`${testIdPrefix}-input-url`}
          className={`flex-1 ${isCompact ? "h-10 text-sm" : "h-11 text-base"}`}
        />
        <Button
          onClick={() => extract()}
          disabled={loading}
          className={`font-semibold flex-shrink-0 ${isCompact ? "h-10 px-4" : "h-11 px-6"}`}
          data-testid={`${testIdPrefix}-btn-extract`}
        >
          {loading
            ? <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Extracting…
              </span>
            : <><Zap className="w-4 h-4 mr-1.5" />Get Thumbnails</>}
        </Button>
      </div>

      {/* Microcopy + sample link */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs text-muted-foreground">
          Works with youtube.com • youtu.be • Shorts — No login required
        </p>
        <button
          onClick={() => { setUrl(DEMO_URL); extract(DEMO_URL); }}
          className="text-xs text-primary font-medium underline underline-offset-2 hover-elevate"
          data-testid={`${testIdPrefix}-btn-sample`}
        >
          Try a sample link
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Preview + size picker */}
      {thumbnails.length > 0 && current && (
        isCompact ? (
          /* ── Compact layout ── */
          <div className="space-y-3 pt-1">
            {/* Thumbnail strip */}
            <div className="rounded-lg overflow-hidden border bg-muted/30">
              <img
                src={current.url}
                alt={`YouTube thumbnail — ${current.label} (${current.width}×${current.height})`}
                className="w-full object-cover"
                loading="lazy"
              />
              <div className="px-3 py-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{current.width}×{current.height}px</span>
                <span>{current.label}</span>
              </div>
            </div>

            {/* Size pills */}
            <div className="flex flex-wrap gap-1.5">
              {thumbnails.map((t, i) => (
                <button
                  key={t.key}
                  onClick={() => setSelected(i)}
                  data-testid={`${testIdPrefix}-size-${t.key}`}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    i === selected
                      ? "border-primary bg-primary/10 font-semibold text-primary"
                      : "border-border hover-elevate text-muted-foreground"
                  }`}
                >
                  {t.label} <span className="opacity-60">{t.width}×{t.height}</span>
                </button>
              ))}
            </div>

            {/* Action row */}
            <div className="flex gap-2">
              <Button
                onClick={() => download(current)}
                className="flex-1 font-semibold"
                data-testid={`${testIdPrefix}-btn-download`}
              >
                <Download className="w-4 h-4 mr-2" />
                Download {current.label}
              </Button>
              <Button
                variant="outline"
                onClick={() => copyUrl(current)}
                size="icon"
                data-testid={`${testIdPrefix}-btn-copy-url`}
                title="Copy image URL"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>

            {/* Internal link back to main */}
            <p className="text-center text-xs text-muted-foreground">
              Want full features?{" "}
              <Link href={MAIN_TOOL} className="text-primary underline underline-offset-2 font-medium">
                Use the best YouTube thumbnail downloader
              </Link>
              {" "}— ZIP download, CTR analyzer & more.
            </p>
          </div>
        ) : (
          /* ── Full layout ── */
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            {/* Thumbnail preview */}
            <div className="rounded-lg overflow-hidden border bg-muted/30">
              <img
                src={current.url}
                alt={`YouTube thumbnail — ${current.label} quality (${current.width}×${current.height})`}
                className="w-full object-cover"
                loading="lazy"
              />
              <div className="px-3 py-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{current.width} × {current.height}px</span>
                <span>{current.label} Quality</span>
              </div>
            </div>

            {/* Size picker + actions */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Choose resolution</p>
              <div className="space-y-1.5">
                {thumbnails.map((t, i) => (
                  <button
                    key={t.key}
                    onClick={() => setSelected(i)}
                    data-testid={`${testIdPrefix}-size-${t.key}`}
                    className={`w-full text-left px-3 py-2 rounded-md border text-sm transition-colors ${
                      i === selected
                        ? "border-primary bg-primary/5 font-semibold"
                        : "border-border hover-elevate"
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {t.width}×{t.height}
                    </span>
                  </button>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pt-1">
                <Button
                  onClick={() => download(current)}
                  className="flex-1 font-semibold"
                  data-testid={`${testIdPrefix}-btn-download`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download {current.label}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => copyUrl(current)}
                  className="flex-shrink-0"
                  data-testid={`${testIdPrefix}-btn-copy-url`}
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground pt-1">
                Need ZIP download + CTR analyzer?{" "}
                <Link href={MAIN_TOOL} className="text-primary underline underline-offset-2">
                  Try the full tool
                </Link>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
