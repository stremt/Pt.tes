import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  useSEO, 
  StructuredData, 
  generateFAQSchema, 
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  type FAQItem
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { 
  Download, FileText, Zap, Shield, WifiOff, CheckCircle, 
  Info, BarChart3, Rocket, Terminal, BookOpen, PenTool, 
  ClipboardList, Edit3, Save, Settings, Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

export default function PlainTextEditor() {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("editor-output");
  const { toast } = useToast();

  const toolName = "Plain Text Editor Online — UTF-8 & ASCII Browser Editor";
  const toolDescription = "Professional plain text editor online for developers and system admins. Supports UTF-8 and ASCII encoding, perfect for raw text editing and programming workflows.";
  const canonicalUrl = "https://tools.pixocraft.in/plain-text-editor";

  useSEO({
    title: "Plain Text Editor Online — UTF-8 & ASCII Text Editor",
    description: toolDescription,
    keywords: "plain text editor, plain text editor online, ascii text editor, utf-8 text editor, simple text editor browser, raw text editing",
    canonicalUrl,
  });

  const appSchema = useMemo(() => generateSoftwareApplicationSchema({
    name: "Plain Text Editor Online",
    description: toolDescription,
    url: canonicalUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { price: "0", priceCurrency: "USD" }
  }), []);

  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Plain Text Editor", url: "/plain-text-editor" }
  ]), []);

  const handleDownload = () => {
    if (!text.trim()) {
      toast({ title: "Input Required", description: "Please enter some text before downloading.", variant: "destructive" });
      playErrorSound();
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${filename || "output"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    toast({ title: "File Downloaded", description: "Your plain text file is ready." });
    playCompletionSound();
  };

  const faqItems: FAQItem[] = [
    { question: "What is a plain text editor?", answer: "A plain text editor is a tool that handles raw characters without any rich formatting (like bold or italics). It is the standard for code, config files, and system scripts." },
    { question: "Does this editor support UTF-8?", answer: "Yes, our browser editor fully supports UTF-8 and ASCII encoding, ensuring compatibility with all modern programming and system environments." }
  ];

  return (
    <>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Plain Text Editor" }]} />
          <div className="text-center space-y-6 my-12">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Plain Text <span className="text-primary">Editor</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Authoritative browser-based plain text editor for developers, sysadmins, and technical workflows.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-8 space-y-6">
              <Card className="border-2 border-primary/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Terminal className="w-5 h-5 text-primary" /> Raw Text Workspace</CardTitle></CardHeader>
                <CardContent>
                  <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your code or text here..." className="min-h-[500px] w-full font-mono text-base p-4" />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Card className="sticky top-24 border-2 border-primary/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Save className="w-5 h-5 text-primary" /> Export File</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="filename">Filename</Label>
                    <Input id="filename" value={filename} onChange={(e) => setFilename(e.target.value)} className="font-mono" />
                  </div>
                  <Button onClick={handleDownload} className="w-full h-12 font-bold" size="lg"><Download className="mr-2 h-5 w-5" /> Download TXT</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
