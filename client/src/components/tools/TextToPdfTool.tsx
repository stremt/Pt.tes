import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
} from "lucide-react";

interface TextToPdfToolProps {
  sampleText?: string;
  storageKey?: string;
}

export function TextToPdfTool({ storageKey = "text-to-pdf-content" }: TextToPdfToolProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [converting, setConverting] = useState(false);
  const [fontSize, setFontSize] = useState("12");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [titleText, setTitleText] = useState("");
  const { toast } = useToast();

  // Load content from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (editorRef.current && saved) {
      editorRef.current.innerHTML = saved;
    }
  }, [storageKey]);

  // Save content to localStorage
  const saveContent = () => {
    if (editorRef.current) {
      localStorage.setItem(storageKey, editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    saveContent();
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    saveContent();
  };

  const insertTable = () => {
    const rows = prompt("Number of rows:", "3");
    const cols = prompt("Number of columns:", "3");

    if (!rows || !cols) return;

    const rowNum = parseInt(rows);
    const colNum = parseInt(cols);

    let table = '<table style="border-collapse: collapse; width: 100%; margin: 16px 0;"><tbody>';
    for (let i = 0; i < rowNum; i++) {
      table += "<tr>";
      for (let j = 0; j < colNum; j++) {
        const tag = i === 0 ? "th" : "td";
        table += `<${tag} style="border: 1px solid #ccc; padding: 8px;">${i === 0 ? `Header ${j + 1}` : ""}</${tag}>`;
      }
      table += "</tr>";
    }
    table += "</tbody></table>";

    document.execCommand("insertHTML", false, table);
    editorRef.current?.focus();
    saveContent();
  };

  const insertCodeBlock = () => {
    const code =
      '<pre style="background: #f6f8fa; padding: 16px; border-radius: 6px; font-family: Courier New, monospace; overflow-x: auto; margin: 16px 0;"><code>// Your code here</code></pre>';
    document.execCommand("insertHTML", false, code);
    editorRef.current?.focus();
    saveContent();
  };

  const insertDivider = () => {
    const divider =
      '<hr style="border: none; border-top: 1px solid #d0d7de; margin: 28px 0;" />';
    document.execCommand("insertHTML", false, divider);
    editorRef.current?.focus();
    saveContent();
  };

  const clearEditor = () => {
    if (confirm("Clear all content?")) {
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
        saveContent();
      }
    }
  };

  const convertToPDF = async () => {
    if (!editorRef.current?.innerHTML.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to convert",
        variant: "destructive",
      });
      return;
    }

    setConverting(true);
    try {
      const element = document.createElement("div");
      element.style.fontFamily = fontFamily;
      element.style.fontSize = fontSize + "pt";
      element.style.padding = "20px";
      element.style.backgroundColor = "#ffffff";
      element.style.color = "#000000";
      element.style.lineHeight = "1.6";

      const htmlContent = `
        <style>
          body { margin: 0; padding: 0; }
          div { font-family: ${fontFamily}; font-size: ${fontSize}pt; color: #000000; line-height: 1.6; }
          h1 { font-size: 28px; font-weight: 700; margin: 24px 0 12px; page-break-inside: avoid; }
          h2 { font-size: 20px; font-weight: 600; margin: 20px 0 10px; page-break-inside: avoid; }
          h3 { font-size: 16px; font-weight: 600; margin: 18px 0 8px; page-break-inside: avoid; }
          p { margin: 10px 0; page-break-inside: avoid; }
          ul, ol { margin: 10px 0 10px 20px; page-break-inside: avoid; }
          li { margin: 6px 0; }
          strong { font-weight: 700; }
          em { font-style: italic; }
          u { text-decoration: underline; }
          s { text-decoration: line-through; }
          table { border-collapse: collapse; width: 100%; margin: 20px 0; page-break-inside: avoid; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f4f4f4; font-weight: bold; }
          pre { 
            background: #f6f8fa; 
            padding: 16px; 
            border-radius: 6px; 
            font-family: "Courier New", monospace; 
            font-size: 11px;
            overflow-x: auto; 
            margin: 20px 0;
            page-break-inside: avoid;
            white-space: pre-wrap;
            word-break: break-all;
          }
          code { font-family: "Courier New", monospace; }
          hr { border: none; border-top: 1px solid #d0d7de; margin: 28px 0; }
          blockquote { border-left: 4px solid #ccc; padding-left: 12px; margin: 16px 0; color: #555; font-style: italic; }
        </style>
        <div>${editorRef.current.innerHTML}</div>
      `;

      element.innerHTML = htmlContent;
      document.body.appendChild(element);

      const opt = {
        margin: 10,
        filename:
          titleText && titleText.trim()
            ? titleText.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".pdf"
            : "document.pdf",
        html2canvas: {
          scale: 2.5,
          backgroundColor: "#ffffff",
          useCORS: true,
          allowTaint: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await new Promise((r) => setTimeout(r, 500));
      await html2pdf().set(opt).from(element).save();
      document.body.removeChild(element);

      toast({
        title: "Success!",
        description: "PDF downloaded successfully",
      });
    } catch (error) {
      console.error("PDF conversion error:", error);
      toast({
        title: "Error",
        description: "Failed to convert to PDF",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Settings */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>PDF export options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Filename (Optional)</label>
                <Input
                  placeholder="my-document"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  data-testid="input-filename"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  data-testid="select-font"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option>Arial</option>
                  <option>Times New Roman</option>
                  <option>Courier New</option>
                  <option>Georgia</option>
                  <option>Verdana</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Font Size (pt)</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  data-testid="select-size"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="10">10pt</option>
                  <option value="11">11pt</option>
                  <option value="12">12pt</option>
                  <option value="13">13pt</option>
                  <option value="14">14pt</option>
                  <option value="16">16pt</option>
                </select>
              </div>

              <Button
                onClick={convertToPDF}
                disabled={converting}
                className="w-full"
                data-testid="button-convert"
              >
                <Download className="mr-2 h-4 w-4" />
                {converting ? "Converting..." : "Download PDF"}
              </Button>

              <Button
                onClick={clearEditor}
                variant="outline"
                className="w-full"
                data-testid="button-clear"
              >
                Clear Editor
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Rich Text Editor</CardTitle>
              <CardDescription>Format your document with styling</CardDescription>
            </CardHeader>

            {/* Toolbar */}
            <div className="px-6 py-4 border-b bg-muted/30 flex flex-wrap gap-1">
              {/* Text formatting */}
              <div className="flex gap-1 border-r pr-2 mr-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("bold")}
                  title="Bold (Ctrl+B)"
                  data-testid="button-bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("italic")}
                  title="Italic (Ctrl+I)"
                  data-testid="button-italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("underline")}
                  title="Underline (Ctrl+U)"
                  data-testid="button-underline"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("strikeThrough")}
                  title="Strikethrough"
                  data-testid="button-strikethrough"
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </div>

              {/* Headings */}
              <div className="flex gap-1 border-r pr-2 mr-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("formatBlock", "h1")}
                  title="Heading 1"
                  data-testid="button-h1"
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("formatBlock", "h2")}
                  title="Heading 2"
                  data-testid="button-h2"
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("formatBlock", "h3")}
                  title="Heading 3"
                  data-testid="button-h3"
                >
                  <Heading3 className="h-4 w-4" />
                </Button>
              </div>

              {/* Lists */}
              <div className="flex gap-1 border-r pr-2 mr-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("insertUnorderedList")}
                  title="Bullet List"
                  data-testid="button-bullet-list"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("insertOrderedList")}
                  title="Numbered List"
                  data-testid="button-ordered-list"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </div>

              {/* Alignment */}
              <div className="flex gap-1 border-r pr-2 mr-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("justifyLeft")}
                  title="Align Left"
                  data-testid="button-align-left"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("justifyCenter")}
                  title="Align Center"
                  data-testid="button-align-center"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => execCommand("justifyRight")}
                  title="Align Right"
                  data-testid="button-align-right"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Blocks */}
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={insertCodeBlock}
                  title="Code Block"
                  data-testid="button-code-block"
                >
                  <Code className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={insertTable}
                  title="Insert Table"
                  data-testid="button-table"
                >
                  ⊞
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={insertDivider}
                  title="Divider"
                  data-testid="button-divider"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Editor Content */}
            <CardContent className="flex-1 p-0 overflow-hidden">
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onBlur={saveContent}
                data-testid="editor-content"
                className="w-full h-full min-h-[500px] p-6 outline-none overflow-auto focus:outline-none"
                style={{
                  fontSize: fontSize + "pt",
                  fontFamily: fontFamily,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  lineHeight: "1.6",
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
