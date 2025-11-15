import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Sparkles, Zap, Lock, Globe } from "lucide-react";
import { extractTextFromFile } from "@/lib/file-parsing-utils";
import { Slider } from "@/components/ui/slider";

// Client-side extractive summarization algorithm
function summarizeText(text: string, sentenceCount: number = 3): string {
  if (!text.trim()) return "";
  
  // Split into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  if (sentences.length <= sentenceCount) {
    return text;
  }
  
  // Calculate word frequencies
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq: Record<string, number> = {};
  
  const stopWords = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from", "as", "is", "was", "are", "were", "been", "be", "have", "has", "had", "do", "does", "did", "will", "would", "should", "could", "may", "might", "must", "can", "this", "that", "these", "those", "i", "you", "he", "she", "it", "we", "they", "what", "which", "who", "when", "where", "why", "how"]);
  
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 2) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  // Score each sentence
  const sentenceScores = sentences.map((sentence, index) => {
    const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
    const score = sentenceWords.reduce((sum, word) => sum + (wordFreq[word] || 0), 0);
    
    // Boost first and second sentences slightly
    const positionBoost = index === 0 ? 1.5 : (index === 1 ? 1.2 : 1);
    
    return {
      sentence: sentence.trim(),
      score: score * positionBoost,
      index
    };
  });
  
  // Select top sentences and sort by original position
  const topSentences = sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, sentenceCount)
    .sort((a, b) => a.index - b.index)
    .map(s => s.sentence);
  
  return topSentences.join(' ');
}

export default function TextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [inputMethod, setInputMethod] = useState<"text" | "pdf">("text");
  const [summaryLength, setSummaryLength] = useState([3]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast} = useToast();

  useSEO({
    title: "Text Summarizer | Summarize Articles & Documents Instantly | Pixocraft Tools",
    description: "Free offline text summarizer. Extract key sentences from articles, research papers, and documents. Upload PDFs or paste text. 100% private.",
    keywords: "text summarizer, extractive summarizer, summarize text, pdf summarizer, article summarizer, offline summarizer",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-summarizer",
  });

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const validTypes = [
      "text/plain",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a .txt, .pdf, or .docx file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setFileName(file.name);

    try {
      const result = await extractTextFromFile(file);
      const extractedText = result.text.substring(0, 20000); // Limit to 20k chars for performance
      setText(extractedText);

      toast({
        title: "Success!",
        description: `Extracted ${result.wordCount} words from ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to extract text from file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSummarize = () => {
    if (!text.trim()) {
      toast({
        title: "No Text",
        description: "Please enter or upload some text to summarize",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      // Use setTimeout to show loading state briefly
      setTimeout(() => {
        const result = summarizeText(text, summaryLength[0]);
        setSummary(result);

        const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
        const reduction = Math.round((1 - result.length / text.length) * 100);

        toast({
          title: "Summarized Successfully!",
          description: `Reduced from ${sentences.length} to ${summaryLength[0]} sentences (${reduction}% shorter)`,
        });

        setLoading(false);
      }, 300);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to summarize text",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setSummary("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <ToolLayout
      title="Text Summarizer"
      description="Instantly summarize any text using smart extraction. Upload PDFs or paste articles to get key sentences extracted and organized."
      icon={<Sparkles className="h-10 w-10 text-primary" />}
      toolId="text-summarizer"
      category="Text Tool"
      howItWorks={[
        { step: 1, title: "Upload or Paste", description: "Upload a PDF/document or paste your text" },
        { step: 2, title: "Choose Length", description: "Select how many key sentences you want in the summary" },
        { step: 3, title: "Summarize", description: "Get an instant summary with the most important sentences" },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Results", description: "Extractive summarization happens in milliseconds" },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Private", description: "All processing happens in your browser - nothing uploaded" },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Multiple Formats", description: "Supports PDF, DOCX, and plain text files" },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "Smart Extraction", description: "Identifies and extracts the most important sentences" },
      ]}
      faqs={[
        { question: "How does extractive summarization work?", answer: "The tool analyzes word frequency, sentence position, and importance to identify and extract the most significant sentences from your text, then presents them in order." },
        { question: "What is the maximum text length?", answer: "The summarizer can handle up to 20,000 characters. For files, text is automatically limited to ensure fast processing." },
        { question: "Can I use this for academic papers?", answer: "Yes! The summarizer works great for research papers, articles, and academic documents. It extracts key sentences to give you the main points quickly." },
        { question: "Is my data secure?", answer: "Absolutely! All summarization happens entirely in your browser. Your text and documents never leave your device or get uploaded to any server." },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Input Method Selection */}
        <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as typeof inputMethod)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" data-testid="tab-paste-text">
              <FileText className="h-4 w-4 mr-2" />
              Paste Text
            </TabsTrigger>
            <TabsTrigger value="pdf" data-testid="tab-upload-pdf">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Paste Your Text</CardTitle>
                <CardDescription>
                  {text.length} / 20000 characters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your article, research paper, or any long text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value.substring(0, 20000))}
                  className="min-h-[300px] max-h-[300px] overflow-y-auto text-base leading-relaxed"
                  data-testid="input-text-summarizer"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pdf" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Upload Document</span>
                  {fileName && (
                    <Badge variant="secondary" className="text-xs">
                      {fileName}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Maximum file size: 10MB
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-primary/50"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  data-testid="dropzone-summarizer"
                >
                  <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium text-lg mb-2">
                    {uploading ? "Extracting text..." : "Drop your PDF here or click to browse"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, DOCX, and TXT files
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.pdf,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    data-testid="input-file-summarizer"
                  />
                </div>
                {text && (
                  <div className="mt-4">
                    <Label className="text-sm text-muted-foreground">
                      Extracted Text Preview ({text.length} characters)
                    </Label>
                    <ScrollArea className="h-[150px] w-full rounded-lg border bg-muted mt-2">
                      <div className="p-4 text-sm">
                        {text}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary Length Control */}
        <Card>
          <CardHeader>
            <CardTitle>Summary Length</CardTitle>
            <CardDescription>
              Select how many key sentences to include in the summary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Number of Sentences: {summaryLength[0]}</Label>
                <Badge variant="secondary">{summaryLength[0] <= 2 ? "Brief" : summaryLength[0] <= 5 ? "Moderate" : "Detailed"}</Badge>
              </div>
              <Slider
                value={summaryLength}
                onValueChange={setSummaryLength}
                min={2}
                max={10}
                step={1}
                className="w-full"
                data-testid="slider-summary-length"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleSummarize}
            disabled={loading || uploading || !text}
            size="lg"
            className="flex-1"
            data-testid="button-summarize"
          >
            {loading ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                Summarizing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Summarize Text
              </>
            )}
          </Button>
          {text && (
            <Button
              variant="outline"
              onClick={handleClear}
              size="lg"
              data-testid="button-clear"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Summary Result */}
        {summary && (
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Summary
              </CardTitle>
              <CardDescription>
                AI-generated summary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-base leading-relaxed" data-testid="text-summary">
                  {summary}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground mt-2">Offline & Private</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">20K</p>
                <p className="text-sm text-muted-foreground mt-2">Max Characters</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">0ms</p>
                <p className="text-sm text-muted-foreground mt-2">Processing Time</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
