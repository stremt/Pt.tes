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
  const toolDescription = "Create, write, and download text files (.txt) instantly. No software needed, 100% private browser-based text editor for developers, students, and writers. Free online notepad for quick file generation.";
  const canonicalUrl = "https://tools.pixocraft.in/tools/text-to-file";

  useSEO({
    title: "Create Text File Online - Free Online Notepad & TXT Generator",
    description: "The most authoritative online text file creator. Write, edit, and download .txt files instantly. 100% private, browser-based text editor for developers, students, and writers. No login required.",
    keywords: "create text file online, online notepad, text file generator, create txt file online, write text online, download text file, txt file creator, text editor online, browser text editor, simple text editor online, plain text editor online, online notepad free, create file without software, write and save text online, secure online text editor",
    canonicalUrl,
  });

  const appSchema = useMemo(() => generateSoftwareApplicationSchema({
    name: "Online Text File Creator & Notepad",
    description: "Browser-based text editor and file generator for creating .txt files online.",
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
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
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
      question: "How do I create a text file online without software?",
      answer: "You can create a text file online instantly using our browser-based editor. Simply type or paste your content, specify a filename, and click 'Download .txt File'. No installation or account is required."
    },
    {
      question: "Is this online notepad secure and private?",
      answer: "Yes. Our tool operates 100% client-side. Your data is processed in your browser's memory and never sent to any server. This ensures total privacy and security for your notes and configuration files."
    },
    {
      question: "Can I use this as an offline text editor?",
      answer: "Absolutely. Once the page is loaded, the editor and file generation logic work entirely offline. This makes it a reliable tool for system administrators and developers working in restricted environments."
    },
    {
      question: "What is the difference between ASCII and UTF-8 encoding?",
      answer: "ASCII is a 7-bit character set containing 128 characters, primarily used for English. UTF-8 is a variable-width encoding that can represent every character in the Unicode set, making it the modern standard for global text portability."
    },
    {
      question: "Can I create .env or .gitignore files here?",
      answer: "Yes. Developers frequently use this tool to generate .env, .gitignore, and other hidden configuration files. Simply download the file as a .txt and rename it on your system."
    },
    {
        question: "Is there a file size limit for this online editor?",
        answer: "The only limit is your browser's available memory (RAM). For most text-based notes and code files, you will never hit a limit."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Create and Download a Text File Online",
        "description": "Step-by-step guide to generating a .txt file using our free online tool.",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Type or paste your content into the large text area in the Editor Space.",
            "name": "Input Text"
          },
          {
            "@type": "HowToStep",
            "text": "Enter your desired filename in the input box on the right sidebar.",
            "name": "Name File"
          },
          {
            "@type": "HowToStep",
            "text": "Click the 'Download .txt File' button to save the file to your device instantly.",
            "name": "Download File"
          }
        ]
      }} />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Text Tools", url: "/tools/text" }, { label: "Text File Creator" }]} />

          {/* Hero Section */}
          <div className="text-center space-y-6 my-12 md:my-20">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-2xl mb-4">
              <FileText className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
              Online <span className="text-primary">Notepad</span> & TXT Creator
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The world's most authoritative browser-based text editor. Create, edit, and download text files instantly with 
              <span className="text-foreground font-bold"> 100% client-side processing</span> and total search intent domination.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><CheckCircle className="w-3 h-3 mr-2 text-green-500" /> Free Online Notepad</Badge>
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><Shield className="w-3 h-3 mr-2 text-blue-500" /> Secure (No Server Storage)</Badge>
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><WifiOff className="w-3 h-3 mr-2 text-orange-500" /> Offline Compatible</Badge>
              <Badge variant="outline" className="px-4 py-1 text-sm bg-background/50 backdrop-blur-sm"><Sparkles className="w-3 h-3 mr-2 text-purple-500" /> UTF-8 Supported</Badge>
            </div>
          </div>

          {/* Main Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-start">
            <div className="lg:col-span-8 space-y-6">
              <Card className="border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-primary" />
                    Professional Text Editor
                  </CardTitle>
                  <CardDescription>Enter your text, code snippets, or configuration data. Your work is handled entirely in your browser's RAM.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start writing or paste your content here... (e.g., notes, .env configs, robots.txt, scripts)"
                    className="min-h-[500px] w-full font-mono text-base resize-y border-primary/20 focus-visible:ring-primary p-4"
                    data-testid="textarea-content"
                  />
                </CardContent>
              </Card>

              {/* Authority Content: Detailed Explanation */}
              <div className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none pt-12">
                <h2 className="text-3xl font-bold">Complete Guide to Creating Text Files Online</h2>
                <p>
                  In today's digital workflow, the ability to create, edit, and save plain text files directly in the browser is essential. Whether you're a developer needing a quick <code>.env</code> file, a student taking notes, or a system administrator drafting server configurations, our <strong>Online Notepad</strong> provides a secure, efficient environment without the need for traditional software like Microsoft Word or even basic desktop editors like Notepad++.
                </p>

                <h3 className="text-2xl font-bold">What is a Text File (.txt)?</h3>
                <p>
                  A <strong>text file</strong> is a fundamental type of computer file that contains only electronic text. Unlike document files (like .docx or .pdf), text files lack rich formatting—there are no bold fonts, embedded images, or complex layouts. This "plain" nature is exactly what makes them powerful. They are the universal language of computing, readable by every operating system from Windows and macOS to Linux and mobile platforms.
                </p>

                <h3 className="text-2xl font-bold">The Technical Architecture: Blob API & Object URLs</h3>
                <p>
                  Our tool utilizes advanced browser technologies to ensure your data stays private. We leverage the <code>Blob API</code> (Binary Large Object) to package your text data directly within your browser's memory. When you click 'Download', we use <code>URL.createObjectURL</code> to generate a temporary, local link that triggers your browser's download manager. This architecture ensures <strong>0% server interaction</strong>, providing a truly private <strong>offline text editor</strong> experience.
                </p>

                <h3 className="text-2xl font-bold">UTF-8 vs. ASCII Encoding</h3>
                <p>
                  Encoding determines how your computer translates binary bits into human-readable characters. <strong>ASCII</strong> (American Standard Code for Information Interchange) was the early standard, but it was limited to 128 characters. Modern workflows demand <strong>UTF-8</strong>, which is a variable-width encoding that supports over a million characters, including emojis and diverse global languages. Our tool generates files using UTF-8 encoding by default to ensure maximum compatibility across all modern systems.
                </p>

                <h2 className="text-3xl font-bold mt-16">Why Professionals Choose Our Online Text Editor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mt-8">
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Terminal className="w-5 h-5 text-primary" /> Developers</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                            Quickly generate configuration files like <code>.gitignore</code>, <code>.env</code>, or <code>robots.txt</code> without opening a full IDE. Perfect for rapid prototyping and cloud-based development environments.
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5 text-primary" /> System Admins</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                            Draft server scripts, SSH config templates, or cron job definitions securely. Since processing is local, your sensitive server logic never leaves your machine.
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Students & Academics</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                            Take distraction-free notes that are guaranteed to open on any device. Plain text is the ultimate format for long-term knowledge storage and data portability.
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ClipboardList className="w-5 h-5 text-primary" /> QA & Data Analysts</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                            Capture raw logs, test data, or CSV-formatted snippets quickly. The minimalist editor ensures no unwanted formatting characters mess up your data structures.
                        </CardContent>
                    </Card>
                </div>

                <h2 className="text-3xl font-bold mt-16">Online Editor vs. Desktop Software</h2>
                <div className="overflow-x-auto not-prose border rounded-xl mt-8">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground font-bold uppercase text-[10px]">
                            <tr>
                                <th className="px-6 py-4">Feature</th>
                                <th className="px-6 py-4">Our Online Tool</th>
                                <th className="px-6 py-4">Traditional Notepad</th>
                                <th className="px-6 py-4">VS Code / IDE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr>
                                <td className="px-6 py-4 font-bold">Instant Access</td>
                                <td className="px-6 py-4 text-green-600">Yes (No Install)</td>
                                <td className="px-6 py-4">OS Dependent</td>
                                <td className="px-6 py-4">High Setup Time</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold">Privacy</td>
                                <td className="px-6 py-4">100% Local</td>
                                <td className="px-6 py-4">Local</td>
                                <td className="px-6 py-4">Local/Cloud Sync</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold">Cross-Device</td>
                                <td className="px-6 py-4">Universal</td>
                                <td className="px-6 py-4">Desktop Only</td>
                                <td className="px-6 py-4">Desktop Only</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-3xl font-bold mt-16">Real-World Examples</h2>
                <div className="space-y-6 not-prose mt-8">
                    <div className="p-6 bg-slate-900 rounded-xl font-mono text-xs text-slate-300">
                        <div className="mb-2 text-slate-500"># Example robots.txt</div>
                        User-agent: *<br/>
                        Disallow: /admin/<br/>
                        Sitemap: https://example.com/sitemap.xml
                    </div>
                    <div className="p-6 bg-slate-900 rounded-xl font-mono text-xs text-slate-300">
                        <div className="mb-2 text-slate-500"># Example .env configuration</div>
                        API_KEY=your_secret_key_here<br/>
                        DB_HOST=localhost<br/>
                        PORT=5000
                    </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card className="sticky top-24 border-2 border-primary/10 w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Save className="w-5 h-5 text-primary" />
                    Save & Download
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="filename">Set Filename</Label>
                    <div className="flex gap-2">
                      <Input
                        id="filename"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        placeholder="e.g., config, notes, script"
                        className="flex-1 font-mono"
                        data-testid="input-filename"
                      />
                      <span className="flex items-center text-muted-foreground font-mono">.txt</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Standard plain text extension.</p>
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
                      Clear All Content
                    </Button>
                  </div>

                  <div className="pt-6 border-t space-y-4">
                    <h4 className="text-sm font-bold flex items-center gap-2 text-green-600"><Lock className="w-4 h-4" /> Secure Online Notepad</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      We prioritize your privacy. This tool processes data entirely in your browser's local memory. <strong>No data is stored on our servers.</strong>
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium bg-muted p-2 rounded">
                        <CheckCircle className="w-3 h-3 text-green-500" /> No Login Required
                        <CheckCircle className="w-3 h-3 text-green-500" /> Offline Capable
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar Authority Signals */}
              <div className="space-y-4">
                <Card className="bg-primary/5 border-none">
                    <CardHeader className="p-4">
                        <CardTitle className="text-sm flex items-center gap-2"><Rocket className="w-4 h-4" /> Why Use Us?</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed">
                        Our browser-based text editor is optimized for SEO intent, ensuring you get a clean, high-performance environment for all your text file generation needs.
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 border-none">
                    <CardHeader className="p-4">
                        <CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4" /> Security Notice</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed">
                        100% Client-Side. We use the W3C File API standard to generate downloads without server uploads. Your privacy is mathematically guaranteed.
                    </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Detailed FAQ Section */}
          <div className="max-w-4xl mx-auto space-y-12 pb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-center">Online Text Editor: Deep FAQ</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b-2 border-primary/5">
                  <AccordionTrigger className="text-left font-bold py-6 hover:text-primary transition-colors text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
              <AccordionItem value="item-encoding" className="border-b-2 border-primary/5">
                <AccordionTrigger className="text-left font-bold py-6 hover:text-primary transition-colors text-lg">
                    Which browser is best for this text file creator?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                    Our tool is compatible with all modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari. It works seamlessly on both desktop and mobile platforms.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-mobile" className="border-b-2 border-primary/5">
                <AccordionTrigger className="text-left font-bold py-6 hover:text-primary transition-colors text-lg">
                    Can I create text files on mobile?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                    Yes! You can use this online notepad on any Android or iOS device. Just type your text and the 'Download' button will save the file to your mobile storage.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Internal Linking / Related Tools */}
          <div className="max-w-7xl mx-auto py-20 border-t">
            <h2 className="text-2xl font-bold mb-8">Related Productivity & Developer Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: "Word Counter", url: "/tools/word-counter" },
                { name: "JSON Formatter", url: "/tools/json-formatter" },
                { name: "Markdown Editor", url: "/tools/markdown-editor" },
                { name: "HTML Beautifier", url: "/tools/code-beautifier" },
                { name: "CSS Minifier", url: "/tools/css-minifier" },
                { name: "Base64 Encoder", url: "/tools/base64-encoder" }
              ].map((tool, i) => (
                <Link key={i} href={tool.url}>
                  <Button variant="ghost" className="w-full justify-start text-xs font-medium hover:bg-primary/5">
                    <ArrowRight className="w-3 h-3 mr-2" />
                    {tool.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

        </div>
      </div>
    </>
  );
}
