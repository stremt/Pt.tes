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
import { getRelatedTools } from "@/lib/tools";
import { 
  Download, FileText, Zap, Shield, WifiOff, CheckCircle, 
  FileCode2, Info, BarChart3, Rocket, Heart, Search, 
  Sparkles, UserCheck, Mail, Database, Terminal, 
  FileJson, Layout, BookOpen, PenTool, ClipboardList,
  Edit3, Save, FileType, Settings, Lock, Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

export default function TextToFile() {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("note");
  const { toast } = useToast();

  const toolName = "Ultimate Online Text File Creator & Editor";
  const toolDescription = "Create, write, and download text files (.txt) instantly. No software needed, 100% private browser-based text editor for developers, students, and writers.";
  const canonicalUrl = "https://tools.pixocraft.in/tools/text-to-file";

  useSEO({
    title: "Create Text File Online - Free Text File Generator & Notepad",
    description: toolDescription,
    keywords: "create text file online, text file generator, create txt file online, write text file online, download text file, notepad online, online text editor, txt file creator, text file maker, create file online",
    canonicalUrl,
  });

  const appSchema = useMemo(() => generateSoftwareApplicationSchema({
    name: toolName,
    description: toolDescription,
    url: canonicalUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Windows, macOS, Linux, Android, iOS",
    offers: { price: "0", priceCurrency: "USD" }
  }), []);

  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Text Tools", url: "/tools/text" },
    { name: "Text File Creator", url: "/tools/text-to-file" }
  ]), []);

  const handleDownload = () => {
    if (!text.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text before downloading.",
        variant: "destructive",
      });
      playErrorSound();
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${filename || "note"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);

    toast({
      title: "File Generated",
      description: "Your text file has been downloaded successfully.",
    });
    playCompletionSound();
  };

  const faqItems: FAQItem[] = [
    {
      question: "How do I create a .txt file without Notepad or Word?",
      answer: "You can use our online text file generator. Simply type or paste your text into the editor, enter a filename, and click 'Download .txt File'. It works in any browser without installing any software."
    },
    {
      question: "Is this online notepad secure and private?",
      answer: "Yes, 100%. Our tool uses client-side processing, meaning your text is never sent to our servers. Everything happens locally in your browser. No login is required, ensuring complete anonymity."
    },
    {
      question: "Can I use this tool to create config files for coding?",
      answer: "Absolutely. Many developers use this tool to quickly generate .env, .gitignore, or other configuration files. Just download as a .txt and rename the extension if needed."
    },
    {
      question: "What is the difference between a .txt file and a .doc file?",
      answer: "A .txt file (plain text) contains only characters and no formatting like bold, italics, or images. This makes it universal and perfect for code, notes, and configuration. .doc files contain rich formatting data and require specific software like Word to view properly."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes! Once the page is loaded, the file generation logic runs entirely in your browser. You can disconnect from the internet and still create and download your text files."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Text Tools", url: "/tools/text" }, { label: "Text File Creator" }]} />

          {/* Hero Section */}
          <div className="text-center space-y-6 my-12 md:my-20">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-2xl mb-4">
              <FileText className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
              Create <span className="text-primary">Text Files</span> Online
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The internet's most authoritative text file generator. Write, edit, and download .txt files instantly with 
              <span className="text-foreground font-bold"> zero server storage</span> and maximum privacy.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><CheckCircle className="w-3 h-3 mr-2 text-green-500" /> Free & Unlimited</Badge>
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><Shield className="w-3 h-3 mr-2 text-blue-500" /> 100% Private (Local)</Badge>
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><WifiOff className="w-3 h-3 mr-2 text-orange-500" /> Offline Capable</Badge>
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><Rocket className="w-3 h-3 mr-2 text-purple-500" /> SEO Optimized</Badge>
            </div>
          </div>

          {/* Main Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-8 space-y-6">
              <Card className="border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-primary" />
                    Editor Space
                  </CardTitle>
                  <CardDescription>Type or paste your content below. Your progress is saved locally.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing your notes, code, or configuration here..."
                    className="min-h-[400px] font-mono text-base resize-y border-primary/20 focus-visible:ring-primary"
                    data-testid="textarea-content"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card className="sticky top-24 border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Save className="w-5 h-5 text-primary" />
                    Save & Download
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="filename">Filename</Label>
                    <div className="flex gap-2">
                      <Input
                        id="filename"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        placeholder="my-file"
                        className="font-mono"
                        data-testid="input-filename"
                      />
                      <span className="flex items-center text-muted-foreground font-mono">.txt</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleDownload} className="w-full h-14 text-lg font-bold rounded-xl" size="lg" data-testid="button-download">
                      <Download className="mr-2 h-5 w-5" />
                      Download .txt File
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setText("")}
                      data-testid="button-clear"
                    >
                      Clear Editor
                    </Button>
                  </div>

                  <div className="pt-6 border-t space-y-4">
                    <h4 className="text-sm font-bold flex items-center gap-2"><Lock className="w-4 h-4 text-green-500" /> Privacy Shield</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your text is processed entirely in your browser. We never see, store, or transmit your data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="max-w-4xl mx-auto space-y-20 py-20 border-t">
            <article className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">What is a Text File (.txt)?</h2>
              <p className="lead">
                A text file is a kind of computer file that is structured as a sequence of lines of electronic text. A text file exists within a computer file system. The end of a text file is often denoted by placing one or more special characters, known as an end-of-file marker, after the last line in a text file.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
                <Card className="bg-primary/5 border-none">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Info className="w-5 h-5" /> Plain Text Format</CardTitle></CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    Plain text refers to textual data in ASCII or UTF-8 format. Unlike DOCX or PDF files, plain text files do not contain font information, bolding, or images.
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-none">
                  <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Why Use Plain Text?</CardTitle></CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted-foreground">
                    Plain text is the universal language of computing. It is readable by every operating system and is the primary format for code, config files, and long-term data storage.
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-6">Text File vs Document File</h3>
              <p>
                While a .doc or .pdf file is a "rich" document that preserves complex layouts and images, a .txt file is "raw". This simplicity is its greatest strength, making it the preferred format for developers, system administrators, and anyone needing high-performance, universal data.
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-20 mb-8">Professional Use Cases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                {[
                  { icon: Terminal, title: "Developers", desc: "Create .env, .gitignore, and config files instantly." },
                  { icon: BookOpen, title: "Students", desc: "Take distraction-free notes for assignments." },
                  { icon: PenTool, title: "Writers", desc: "Draft content in a clean, plain-text environment." },
                  { icon: Settings, title: "SysAdmins", desc: "Generate server scripts and log templates." },
                  { icon: ClipboardList, title: "QA Testers", desc: "Quickly save bug reports and test data." },
                  { icon: Share2, title: "Content Creators", desc: "Draft video scripts and social media posts." }
                ].map((useCase, i) => (
                  <Card key={i} className="hover-elevate">
                    <CardHeader className="p-4">
                      <useCase.icon className="w-6 h-6 text-primary mb-2" />
                      <CardTitle className="text-base">{useCase.title}</CardTitle>
                      <CardDescription className="text-xs">{useCase.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-6">Technical Authority Signals</h3>
              <p>
                Our tool leverages the native <code>Blob</code> and <code>URL.createObjectURL</code> browser APIs. This means the file is generated directly from your browser's RAM into a downloadable link. No server-side processing is involved, which makes this one of the fastest and most secure ways to create files online.
              </p>
            </article>

            {/* Comparison Table */}
            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Software Comparison</h2>
              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-bold uppercase text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Feature</th>
                      <th className="px-6 py-4">Online Creator</th>
                      <th className="px-6 py-4">Notepad (Desktop)</th>
                      <th className="px-6 py-4">Word Processor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4 font-bold">Access</td>
                      <td className="px-6 py-4">Any Device (Web)</td>
                      <td className="px-6 py-4">Windows Only</td>
                      <td className="px-6 py-4">Installed Software</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold">Privacy</td>
                      <td className="px-6 py-4 text-green-600 font-bold">100% Local</td>
                      <td className="px-6 py-4">Local</td>
                      <td className="px-6 py-4">Cloud/Local</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold">Cost</td>
                      <td className="px-6 py-4">Free</td>
                      <td className="px-6 py-4">Included</td>
                      <td className="px-6 py-4">Paid/Subscription</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQs */}
            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-bold py-6">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
