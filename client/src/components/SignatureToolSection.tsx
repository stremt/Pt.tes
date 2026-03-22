import { PenTool, Lock, Zap, Download, Shield, Wifi, ArrowDown } from "lucide-react";
import SignaturePadWidget from "@/components/SignaturePadWidget";
import { PDFSignatureTool } from "@/components/PDFSignatureTool";

interface SignatureToolSectionProps {
  mode?: "draw" | "pdf";
  caption?: string;
  pdfCtaLabel?: string;
}

const TRUST_BADGES = [
  { icon: <Lock className="h-3 w-3" />, label: "No Login" },
  { icon: <Shield className="h-3 w-3" />, label: "100% Private" },
  { icon: <Wifi className="h-3 w-3" />, label: "Works Offline" },
  { icon: <Download className="h-3 w-3" />, label: "Instant Download" },
  { icon: <Zap className="h-3 w-3" />, label: "No Watermark" },
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

  const heading =
    mode === "pdf"
      ? "Sign Your PDF — Upload, Place & Download"
      : "Create Your Signature";

  return (
    <section id="tool" className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl border-2 border-primary/25 bg-card overflow-hidden shadow-sm">

      {/* Prominent header banner */}
      <div className="bg-primary px-4 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <PenTool className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm sm:text-base font-bold text-white tracking-wide">
            {heading}
          </span>
          <ArrowDown className="h-4 w-4 text-white/70 hidden sm:block" />
        </div>
        <div className="flex flex-nowrap overflow-x-auto gap-1.5 pb-0.5 sm:pb-0 scrollbar-none">
          {TRUST_BADGES.map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30"
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
