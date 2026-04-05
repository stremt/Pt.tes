import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  useSEO, 
  StructuredData, 
  generateFAQSchema, 
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  type FAQItem
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Download, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

export default function CreateTextFileOnline() {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("document");
  const { toast } = useToast();

  const toolName = "Create Text File Online — Generate & Download TXT Files";
  const toolDescription = "Fastest way to create text files online. Generate and download .txt files instantly without software. Perfect for quick file generation, config files, and scripting.";
  const canonicalUrl = "https://tools.pixocraft.in/create-text-file-online";

  useSEO({
    title: "Create Text File Online — Generate & Download TXT Files",
    description: toolDescription,
    keywords: "create text file online, create txt file, text file generator, download text file, write text and download, browser file generation",
    canonicalUrl,
  });

  const appSchema = useMemo(() => generateSoftwareApplicationSchema({
    name: "Text File Generator Online",
    description: toolDescription,
    url: canonicalUrl,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { price: "0", priceCurrency: "USD" }
  }), []);

  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Create Text File", url: "/create-text-file-online" }
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
    element.download = `${filename || "file"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    toast({ title: "File Ready", description: "Your .txt file has been generated and downloaded." });
    playCompletionSound();
  };

  const faqItems: FAQItem[] = [
    { question: "How does online file generation work?", answer: "We use the browser's Blob API to create a file directly in your system's memory. This allows you to download text as a file without any data ever being sent to a server." },
    { question: "Can I create files without installing software?", answer: "Yes, this tool allows you to write and save text as a .txt file entirely within your web browser, making it ideal for systems where you cannot install software." }
  ];

  return (
    <>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Create Text File" }]} />
          <div className="text-center space-y-6 my-12">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Create Text <span className="text-primary">File Online</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">Generate and download .txt files instantly. Quick file creation without any external software.</p>
          </div>
          <div className="space-y-6 mb-24">
            <Card className="border-2 border-primary/10">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2 shrink-0">
                    <Edit3 className="w-5 h-5 text-primary" /> Notepad
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:ml-auto w-full sm:w-auto">
                    <div className="flex gap-2 items-center flex-1">
                      <Input
                        id="filename"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        className="font-mono"
                        placeholder="filename"
                        data-testid="input-filename"
                      />
                      <span className="text-muted-foreground text-sm shrink-0">.txt</span>
                    </div>
                    <Button onClick={handleDownload} size="default" data-testid="button-download" className="shrink-0">
                      <Download className="mr-2 h-4 w-4" /> Download TXT
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste your content here — then click Download TXT above to save it as a file..."
                  className="min-h-[500px] w-full text-base p-4 resize-y"
                  data-testid="textarea-content"
                />
              </CardContent>
            </Card>
            <article className="prose prose-slate lg:prose-xl dark:prose-invert max-w-none">
              <h2>How to Create a Text File Online</h2>
              <ol>
                <li>Type or paste your desired content into the editor above.</li>
                <li>Enter a filename for your new document.</li>
                <li>Click 'Download TXT' to save it to your local storage.</li>
              </ol>
              <h3>Local Processing Architecture</h3>
              <p>Our tool uses the latest Web APIs to ensure that file creation happens locally on your device. This means zero latency and maximum security for your data.</p>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
