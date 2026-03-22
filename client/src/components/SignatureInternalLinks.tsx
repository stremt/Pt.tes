import { Link } from "wouter";
import { PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignatureTopPromo() {
  return (
    <div
      className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      data-testid="section-signature-top-promo"
    >
      <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <PenTool className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-foreground text-base leading-snug">Start Here: Signature Generator</p>
        <p className="text-sm text-muted-foreground mt-1 leading-snug">
          Free, no-login tool to draw, type, or upload your signature — download a transparent PNG in seconds.
        </p>
      </div>
      <Link href="/tools/signature-generator">
        <Button className="gap-2 shrink-0 w-full sm:w-auto" data-testid="button-open-signature-generator">
          <PenTool className="h-4 w-4" />
          Open Signature Generator
        </Button>
      </Link>
    </div>
  );
}

export interface RelatedToolLink {
  href: string;
  label: string;
  desc: string;
}

export function SignatureRelatedTools({ links }: { links: RelatedToolLink[] }) {
  return (
    <section data-testid="section-more-signature-tools">
      <h2 className="text-2xl font-bold text-foreground mb-2">More Signature Tools</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        Explore related tools from Pixocraft to complete your document signing workflow.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map(({ href, label, desc }) => (
          <Link key={href} href={href}>
            <div
              className="flex items-start gap-3 p-4 rounded-xl border bg-card hover-elevate cursor-pointer"
              data-testid={`link-more-tool-${href.split("/").pop()}`}
            >
              <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
