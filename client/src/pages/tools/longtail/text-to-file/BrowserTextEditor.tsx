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

export default function BrowserTextEditor() {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("web-edit");
  const { toast } = useToast();

  const toolName = "Browser Text Editor — Write & Edit Text Offline";
  const toolDescription = "Privacy-focused browser text editor. Write, edit, and save text entirely within your browser window. No server storage, full offline support, and cross-device compatibility.";
  const canonicalUrl = "https://tools.pixocraft.in/browser-text-editor";

  useSEO({
    title: "Browser Text Editor — Write & Edit Text Offline",
    description: toolDescription,
    keywords: "browser text editor, browser based editor, text editor in browser, offline text editor browser, web text editor, local processing editor",
    canonicalUrl,
  });

  const appSchema = useMemo(() => generateSoftwareApplicationSchema({
    name: "Browser Text Editor",
    description: toolDescription,
    url: canonicalUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { price: "0", priceCurrency: "USD" }
  }), []);

  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Browser Editor", url: "/browser-text-editor" }
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
    element.download = `${filename || "note"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    toast({ title: "File Saved", description: "Text has been exported from your browser." });
    playCompletionSound();
  };

  const faqItems: FAQItem[] = [
    { question: "Can I use this text editor offline?", answer: "Yes! Once the page is loaded, all processing happens locally in your browser's RAM. You can disconnect from the internet and continue editing and downloading files." },
    { question: "Is my data stored in the browser?", answer: "Your current text is held in your browser's active memory. We recommend downloading your work frequently to ensure no data is lost if the tab is accidentally closed." }
  ];

  return (
    <>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Browser Editor" }]} />
          <div className="text-center space-y-6 my-12">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Browser <span className="text-primary">Text Editor</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Write and edit text directly in your browser with full privacy and offline support. No server uploads, ever.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-8 space-y-6">
              <Card className="border-2 border-primary/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Edit3 className="w-5 h-5 text-primary" /> Web Editor</CardTitle></CardHeader>
                <CardContent>
                  <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your text here..." className="min-h-[500px] w-full text-base p-4" />
                </CardContent>
              </Card>
              <article className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none mt-12">
                <h2>Advantages of Browser-Based Tools</h2>
                <p>Browser text editors provide immediate access across any operating system without the need for installation or complex configuration.</p>
                <h3>Local Processing Architecture</h3>
                <p>By leveraging modern browser memory (RAM) and the Blob API, we ensure your data never touches a server, providing the ultimate privacy-focused editing experience.</p>
              </article>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Card className="sticky top-24 border-2 border-primary/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Save className="w-5 h-5 text-primary" /> Export Data</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="filename">Filename</Label>
                    <div className="flex gap-2">
                      <Input id="filename" value={filename} onChange={(e) => setFilename(e.target.value)} className="font-mono flex-1" />
                      <span className="flex items-center text-muted-foreground">.txt</span>
                    </div>
                  </div>
                  <Button onClick={handleDownload} className="w-full h-12 font-bold" size="lg"><Download className="mr-2 h-5 w-5" /> Download File</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
