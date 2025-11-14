import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Table, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function HTMLTableGenerator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [htmlCode, setHtmlCode] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "HTML Table Generator | Create Clean Table Code | Pixocraft Tools",
    description: "Create HTML tables visually and copy clean table code instantly. Offline supported.",
    keywords: "html table generator, table maker, table code tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/html-table-generator",
  });

  const generateTable = () => {
    let html = '<table border="1" cellpadding="8" cellspacing="0">\n';
    
    for (let i = 0; i < rows; i++) {
      html += '  <tr>\n';
      for (let j = 0; j < cols; j++) {
        const tag = i === 0 ? 'th' : 'td';
        const content = i === 0 ? `Header ${j + 1}` : `Cell ${i}-${j + 1}`;
        html += `    <${tag}>${content}</${tag}>\n`;
      }
      html += '  </tr>\n';
    }
    
    html += '</table>';
    setHtmlCode(html);
  };

  const copyCode = () => {
    if (htmlCode) {
      navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "HTML code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const howItWorks = [
    { step: 1, title: "Set Dimensions", description: "Choose number of rows and columns" },
    { step: 2, title: "Generate Code", description: "Click to create HTML table code" },
    { step: 3, title: "Copy & Use", description: "Copy clean HTML table code instantly" },
  ];

  const benefits = [
    { icon: <Table className="h-5 w-5" />, title: "Basic Styles", description: "Border & padding supported" },
    { icon: <Table className="h-5 w-5" />, title: "Clean Code", description: "Well-formatted, readable HTML" },
    { icon: <Table className="h-5 w-5" />, title: "Instant", description: "Generate tables in seconds" },
    { icon: <Table className="h-5 w-5" />, title: "Offline Ready", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Borders & styles supported?",
      answer: "Basic styles supported. The generated table includes border, cellpadding, and cellspacing attributes. You can easily customize the CSS after copying."
    },
    {
      question: "Can I customize the content?",
      answer: "Yes! After generating, you can edit the HTML code directly before copying. Modify headers, cell content, or add your own styling."
    },
    {
      question: "Is the code clean and valid?",
      answer: "Absolutely! We generate properly formatted, indented HTML that follows web standards. It's ready to paste into your website or HTML editor."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="HTML Table Generator"
        description="Choose rows/columns → fill data → copy clean HTML table code."
        icon={<Table className="h-8 w-8" />}
        toolId="html-table-generator"
        category="developer"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">HTML Table Generator</span>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rows">Number of Rows</Label>
              <Input
                id="rows"
                type="number"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                data-testid="input-rows"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cols">Number of Columns</Label>
              <Input
                id="cols"
                type="number"
                min="1"
                max="20"
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                data-testid="input-cols"
              />
            </div>
          </div>

          <Button
            onClick={generateTable}
            size="lg"
            className="w-full"
            data-testid="button-generate-table"
          >
            <Table className="mr-2 h-5 w-5" />
            Generate HTML Table
          </Button>

          {htmlCode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">HTML Code</h3>
                <Button
                  onClick={copyCode}
                  size="sm"
                  variant="outline"
                  data-testid="button-copy-code"
                >
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  Copy
                </Button>
              </div>
              <Textarea
                value={htmlCode}
                readOnly
                rows={12}
                className="font-mono text-sm"
                data-testid="output-html"
              />
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
