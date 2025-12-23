import { useSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Type, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function TextCategory() {
  useSEO({
    title: "Text Tools - Free Online Text Processing & Conversion | Pixocraft",
    description: "Transform, analyze, and process text instantly with Pixocraft's free online text tools. Convert cases, encrypt text, compare differences, and more—all offline and private.",
    keywords: "text tools, text converter, text processor, case converter, text summarizer, text encryption, free text tools, online text tools, text analysis",
    canonicalUrl: "https://tools.pixocraft.in/tools/text",
  });

  const textTools = [
    {
      id: "text-case-converter",
      name: "Text Case Converter",
      description: "Convert text between uppercase, lowercase, title case, and more formats instantly.",
      path: "/tools/text-case-converter",
    },
    {
      id: "text-summarizer",
      name: "AI Text Summarizer",
      description: "Generate concise summaries from long articles, documents, and content.",
      path: "/tools/text-summarizer",
    },
    {
      id: "text-differ",
      name: "Text Differ",
      description: "Compare two texts and highlight the differences side-by-side.",
      path: "/tools/text-differ",
    },
    {
      id: "text-repeater",
      name: "Text Repeater",
      description: "Repeat any text multiple times with custom formatting options.",
      path: "/tools/text-repeater",
    },
    {
      id: "text-to-speech",
      name: "Text to Speech",
      description: "Convert text to natural-sounding audio using browser voice synthesis.",
      path: "/tools/text-to-speech",
    },
    {
      id: "speech-to-text",
      name: "Speech to Text",
      description: "Transcribe spoken words to text using voice recognition technology.",
      path: "/tools/speech-to-text",
    },
    {
      id: "text-diff",
      name: "Text Difference Highlighter",
      description: "Highlight the differences between two text blocks with visual markers.",
      path: "/tools/text-diff",
    },
    {
      id: "text-cleaner",
      name: "Text Cleaner",
      description: "Remove extra spaces, line breaks, and clean up messy text instantly.",
      path: "/tools/text-cleaner",
    },
    {
      id: "text-encrypt-decrypt",
      name: "Text Encrypt & Decrypt",
      description: "Encrypt and decrypt text securely using AES-256 encryption.",
      path: "/tools/text-encrypt-decrypt",
    },
    {
      id: "glitch-text-generator",
      name: "Glitch Text Generator",
      description: "Create eye-catching glitch text effects for social media and designs.",
      path: "/tools/glitch-text-generator",
    },
    {
      id: "text-spacer",
      name: "Text Spacer",
      description: "Add spacing between characters and letters for creative text effects.",
      path: "/tools/text-spacer",
    },
    {
      id: "gradient-text-generator",
      name: "Gradient Text Generator",
      description: "Generate beautiful gradient text effects with customizable colors.",
      path: "/tools/gradient-text-generator",
    },
    {
      id: "text-highlight-marker",
      name: "Text Highlight Generator",
      description: "Highlight specific words and phrases in text with visual markers.",
      path: "/tools/text-highlight-marker",
    },
    {
      id: "fancy-text-generator",
      name: "Fancy Text Generator",
      description: "Transform text into fancy Unicode characters and decorative styles.",
      path: "/tools/fancy-text-generator",
    },
    {
      id: "text-rotator",
      name: "Text Rotator",
      description: "Rotate and reverse text for creative effects and display.",
      path: "/tools/text-rotator",
    },
    {
      id: "text-reverser",
      name: "Text Reverser",
      description: "Reverse text backwards instantly—useful for palindromes and effects.",
      path: "/tools/text-reverser",
    },
    {
      id: "advanced-text-shadow",
      name: "Advanced Text Shadow",
      description: "Create stunning text shadow effects with multiple customization options.",
      path: "/tools/advanced-text-shadow",
    },
    {
      id: "silent-text",
      name: "Silent Text",
      description: "Hide messages in plain text using invisible Unicode characters.",
      path: "/tools/silent-text",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Text Tools" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <Type className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-text-category">
              Text Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Transform & Process <span className="text-primary">Text Instantly</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Free, offline text processing tools for conversion, transformation, and analysis
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Working With Text Made Simple</h2>
            <p className="text-muted-foreground leading-relaxed">
              Text manipulation is a fundamental task in writing, coding, content creation, and data processing. Text tools help you convert formats, compare versions, transform styles, and process content efficiently. Whether you need to change letter cases, highlight differences, encrypt messages, or create visual effects, text tools streamline these operations from seconds to instant.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Modern text tools save time and eliminate errors in repetitive formatting tasks, while advanced features like encryption and speech-to-text unlock new possibilities for communication and accessibility.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Uses Text Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Writers and content creators use text tools to format documents, convert between styles, and compare drafts. Developers rely on text comparison tools to review code changes and identify differences in configurations. Students use text summarizers to quickly grasp key points from lengthy articles and research papers. Business professionals process text data, clean datasets, and standardize formatting for reports and communications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Social media creators leverage decorative text generators for eye-catching posts. Accessibility seekers benefit from text-to-speech and speech-to-text tools. Security-conscious users encrypt sensitive text messages. Whether casual or professional, text tools serve anyone working with written content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Common Text Processing Tasks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Case conversion is one of the most frequent text tasks—converting all caps to lowercase, title case to sentence case, or mixing cases for readability and style. Text comparison helps identify changes between versions, track edits, and spot differences in configurations. Text cleaning removes extra spaces, unwanted line breaks, and formatting artifacts from copied or imported content.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Text reversal and rotation create fun effects for creative projects and decode certain encoding schemes. Text encryption protects sensitive messages using strong cryptography. Text summarization extracts key information from large documents. Speech-to-text and text-to-speech bridge written and spoken communication, enabling accessibility and voice-based workflows.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Offline & Private Text Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              All text tools run entirely in your browser without uploading data to external servers. This offline-first approach ensures complete privacy—your text, transformations, and encrypted messages stay on your device. No tracking, no logging, no third-party analysis. Your sensitive content, personal notes, and protected messages remain under your complete control.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Browser-based text processing means instant results without network delays, offline functionality after initial load, and zero security risks of data transmission. Whether processing confidential business text, personal notes, or secure messages, local processing guarantees genuine privacy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Using Text Tools Effectively</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with basic operations: convert text cases for different contexts, clean imported content to remove formatting artifacts, and compare document versions to track changes. For creativity, experiment with fancy text generators, shadow effects, and glitch transformations to make content visually striking.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For accessibility and engagement, convert text to speech for audio content or use speech-to-text for voice input. Encrypt sensitive messages using text encryption tools. Summarize long articles to grasp key points quickly. Reverse text for creative purposes or decode certain patterns.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Most importantly, combine text tools logically: summarize long content, compare versions for differences, convert to appropriate cases, clean formatting, and encrypt sensitive results. Text tools work best as part of your regular workflow, supporting everything from professional writing to creative expression.
            </p>
          </section>
        </article>

        {/* All Text Tools Section */}
        <section className="space-y-6 border-t pt-12">
          <h2 className="text-2xl font-bold">All Text Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textTools.map((tool) => (
              <Card key={tool.id} className="hover-elevate flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Type className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="mb-4 flex-1">{tool.description}</CardDescription>
                  <a href={tool.path}>
                    <Button variant="outline" className="w-full" data-testid={`button-text-tool-${tool.id}`}>
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
