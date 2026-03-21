import { PenTool, Lock, Zap, Download, Shield, Wifi } from "lucide-react";
import SignaturePadWidget from "@/components/SignaturePadWidget";
import { PDFSignatureTool } from "@/components/PDFSignatureTool";

interface SignatureToolSectionProps {
  mode?: "draw" | "pdf";
  caption?: string;
  pdfCtaLabel?: string;
}

const TRUST_BADGES = [
  { icon: <Lock className="h-3.5 w-3.5" />, label: "No Login" },
  { icon: <Shield className="h-3.5 w-3.5" />, label: "100% Private" },
  { icon: <Wifi className="h-3.5 w-3.5" />, label: "Works Offline" },
  { icon: <Download className="h-3.5 w-3.5" />, label: "Instant Download" },
  { icon: <Zap className="h-3.5 w-3.5" />, label: "No Watermark" },
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
    <section id="tool" className="mb-12 rounded-2xl border bg-card overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b bg-muted/40 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <PenTool className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            {mode === "pdf" ? "Sign PDF — Upload, Place & Download" : "Create Your Signature"}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TRUST_BADGES.map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border bg-background text-muted-foreground"
            >
              {icon}
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Tool widget */}
      <div className="p-4 sm:p-5">
        {mode === "pdf" ? (
          <PDFSignatureTool ctaLabel={pdfCtaLabel} />
        ) : (
          <SignaturePadWidget />
        )}
      </div>

      {/* Footer caption */}
      <div className="px-5 py-3 border-t bg-muted/20 text-center">
        <p className="text-xs text-muted-foreground">{caption ?? defaultCaption}</p>
      </div>
    </section>
  );
}
