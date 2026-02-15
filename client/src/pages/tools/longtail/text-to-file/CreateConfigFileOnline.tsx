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

export default function CreateConfigFileOnline() {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState(".env");
  const { toast } = useToast();

  const toolName = "Create Config File Online — Generate .env & Configuration Files";
  const toolDescription = "Developer-focused config file generator. Easily create .env, robots.txt, JSON, and server configuration files online with 100% privacy and no server storage.";
  const canonicalUrl = "https://tools.pixocraft.in/create-config-file-online";

  useSEO({
    title: "Create Config File Online — Generate .env & Configuration Files",
    description: toolDescription,
    keywords: "create config file online, create .env file online, config file generator, create configuration file, generate config files, developer workflows",
    canonicalUrl,
  });

  const appSchema = useMemo(() => generateSoftwareApplicationSchema({
    name: "Config File Generator",
    description: toolDescription,
    url: canonicalUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { price: "0", priceCurrency: "USD" }
  }), []);

  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Create Config File", url: "/create-config-file-online" }
  ]), []);

  const handleDownload = () => {
    if (!text.trim()) {
      toast({ title: "Input Required", description: "Please enter some configuration data.", variant: "destructive" });
      playErrorSound();
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename || "config.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    toast({ title: "Config Generated", description: `Your configuration file (${filename}) has been saved.` });
    playCompletionSound();
  };

  const faqItems: FAQItem[] = [
    { question: "What is a config file?", answer: "Configuration files (configs) are used to set the parameters and initial settings for computer programs and operating systems. Examples include .env for environment variables and robots.txt for search engines." },
    { question: "Is it safe to generate .env files here?", answer: "Yes. Our generator is 100% client-side. Your sensitive keys and secrets never leave your browser and are never stored on any server." }
  ];

  return (
    <>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Create Config File" }]} />
          <div className="text-center space-y-6 my-12">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Create Config <span className="text-primary">File Online</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Generate .env, robots.txt, and other configuration files instantly. Built for modern developer workflows.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-8 space-y-6">
              <Card className="border-2 border-primary/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Terminal className="w-5 h-5 text-primary" /> Config Editor</CardTitle></CardHeader>
                <CardContent>
                  <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="PORT=3000\nDATABASE_URL=..." className="min-h-[500px] w-full font-mono text-base p-4" />
                </CardContent>
              </Card>
              <article className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none mt-12">
                <h2>Why Configuration Files Matter</h2>
                <p>Config files decouple your code from its settings, allowing for easier maintenance and better security practices by separating secrets from logic.</p>
                <h3>Common Examples</h3>
                <ul>
                  <li><strong>.env:</strong> Environment variables for local and production servers.</li>
                  <li><strong>robots.txt:</strong> Instructions for web crawlers and search engines.</li>
                  <li><strong>JSON/YAML:</strong> Structured data for application settings.</li>
                </ul>
              </article>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Card className="sticky top-24 border-2 border-primary/10">
                <CardHeader><CardTitle className="flex items-center gap-2"><Save className="w-5 h-5 text-primary" /> Save Config</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="filename">Full Filename (including extension)</Label>
                    <Input id="filename" value={filename} onChange={(e) => setFilename(e.target.value)} placeholder=".env" className="font-mono" />
                  </div>
                  <Button onClick={handleDownload} className="w-full h-12 font-bold" size="lg"><Download className="mr-2 h-5 w-5" /> Download Config</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
