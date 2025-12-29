import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Zap, Lock, Download } from "lucide-react";

export default function ConvertDocumentTextToPdfFormatting() {
  useSEO({
    title: "How to Convert Document Text to PDF with Formatting - Complete Guide",
    description: "Learn how to convert text documents to PDF while preserving formatting. Keep indentation, spacing, and structure intact.",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-to-pdf/formatting-guide",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground" data-testid="breadcrumb-home">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground" data-testid="breadcrumb-tools">Tools</Link>
          {" / "}
          <Link href="/tools/text-to-pdf" className="hover:text-foreground" data-testid="breadcrumb-tool">Text to PDF</Link>
          {" / "}
          <span className="text-foreground">Formatting Guide</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How to Convert Document Text to PDF While Keeping Formatting Intact</h1>
          </div>
          <Link href="/tools/text-to-pdf">
            <Button size="lg" className="whitespace-nowrap" data-testid="button-use-tool">
              <ArrowRight className="mr-2 h-4 w-4" />
              Use Tool
            </Button>
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Proper formatting guides readers through your content. When you convert text to PDF carelessly, indents disappear, line breaks collapse, and your carefully structured document becomes harder to read. Learn how to preserve formatting and create professional PDFs from text.
        </p>

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Preserve Structure</h3>
                  <p className="text-sm text-muted-foreground">Maintain all formatting elements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Professional Results</h3>
                  <p className="text-sm text-muted-foreground">Create polished documents</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Instant Conversion</h3>
                  <p className="text-sm text-muted-foreground">One-click formatting preservation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-4">Why Formatting Matters in Documents</h2>
        <p className="text-muted-foreground mb-6">
          Formatting isn't decoration—it's communication. Indented paragraphs signal new ideas. Line breaks create visual breathing room. Lists with proper spacing are easier to scan. When formatting is lost during conversion, documents become harder to read and appear unprofessional. This is especially critical for proposals, reports, CVs, and business documents.
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Preparing Your Text Before Conversion</h3>
            <p className="text-muted-foreground mb-4">
              The best results start before conversion. If working in a plain text editor, keep formatting simple: use line breaks between paragraphs, tabs for indentation, and consistent spacing for emphasis. Complex formatting (colors, multiple fonts, graphics) requires document editors first.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm text-muted-foreground font-mono">
              <p>✓ Use clear line breaks between sections</p>
              <p>✓ Maintain consistent indentation</p>
              <p>✓ Use standard spacing conventions</p>
              <p>✗ Avoid special characters or complex formatting</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Using Smart Conversion Tools</h3>
            <p className="text-muted-foreground">
              Choose tools designed specifically for preserving formatting. Pixocraft's text-to-PDF converter recognizes formatting patterns—paragraph breaks, indentation, spacing—and translates them accurately into PDF format. Spaces remain spaces, line breaks stay intact, and document structure is preserved.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Advanced Formatting Tips for Perfect PDFs</h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lists and Bullet Points</h4>
              <p className="text-muted-foreground">Use consistent markers (-, *, •) for list items. Pixocraft recognizes these conventions and maintains them in the PDF.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Heading Hierarchies</h4>
              <p className="text-muted-foreground">Structure your document with clear heading levels. Use consistent spacing and styling to signal hierarchy, which converts properly into PDF format.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Whitespace and Breathing Room</h4>
              <p className="text-muted-foreground">Use consistent paragraph spacing and indentation. Proper whitespace makes documents scannable and readable after conversion.</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Common Formatting Problems and Solutions</h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Indentation Lost After Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground"><strong>Solution:</strong> Use consistent spacing (multiple spaces or tabs) before converting. Pixocraft preserves these patterns accurately. Avoid using single spaces for indentation.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Line Breaks Disappearing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground"><strong>Solution:</strong> Ensure proper paragraph separation. Double line breaks become paragraph breaks; single breaks stay as line breaks. Preview your PDF before final download.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Columns Not Aligning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground"><strong>Solution:</strong> Text-to-PDF conversion works best with single-column layouts. For complex multi-column documents, use document editors before conversion.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Special Characters Not Displaying</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground"><strong>Solution:</strong> Pixocraft supports Unicode and international text. Ensure your text file is saved in UTF-8 format for best results with special characters.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Privacy & Security for Formatted Documents</h2>
        <p className="text-muted-foreground mb-6">
          Formatted documents often contain sensitive information. Pixocraft doesn't retain files after conversion. Your documents are processed locally, downloaded immediately, and never stored on servers. No tracking, no logging, no third-party access—your formatting-sensitive documents stay completely private.
        </p>

        <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Will tables convert correctly?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Simple text-based tables using spaces or pipes approximate reasonably. For complex tables, consider using document editors first, then exporting to text before conversion.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What about special characters and Unicode?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Pixocraft handles special characters, Unicode symbols, and international text (Arabic, Hindi, Chinese, etc.) perfectly while preserving formatting.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I control font sizes in the PDF?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Text-to-PDF conversion applies uniform font sizing. If you need variable font sizes, use a document editor first to set formatting, then export and convert.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">How do I preserve bullet points?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Use standard bullet markers (-, *, •) in your text. Pixocraft recognizes these conventions and maintains them in the PDF output.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What's the character limit for formatting preservation?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No practical limit. Even documents with thousands of lines and complex formatting convert reliably. The conversion quality remains consistent regardless of size.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Related Tools You Might Find Useful</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>• Pixocraft Main Text-to-PDF Tool – Convert any text with formatting options</p>
            <p>• Document Formatter Tool – Prepare text before PDF conversion</p>
            <p>• PDF Optimizer Tool – Refine and compress converted PDFs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
