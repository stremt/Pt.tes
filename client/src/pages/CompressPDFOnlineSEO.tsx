import { useSEO } from "@/lib/seo";
import { FileText, Download, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CompressPDFOnlineSEO() {
  useSEO({
    title: "Compress PDF Online Free - Reduce File Size Without Quality Loss",
    description: "Compress PDF files instantly online. Reduce file size, maintain quality, no signup required. Fast, free, and completely private."
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <div className="mb-8 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">•</span>
          <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
          <span className="mx-2">•</span>
          <span>Compress PDF</span>
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Compress PDF Online – Reduce File Size Instantly, No Quality Loss
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mt-4">
            Shrink PDF files without sacrificing readability. Email large PDFs easily, save storage space, and share documents faster. Works offline in your browser, completely free and private.
          </p>
        </header>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">Why Compress PDF Files?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Large PDF files create multiple problems. Email providers limit attachment sizes—many cap files at 25 MB. Sending a 50 MB PDF fails immediately. Cloud storage fills up with bloated files. Downloads take forever on slow connections. Documents won't open on mobile devices. Compressing PDFs solves all these problems instantly.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            PDF compression reduces file size by removing redundant data, optimizing images, and eliminating unnecessary metadata. The content remains completely readable—users won't notice any quality difference. A 100 MB PDF often compresses to 20-30 MB with absolutely no visible impact on readability.
          </p>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">Who Needs PDF Compression?</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <Download className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground"><strong>Professionals Sharing Documents:</strong> Reports, contracts, and proposals need to email easily without size rejection or slow uploads</span>
            </li>
            <li className="flex gap-3">
              <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground"><strong>Students Submitting Assignments:</strong> University systems often reject files over certain sizes. Compression ensures delivery</span>
            </li>
            <li className="flex gap-3">
              <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground"><strong>Businesses Managing Archives:</strong> Large document collections consume expensive storage. Compression reduces costs significantly</span>
            </li>
            <li className="flex gap-3">
              <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground"><strong>Content Distributors:</strong> Publishers, agencies, and consultants send PDFs constantly. Compression speeds distribution</span>
            </li>
          </ul>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">How PDF Compression Actually Works</h2>
          <p className="text-muted-foreground leading-relaxed">
            PDF compression removes unnecessary data without removing content. Images within PDFs often contain more detail than human eyes can see. Compression reduces image resolution to what's actually visible, dramatically shrinking file size. PDFs also contain metadata, form data, and embedded objects that may not be essential. Smart compression removes these without affecting what users read.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The process is automatic. Upload your PDF, select compression intensity (balance between size reduction and quality), and download the compressed result. Quality PDFs typically compress to 30-50% of original size without any noticeable degradation. Scanned PDFs or PDFs with high-resolution images compress even more aggressively.
          </p>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">Common PDF Compression Mistakes</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Over-Compressing and Losing Quality</h3>
              <p className="text-muted-foreground text-sm">Aggressive compression can make text blurry and images unreadable. Use balanced settings that reduce size while maintaining clarity.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Not Checking File Size Limits</h3>
              <p className="text-muted-foreground text-sm">Know your email provider's attachment limit before compressing. Gmail allows 25 MB, but some corporate systems are stricter.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Using Online Tools That Keep Your Files</h3>
              <p className="text-muted-foreground text-sm">Some services store uploaded PDFs on their servers. Use privacy-focused tools that process locally and delete files immediately.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Forgetting to Verify After Compression</h3>
              <p className="text-muted-foreground text-sm">Always open the compressed PDF to ensure all content is readable and nothing important got removed.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Repeatedly Compressing the Same File</h3>
              <p className="text-muted-foreground text-sm">Each compression pass degrades quality. Compress once with the right settings instead of multiple times.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">Privacy & Security During Compression</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your PDFs are processed entirely in your browser using local compression algorithms. Files never upload to external servers, never get stored in databases, and never get accessed by anyone else. Your compressed PDF downloads directly to your device, and that's the only place sensitive information exists.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This local processing approach means zero privacy risk. Confidential contracts, financial documents, medical files, and personal information stay completely private. There's no signup, no account tracking, and no ability for the tool to access your files after compression.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">PDF Compression FAQs</h2>
          <div className="space-y-4">
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">Will compression remove pages or content?</summary>
              <p className="text-muted-foreground text-sm mt-3">No. Compression only removes redundant data and reduces image resolution. All pages and content remain intact and readable.</p>
            </details>
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">How much smaller will my PDF become?</summary>
              <p className="text-muted-foreground text-sm mt-3">Compression varies by content. Text-heavy PDFs compress less. PDFs with images compress significantly—often reaching 30-50% of original size with no visible quality loss.</p>
            </details>
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">Does compression affect searchability or copying text?</summary>
              <p className="text-muted-foreground text-sm mt-3">No. Compressed PDFs remain fully searchable and copyable. All text data is preserved exactly as it was in the original.</p>
            </details>
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">Can I compress password-protected PDFs?</summary>
              <p className="text-muted-foreground text-sm mt-3">Most compression tools can't modify encrypted PDFs for security reasons. You'll need to remove the password first, then compress.</p>
            </details>
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">Is compression safe for scanned documents?</summary>
              <p className="text-muted-foreground text-sm mt-3">Yes, and scanned PDFs compress extremely well since they're essentially image files. Compression can reduce them to 20% of original size.</p>
            </details>
          </div>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold">More PDF Tools</h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              <Link href="/tools/pdf-compressor" className="text-primary hover:underline font-semibold">
                Compress PDF
              </Link>
              {" "}– Reduce PDF file size while maintaining perfect readability and quality.
            </p>
            <p className="text-muted-foreground">
              <Link href="/tools/pdf-merger" className="text-primary hover:underline font-semibold">
                Merge PDFs
              </Link>
              {" "}– Combine multiple PDF files into a single document instantly.
            </p>
            <p className="text-muted-foreground">
              <Link href="/tools/pdf-splitter" className="text-primary hover:underline font-semibold">
                Split PDF
              </Link>
              {" "}– Extract specific pages from PDFs or split large documents into smaller files.
            </p>
          </div>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Compress Your PDF Now</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Reduce file size instantly while maintaining perfect quality. Email large PDFs easily, save storage, and share documents faster.
          </p>
          <Link href="/tools/pdf-compressor">
            <Button size="lg" data-testid="button-compress-pdf">
              Compress PDF Free
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
