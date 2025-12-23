import { useState, useMemo } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { FileType } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function CharacterParagraphCounter() {
  const [text, setText] = useState("");

  useSEO({
    title: "Free Character & Paragraph Counter - Text Statistics",
    description: "Count characters, paragraphs, sentences, words & lines instantly. 100% free, offline, real-time analysis. Works in your browser.",
    keywords: "paragraph counter, character counter, text stats tool, sentence counter, word counter, text analysis",
    canonicalUrl: "https://tools.pixocraft.in/tools/character-paragraph-counter",
  });

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
    };
  }, [text]);

  const howItWorks = [
    { step: 1, title: "Paste Text", description: "Enter or paste any text content" },
    { step: 2, title: "Real-Time Count", description: "Stats update as you type" },
    { step: 3, title: "View Stats", description: "Get character, paragraph, line & sentence count" },
  ];

  const benefits = [
    { icon: <FileType className="h-5 w-5" />, title: "Real-Time", description: "Updates instantly as you type" },
    { icon: <FileType className="h-5 w-5" />, title: "Complete Stats", description: "Characters, words, sentences, paragraphs" },
    { icon: <FileType className="h-5 w-5" />, title: "No Limits", description: "Count unlimited text" },
    { icon: <FileType className="h-5 w-5" />, title: "100% Free", description: "Offline & unlimited use" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it update in real-time?",
      answer: "Yes — updates instantly as you type or paste text. All statistics refresh without any delay or button clicking. Perfect for instant feedback."
    },
    {
      question: "What statistics are provided?",
      answer: "We count: characters (with/without spaces), words, lines, sentences, and paragraphs. Perfect for writers, students, journalists, and content creators."
    },
    {
      question: "Is there a character limit?",
      answer: "No limits! Count characters and paragraphs in any size document—from short tweets to entire books. The tool processes everything instantly in your browser."
    },
    {
      question: "When do I need paragraph counts?",
      answer: "Useful for essays, dissertations, articles, and content formatting. Many publications require specific paragraph structures, and this tool helps you verify formatting."
    },
    {
      question: "How is a paragraph defined?",
      answer: "A paragraph is defined as text separated by blank lines. This matches standard document formatting used by Microsoft Word, Google Docs, and most publishing platforms."
    },
    {
      question: "Is my text private?",
      answer: "Yes, 100% private. All analysis happens in your browser. Your text is never uploaded to any server, stored, or shared. Complete privacy guaranteed."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Character & Paragraph Counter"
        description="Paste text → get character, paragraph, line & sentence count instantly."
        icon={<FileType className="h-8 w-8" />}
        toolId="character-paragraph-counter"
        category="text"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >

        <div className="space-y-6 max-w-4xl mx-auto">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            rows={15}
            data-testid="input-text"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold" data-testid="text-characters">{stats.characters}</p>
                <p className="text-sm text-muted-foreground">Characters</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold" data-testid="text-characters-no-spaces">{stats.charactersNoSpaces}</p>
                <p className="text-sm text-muted-foreground">Characters (no spaces)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold" data-testid="text-words">{stats.words}</p>
                <p className="text-sm text-muted-foreground">Words</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold" data-testid="text-paragraphs">{stats.paragraphs}</p>
                <p className="text-sm text-muted-foreground">Paragraphs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold" data-testid="text-sentences">{stats.sentences}</p>
                <p className="text-sm text-muted-foreground">Sentences</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold" data-testid="text-lines">{stats.lines}</p>
                <p className="text-sm text-muted-foreground">Lines</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
