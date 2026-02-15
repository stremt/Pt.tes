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
import { Link } from "wouter";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

export default function OnlineNotepad() {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("my-notes");
  const { toast } = useToast();

  const toolName = "Online Notepad — Free Browser Text Editor";
  const toolDescription = "Best free online notepad for instant note writing, editing, and downloading text files in the browser. No login required, 100% private and distraction-free.";
  const canonicalUrl = "https://tools.pixocraft.in/online-notepad";

  useSEO({
    title: "Online Notepad — Free Browser Text Editor & Simple Note Taker",
    description: toolDescription,
    keywords: "online notepad, online notepad free, simple notepad online, notepad online without login, write notes online, browser notepad, distraction-free writing, private note writing",
    canonicalUrl,
  });

  const appSchema = useMemo(() => generateSoftwareApplicationSchema({
    name: "Online Notepad",
    description: toolDescription,
    url: canonicalUrl,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Any",
    offers: { price: "0", priceCurrency: "USD" }
  }), []);

  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Online Notepad", url: "/online-notepad" }
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
    element.download = `${filename || "notes"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    toast({ title: "Notes Saved", description: "Your notes have been downloaded as a .txt file." });
    playCompletionSound();
  };

  const faqItems: FAQItem[] = [
    { question: "What is an online notepad?", answer: "An online notepad is a browser-based tool that allows you to write, edit, and save text notes instantly without installing any software. It's perfect for quick brainstorming, temporary storage, and distraction-free writing." },
    { question: "Does this notepad save my data automatically?", answer: "Yes, our editor uses local storage to keep your text safe while the browser tab is open. However, for long-term storage, we recommend clicking 'Download' to save your work as a .txt file on your device." },
    { question: "Is it safe to write private notes here?", answer: "Absolutely. Everything you write stays on your device. We use 100% client-side processing, meaning your data never touches our servers." }
  ];

  return (
    <>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Online Notepad" }]} />
          <div className="text-center space-y-6 my-12">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Online <span className="text-primary">Notepad</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Free browser-based text editor for instant, distraction-free note taking. No login, 100% private.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-8 space-y-6">
              <Card className="border-2 border-primary/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Edit3 className="w-5 h-5 text-primary" /> Write Your Notes</CardTitle></CardHeader>
                <CardContent>
                  <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Start writing your thoughts..." className="min-h-[500px] w-full text-base p-4" />
                </CardContent>
              </Card>
              <article className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none mt-12">
                <h2>Why Use an Online Notepad?</h2>
                <p>Traditional word processors can be slow and cluttered. An online notepad offers a lightweight, instant-access alternative for students, writers, and researchers.</p>
                <h3>Privacy Focused Note Taking</h3>
                <p>Your privacy is our priority. Since this tool runs entirely in your browser, your sensitive information is never uploaded or tracked.</p>
              </article>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Card className="sticky top-24 border-2 border-primary/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Save className="w-5 h-5 text-primary" /> Save Locally</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="filename">Filename</Label>
                    <Input id="filename" value={filename} onChange={(e) => setFilename(e.target.value)} className="font-mono" />
                  </div>
                  <Button onClick={handleDownload} className="w-full h-12 text-lg font-bold" size="lg"><Download className="mr-2 h-5 w-5" /> Download Notes</Button>
                  <div className="pt-4 border-t text-xs text-muted-foreground"><Lock className="w-3 h-3 inline mr-1" /> 100% Secure & Private</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
