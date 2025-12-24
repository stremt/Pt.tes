import { useSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function AICategory() {
  useSEO({
    title: "AI Tools - Free Online AI-Powered Features | Pixocraft",
    description: "Enhance your content and images with AI-powered tools for summarization, speech-to-text, background removal, and more. Offline-capable, private, and no signup needed.",
    keywords: "AI tools, text summarizer, speech to text, background remover, image upscaler, audio noise removal, AI features, free AI tools, online AI, speech recognition",
    canonicalUrl: "https://tools.pixocraft.in/tools/ai",
  });

  const aiTools = [
    {
      id: "text-summarizer",
      name: "AI Text Summarizer",
      description: "Generate concise summaries from long articles, documents, and content instantly.",
      path: "/tools/text-summarizer",
    },
    {
      id: "speech-to-text",
      name: "Speech to Text",
      description: "Transcribe spoken words to text using voice recognition technology.",
      path: "/tools/speech-to-text",
    },
    {
      id: "text-to-speech",
      name: "Text to Speech",
      description: "Convert text to natural-sounding audio using browser voice synthesis.",
      path: "/tools/text-to-speech",
    },
    {
      id: "background-remover",
      name: "Background Remover",
      description: "Remove backgrounds from images automatically with AI-powered detection.",
      path: "/tools/background-remover",
    },
    {
      id: "image-upscaler",
      name: "Image Upscaler",
      description: "Enhance and enlarge images while maintaining quality with AI upscaling.",
      path: "/tools/image-upscaler",
    },
    {
      id: "audio-noise-remover",
      name: "Audio Noise Remover",
      description: "Remove background noise from audio files for cleaner, clearer sound.",
      path: "/tools/audio-noise-remover",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "AI Tools" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <Zap className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-ai-category">
              AI Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            AI Tools – <span className="text-primary">Free, Private & Offline</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Harness AI-powered capabilities for content enhancement, image improvement, and media processing—completely private, offline-ready, and no signup needed.
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Enhance Your Content with AI</h2>
            <p className="text-muted-foreground leading-relaxed">
              AI tools amplify your productivity by automating complex tasks—summarizing lengthy documents in seconds, converting speech to text for transcription, removing image backgrounds instantly, and enhancing audio quality. These capabilities, once requiring specialized software and expertise, are now accessible as simple online tools. AI processing reduces manual effort, improves accuracy, and enables new creative possibilities across content, images, and audio.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Modern AI tools bring professional-grade results to everyone, democratizing capabilities previously available only to specialists and large organizations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Uses AI Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Content creators and writers use summarizers to condense research and generate highlights. Journalists and researchers transcribe interviews and lectures with speech-to-text. Podcasters, video creators, and audio professionals remove background noise for cleaner content. Designers and photographers remove backgrounds and upscale images for polished results.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Students use summarizers to understand complex materials quickly. Business professionals convert meetings and calls to transcripts. Accessibility seekers benefit from text-to-speech and speech-to-text features. Marketers enhance product images and optimize visual content. Whether professional or personal, AI tools serve anyone working with text, images, or audio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Common AI-Powered Tasks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Content summarization extracts key information from large documents, saving reading time and improving comprehension. Speech-to-text transcription creates searchable text records from audio. Text-to-speech narration makes content accessible and enables multitasking. Background removal automates image editing for product photography and creative work. Image upscaling enlarges images while maintaining detail and quality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Audio noise removal cleans recordings for podcasts, calls, and professional use. Together, these AI capabilities form a complete toolkit for enhancing content across all media types.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Private & Offline AI Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              All AI tools run entirely in your browser or with local processing, ensuring complete privacy—your content, images, audio, and summaries stay on your device. No data uploads to external servers, no tracking, no logging of your AI processing activities. Some tools may use browser-native AI APIs that process entirely client-side.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Browser-based processing means instant results without network delays, offline functionality after initial load, and zero security risks. Your sensitive documents, proprietary images, and private audio remain completely confidential. Whether processing confidential business content, personal media, or creative projects, local processing guarantees genuine privacy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Using AI Tools Effectively</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with content summarization—paste long articles or documents to quickly extract key points. For audio work, transcribe interviews, meetings, or lectures with speech-to-text, then edit the text. Remove backgrounds from product images for e-commerce or creative projects. Upscale small images when you need higher resolution.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For accessibility, convert important documents to audio using text-to-speech. Clean up podcast recordings or meeting transcripts with audio noise removal. Use summarization to generate social media captions from long articles. Combine AI tools strategically: transcribe audio, summarize the transcript, upscale accompanying images.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              AI tools work best as integrated parts of your content creation workflow, supporting everything from professional production to personal projects. Use them consistently to streamline processes and improve output quality.
            </p>
          </section>
        </article>

        {/* All AI Tools Section */}
        <section className="space-y-6 border-t pt-12">
          <h2 className="text-2xl font-bold">All AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool) => (
              <Card key={tool.id} className="hover-elevate flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="mb-4 flex-1">{tool.description}</CardDescription>
                  <a href={tool.path}>
                    <Button variant="outline" className="w-full" data-testid={`button-ai-tool-${tool.id}`}>
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
