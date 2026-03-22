import { PenTool, Lock, Zap, Download, Shield, Wifi } from "lucide-react";
import SignaturePadWidget from "@/components/SignaturePadWidget";
import { PDFSignatureTool } from "@/components/PDFSignatureTool";

interface SignatureToolSectionProps {
  mode?: "draw" | "pdf";
  caption?: string;
  pdfCtaLabel?: string;
}

const TRUST_BADGES = [
  { icon: <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />, label: "No Login" },
  { icon: <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5" />, label: "100% Private" },
  { icon: <Wifi className="h-3 w-3 sm:h-3.5 sm:w-3.5" />, label: "Works Offline" },
  { icon: <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />, label: "Instant Download" },
  { icon: <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />, label: "No Watermark" },
];

export default function SignatureToolSection({
  mode = "draw",
  caption,
  pdfCtaLabel = "Insert Signature into PDF",
}: SignatureToolSectionProps) {
  const defaultCaption =
    mode === "pdf"
      ? "No watermark · No server upload · Signed PDF downloads instantly"
      : "No watermark · No server upload · Transparent PNG · Works offline";

  return (
    <section id="tool" className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl border bg-card overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-5 py-3 sm:py-3.5 border-b bg-muted/40">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-md sm:rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <PenTool className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            {mode === "pdf" ? "Sign PDF — Upload, Place & Download" : "Create Your Signature"}
          </span>
        </div>
        <div className="flex flex-nowrap overflow-x-auto sm:flex-wrap gap-1 sm:gap-1.5 pb-0.5 sm:pb-0 scrollbar-none">
          {TRUST_BADGES.map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex shrink-0 items-center gap-1 text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border bg-background text-muted-foreground"
            >
              {icon}
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Tool widget */}
      <div className="p-3 sm:p-5">
        {mode === "pdf" ? (
          <PDFSignatureTool ctaLabel={pdfCtaLabel} />
        ) : (
          <SignaturePadWidget />
        )}
      </div>

      {/* Footer caption */}
      <div className="px-3 sm:px-5 py-2.5 sm:py-3 border-t bg-muted/20 text-center">
        <p className="text-xs text-muted-foreground">{caption ?? defaultCaption}</p>
      </div>
    </section>
  );
}
