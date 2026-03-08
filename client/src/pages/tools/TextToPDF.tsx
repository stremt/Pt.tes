import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";

export default function TextToPDF() {
  useSEO({
    title: "Text to PDF Converter Online Free – Rich Text Editor with Formatting | Pixocraft",
    description: "Convert text to professional PDF instantly with our rich text editor. Supports bold, italic, headings, lists, tables, and code blocks. 100% private, browser-based and free.",
    keywords: "text to pdf, convert text to pdf, txt to pdf converter, paste text to pdf, rich text editor, convert notes to pdf, convert email to pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-to-pdf",
    ogTitle: "Text to PDF Converter – Free Professional PDF Generator",
    ogDescription: "Create professional PDFs with our rich text editor. Format text with bold, italics, headings, lists, tables and more.",
    ogType: "website",
  });

  const faqItems: FAQItem[] = [
    {
      question: "How do I use the rich text editor?",
      answer:
        "Simply click on the editor area and start typing. Use the toolbar buttons above the editor to apply formatting like bold, italic, headings, lists, tables, and code blocks. Your changes are saved automatically.",
    },
    {
      question: "What formatting options are available?",
      answer:
        "The editor supports: text formatting (bold, italic, underline, strikethrough), headings (H1, H2, H3), lists (bulleted and numbered), text alignment (left, center, right), code blocks, tables, and horizontal dividers.",
    },
    {
      question: "Can I insert tables?",
      answer:
        "Yes! Click the table button in the toolbar, specify the number of rows and columns, and a formatted table will be inserted. You can then edit the table content directly.",
    },
    {
      question: "How do I download the PDF?",
      answer:
        "After formatting your content in the editor, customize your PDF settings (font, size, filename) in the left sidebar, then click 'Download PDF'. The PDF will automatically download to your device.",
    },
    {
      question: "Is my content stored anywhere?",
      answer:
        "No, your content is only stored in your browser's local storage. Nothing is sent to our servers. Your privacy is completely protected.",
    },
    {
      question: "Can I use special characters and symbols?",
      answer:
        "Yes, you can type any special characters, symbols, and unicode characters directly into the editor. They will all be preserved in the PDF.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Text to PDF Converter</h1>
            <p className="text-xl text-blue-100 mb-8">
              Create professionally formatted PDFs with a rich text editor. No downloads, no ads, 100% free and private.
            </p>
          </div>
        </div>
      </div>

      {/* Main Tool */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TextToPdfTool storageKey="text-to-pdf-content" />
      </div>

      {/* Features Section */}
      <div className="bg-muted/50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <Type className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Rich Text Formatting</h3>
                <p className="text-muted-foreground">
                  Bold, italic, underline, and strikethrough text. Apply headings (H1-H3) for document structure.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Download className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Instant PDF Export</h3>
                <p className="text-muted-foreground">
                  Convert your formatted content to professional PDFs with custom fonts and sizes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Zap className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Fast & Lightweight</h3>
                <p className="text-muted-foreground">
                  No registration, no subscriptions. All processing happens in your browser instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <ShieldCheck className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">100% Private</h3>
                <p className="text-muted-foreground">
                  Your content never leaves your device. We don't store, log, or analyze your data.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Globe className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Works Everywhere</h3>
                <p className="text-muted-foreground">
                  Works on all modern browsers. No software installation needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Tables & Code Blocks</h3>
                <p className="text-muted-foreground">
                  Insert formatted tables and code blocks. Perfect for documentation and technical content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="bg-muted/50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Other Conversion Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/tools/markdown-to-pdf">
              <Card className="hover:bg-accent cursor-pointer transition">
                <CardHeader>
                  <CardTitle className="text-base">Markdown to PDF</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Convert Markdown formatted text to PDF with full syntax support.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/email-to-pdf">
              <Card className="hover:bg-accent cursor-pointer transition">
                <CardHeader>
                  <CardTitle className="text-base">Email to PDF</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Convert email content to professional PDF documents.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/table-to-pdf">
              <Card className="hover:bg-accent cursor-pointer transition">
                <CardHeader>
                  <CardTitle className="text-base">Table to PDF</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Convert tables and structured data to PDF format.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tools/notes-to-pdf">
              <Card className="hover:bg-accent cursor-pointer transition">
                <CardHeader>
                  <CardTitle className="text-base">Notes to PDF</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Convert notes and lists into formatted PDFs.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <StructuredData data={generateFAQSchema(faqItems)} />
    </div>
  );
}
