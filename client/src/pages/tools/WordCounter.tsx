import { useState, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
  countWords,
  countCharacters,
  countSentences,
  countParagraphs,
  estimateReadingTime,
} from "@/lib/text-utils";
import { extractTextFromFile, getSupportedTextFileTypes, getSupportedTextFileMimeTypes } from "@/lib/file-parsing-utils";
import { TEXTAREA_HEIGHTS, SCROLLABLE_OUTPUT, formatFileSize } from "@/lib/ui-constants";
import { FileText, Clock, Type, FileType, Hash, Sparkles, Zap, Lock, Globe, Upload, X, GraduationCap, PenTool, Search, Share2, Shield, WifiOff, CheckCircle, Building2, CalendarDays, Loader2 } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Online Word Counter - Instant Characters, Sentences & Reading Time | Pixocraft",
    description: "Count words, characters, sentences, and paragraphs instantly with our free online word counter. Get accurate reading time estimates in real-time. 100% private—all analysis happens in your browser. No signup required.",
    keywords: "word counter, character counter, online word counter, free word counter, reading time calculator, essay word count, sentence counter, paragraph counter, text analyzer, word count tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/word-counter",
  });

  const stats = useMemo(() => ({
    words: countWords(text),
    charactersWithSpaces: countCharacters(text, true),
    charactersWithoutSpaces: countCharacters(text, false),
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    readingTime: estimateReadingTime(text),
  }), [text]);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    try {
      const result = await extractTextFromFile(file);
      setText(result.text);

      toast({
        title: "File Uploaded",
        description: `Extracted ${result.wordCount} words from ${file.name}`,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      const errorMessage = error instanceof Error ? error.message : "Could not extract text from file";
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setFileName("");
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

  const handleClear = () => {
    setText("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const statCards = [
    { icon: <FileText className="h-6 w-6" />, label: "Words", value: stats.words, color: "text-blue-600" },
    { icon: <Type className="h-6 w-6" />, label: "Characters (with spaces)", value: stats.charactersWithSpaces, color: "text-purple-600" },
    { icon: <Hash className="h-6 w-6" />, label: "Characters (no spaces)", value: stats.charactersWithoutSpaces, color: "text-green-600" },
    { icon: <FileType className="h-6 w-6" />, label: "Sentences", value: stats.sentences, color: "text-orange-600" },
    { icon: <FileText className="h-6 w-6" />, label: "Paragraphs", value: stats.paragraphs, color: "text-pink-600" },
    { icon: <Clock className="h-6 w-6" />, label: "Reading Time", value: `${stats.readingTime} min`, color: "text-cyan-600" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "How accurate is this word counter?",
      answer: "Our word counter is highly accurate. Words are counted by splitting text on whitespace (spaces, tabs, newlines), treating multiple separators as single breaks. The algorithm handles punctuation correctly and provides reliable counts that match what you'd see in professional word processors like Microsoft Word or Google Docs."
    },
    {
      question: "Does this word counter work offline?",
      answer: "Yes! Once the page loads, all word counting happens entirely in your browser. You can disconnect from the internet and continue using the tool. This makes it perfect for working in areas with limited connectivity or when you need reliable counting without an internet connection."
    },
    {
      question: "Are uploaded files stored or saved anywhere?",
      answer: "No, absolutely not. All file processing happens locally in your browser. Your uploaded documents (TXT, PDF, DOCX, MD) are never sent to any server—they're processed entirely on your device. Once you close the page, all data is gone. This ensures complete privacy for sensitive documents."
    },
    {
      question: "How is reading time calculated?",
      answer: "Reading time is estimated based on an average reading speed of 200 words per minute, which is the typical pace for adults reading English text. For example, a 1,000-word article would show an estimated reading time of 5 minutes. This helps content creators optimize article length for their audience."
    },
    {
      question: "What counts as a character?",
      answer: "Characters include all letters, numbers, punctuation marks, and symbols. We provide two counts: characters with spaces (total length including all whitespace) and characters without spaces (only counting actual content). This is especially useful for platforms with strict character limits like Twitter or SMS."
    },
    {
      question: "Can I use this for essays and academic assignments?",
      answer: "Absolutely! This tool is perfect for students checking word count requirements for essays, research papers, dissertations, and academic assignments. The accurate counting ensures you meet minimum or maximum word limits set by your institution or professor."
    },
    {
      question: "Is there a limit on how much text I can analyze?",
      answer: "There's no enforced limit. You can analyze text of any length—from a single sentence to entire books. However, extremely large texts (100,000+ words) may take a moment to process depending on your device's capabilities."
    },
    {
      question: "What file formats are supported?",
      answer: "We support .txt (plain text), .pdf (PDF documents), .docx (Microsoft Word), and .md (Markdown) files. Simply drag and drop or click to upload, and text will be extracted automatically for analysis."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Free Online Word Counter"
        description="Count words, characters, sentences, and paragraphs instantly. Get accurate reading time estimates in real-time—all statistics update as you type."
        icon={<FileText className="h-10 w-10 text-primary" />}
        toolId="word-counter"
        category="text"
        howItWorks={[
          { step: 1, title: "Enter or Upload Text", description: "Type, paste your text, or upload a document (TXT, PDF, DOCX, MD)." },
          { step: 2, title: "Get Live Statistics", description: "Word count, characters, sentences, and reading time update instantly as you type." },
          { step: 3, title: "Use Your Results", description: "Copy your optimized text or use the statistics for essays, articles, or content planning." },
        ]}
        benefits={[
          { icon: <Zap className="h-6 w-6 text-primary" />, title: "Real-Time Counting", description: "Statistics update instantly as you type—no delays, no waiting." },
          { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Private", description: "All counting happens in your browser. No data is stored or uploaded." },
          { icon: <Clock className="h-6 w-6 text-primary" />, title: "Reading Time", description: "Accurate estimates of how long it takes to read your content." },
          { icon: <Globe className="h-6 w-6 text-primary" />, title: "Always Free", description: "Unlimited usage with no signup, no limits, and no watermarks." },
        ]}
        faqs={faqItems}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statCards.map((stat) => (
              <Card key={stat.label} className="hover-elevate transition-all" data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold" data-testid={`text-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>{stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                <span className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload File
                </span>
                {fileName && (
                  <Badge variant="secondary" className="text-xs">
                    {fileName}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  uploading
                    ? "border-primary/50 bg-primary/5 cursor-wait"
                    : isDragging
                    ? "border-primary bg-primary/5 cursor-pointer"
                    : "border-muted-foreground/25 hover:border-primary/50 cursor-pointer"
                }`}
                onClick={() => !uploading && fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (!uploading && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => !uploading && handleDrop(e)}
                tabIndex={uploading ? -1 : 0}
                role="button"
                aria-disabled={uploading}
                data-testid="dropzone-word-counter"
              >
                {uploading ? (
                  <Loader2 className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
                ) : (
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                )}
                <p className="font-medium mb-2">
                  {uploading ? "Extracting text from your file..." : "Click to upload or drag & drop"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {uploading ? "Please wait, this may take a moment for large files" : "Supports .txt, .pdf, .docx, and .md files"}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={getSupportedTextFileMimeTypes()}
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={uploading}
                  data-testid="input-file-word-counter"
                />
              </div>
            </CardContent>
          </Card>

          {/* Text Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Your Text
                </span>
                {text && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    data-testid="button-clear-text"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start typing or paste your text here to see word count and statistics..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`${TEXTAREA_HEIGHTS.LARGE} ${SCROLLABLE_OUTPUT} text-base leading-relaxed`}
                data-testid="input-text-counter"
                disabled={uploading}
              />
            </CardContent>
          </Card>

          {/* Privacy & Offline Usage Section */}
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy & Offline Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Local Processing</h4>
                    <p className="text-sm text-muted-foreground">All text analysis happens entirely in your browser—nothing is sent to any server.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">No Data Storage</h4>
                    <p className="text-sm text-muted-foreground">Your text and uploaded files are never stored, tracked, or accessed by anyone.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <WifiOff className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Works Offline</h4>
                    <p className="text-sm text-muted-foreground">Once loaded, the tool works without internet—perfect for travel or secure environments.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Use Cases */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">Popular Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Students & Academics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Perfect for checking essay word counts, meeting assignment requirements, and ensuring research papers fall within specified limits. Track your progress as you write dissertations, theses, or term papers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <PenTool className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Writers & Bloggers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ideal for crafting articles, blog posts, and stories. Monitor word count for optimal content length, estimate reading time for your audience, and ensure your writing meets publication guidelines.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">SEO Professionals & Marketers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Optimize content length for search engines. Check meta descriptions, headlines, and article word counts to meet SEO best practices. Perfect for ensuring content hits the ideal length for rankings. Pair with our <Link href="/tools/password-generator" className="text-primary hover:underline" data-testid="link-password-generator">Password Generator</Link> for secure account management.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Share2 className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Social Media & Content Creators</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Stay within character limits for Twitter, LinkedIn, and Instagram captions. Track character counts (with and without spaces) for platform-specific requirements. Craft engaging posts that fit perfectly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Brand Authority Section */}
          <Card className="bg-muted/30">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-6 flex-wrap justify-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Trusted by writers, students, and professionals worldwide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span>India's largest offline-first tool hub with 200+ browser-based tools</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Last updated: December 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Footer */}
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/text" className="text-primary hover:text-primary/80 transition-colors">Text Tools</Link>
          </p>
        </div>
      </ToolLayout>
    </>
  );
}
