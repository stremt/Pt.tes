import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import {
  countWords,
  countCharacters,
  countSentences,
  countParagraphs,
  estimateReadingTime,
} from "@/lib/text-utils";
import { FileText, Clock, Type, FileType, Hash, Sparkles, Zap, Lock, Globe } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");

  useSEO({
    title: "Word Counter | Count Words, Characters & Sentences | Pixocraft Tools",
    description: "Free online word counter tool. Count words, characters, sentences, paragraphs, and estimate reading time. Perfect for writers, students, and content creators.",
    keywords: "word counter, character counter, word count, text analyzer, writing tool, sentence counter, reading time",
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

  const statCards = [
    { icon: <FileText className="h-6 w-6" />, label: "Words", value: stats.words, color: "text-blue-600" },
    { icon: <Type className="h-6 w-6" />, label: "Characters (with spaces)", value: stats.charactersWithSpaces, color: "text-purple-600" },
    { icon: <Hash className="h-6 w-6" />, label: "Characters (no spaces)", value: stats.charactersWithoutSpaces, color: "text-green-600" },
    { icon: <FileType className="h-6 w-6" />, label: "Sentences", value: stats.sentences, color: "text-orange-600" },
    { icon: <FileText className="h-6 w-6" />, label: "Paragraphs", value: stats.paragraphs, color: "text-pink-600" },
    { icon: <Clock className="h-6 w-6" />, label: "Reading Time", value: `${stats.readingTime} min`, color: "text-cyan-600" },
  ];

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs instantly. Get reading time estimates and detailed text analysis in real-time."
      icon={<FileText className="h-10 w-10 text-primary" />}
      toolId="word-counter"
      category="Writing Tool"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type or paste your text into the editor." },
        { step: 2, title: "Get Live Stats", description: "Word count and statistics update as you type." },
        { step: 3, title: "Analyze Results", description: "Review words, characters, sentences, and reading time." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Real-Time Counting", description: "Statistics update instantly as you type with no delays." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Completely Private", description: "All counting happens in your browser. No data is stored." },
        { icon: <Clock className="h-6 w-6 text-primary" />, title: "Reading Time", description: "Estimates how long it takes to read your content." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Always Free", description: "No limits on text length. Use as much as you need." },
      ]}
      faqs={[
        { question: "How is word count calculated?", answer: "Words are counted by splitting text on whitespace. Multiple spaces, tabs, and newlines are treated as single separators." },
        { question: "What counts as a character?", answer: "Characters include all letters, numbers, punctuation, and symbols. You can see counts both with and without spaces." },
        { question: "How is reading time estimated?", answer: "Reading time is based on an average reading speed of 200 words per minute, which is typical for adults reading English text." },
        { question: "Can I use this for essays and assignments?", answer: "Yes! This tool is perfect for checking word count requirements for essays, articles, blog posts, and academic assignments." },
        { question: "Is there a limit on how much text I can analyze?", answer: "No, there's no limit. However, extremely large texts (100,000+ words) may slow down your browser." },
      ]}
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

        {/* Text Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Your Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Start typing or paste your text here to see word count and statistics..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[300px] text-base leading-relaxed"
              data-testid="input-text-counter"
            />
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Perfect For</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Writers checking article length, students meeting essay requirements, content creators optimizing for SEO, and anyone who needs quick text analysis. All statistics update in real-time as you type.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
