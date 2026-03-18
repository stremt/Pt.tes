import { useParams } from "wouter";
import SignaturePadWidget from "@/components/SignaturePadWidget";
import { PenTool, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function SignatureEditPage() {
  const params = useParams<{ id: string }>();
  const rawId = params?.id ?? "";
  const savedId = rawId.replace(/^signature-/, "");

  const exists = (() => {
    try {
      return !!localStorage.getItem("pixocraft_sig_" + savedId);
    } catch {
      return false;
    }
  })();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <PenTool className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">Edit Your Signature</h1>
            <p className="text-sm text-muted-foreground">Restore, modify, and re-download your saved signature.</p>
          </div>
        </div>

        {!exists ? (
          <div className="rounded-xl border bg-card p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-lg font-semibold">Signature not found</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              This link was not found in your browser's storage. It may have been cleared, or you may be on a different device or browser.
            </p>
            <Button asChild className="mt-2" data-testid="edit-button-go-home">
              <Link href="/tools/free-online-signature-maker">Create a new signature</Link>
            </Button>
          </div>
        ) : (
          <SignaturePadWidget savedId={savedId} />
        )}

        <p className="text-xs text-center text-muted-foreground">
          Signatures are saved locally in your browser. They are never uploaded to our servers.
        </p>
      </div>
    </main>
  );
}
