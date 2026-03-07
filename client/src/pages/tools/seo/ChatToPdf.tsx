import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# Chat Conversation Transcript

## Date: March 7, 2026

### Project Update Discussion

**John**: Hey Sarah, did you finish the project review?

**Sarah**: Yes! I completed it yesterday. The design looks great and all the features are working as expected.

**John**: Perfect! What about the testing phase?

**Sarah**: Testing is almost complete. We found a few minor bugs that I've documented in the ticket system. Nothing critical, just edge cases.

**John**: Excellent! When can we deploy to production?

**Sarah**: I'd say we're ready by next Wednesday. That gives us time to address any final issues and prepare the documentation.

**John**: Great timeline. I'll schedule the deployment meeting for Tuesday afternoon.

**Sarah**: Sounds good. I'll prepare the deployment checklist and share it with the team.

**John**: Thanks for the quick turnaround on this. Your work has been outstanding.

**Sarah**: Thanks for the positive feedback! Happy to help. See you at the meeting.

---

## Summary
Project review completed successfully with minor bugs identified. Deployment scheduled for Wednesday with preparation on Tuesday.`;

const faqItems: FAQItem[] = [
  { question: "Can I convert chat conversations to PDF?", answer: "Yes! Simply copy your chat transcript and paste it into our converter. You can save important conversations as professional PDF documents." },
  { question: "How do I preserve chat formatting?", answer: "Our tool supports Markdown formatting, which is perfect for chat transcripts. Use simple formatting to structure speaker names and timestamps." },
  { question: "Is this tool secure for private conversations?", answer: "Absolutely. All conversion happens locally in your browser. Your chat data is never uploaded to any server." },
  { question: "Can I export chats from messaging apps?", answer: "Yes. Most messaging apps allow you to export or copy conversations. Just paste the content into our converter." },
  { question: "What formats work best for chat transcripts?", answer: "Plain text, Markdown-formatted chat with speaker labels work perfectly. You can customize fonts and formatting before downloading." }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Chat to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
};

export default function ChatToPdfConverter() {
  useSEO({
    title: "Chat to PDF Converter Online Free – Convert Chat Transcripts to PDF | Pixocraft",
    description: "Convert chat conversations and transcripts to PDF instantly with Pixocraft. Free chat to PDF converter for saving conversations, discussions, and dialogs. No uploads required.",
    keywords: "chat to pdf, convert chat to pdf, chat transcript to pdf, conversation to pdf, chat pdf converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/chat-to-pdf",
    ogTitle: "Chat to PDF Converter Online Free – Convert Chat Transcripts to PDF | Pixocraft",
    ogDescription: "Convert chat conversations and transcripts to PDF instantly. Free, private, and fast chat to PDF converter.",
    ogType: "website",
  });

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm flex items-center gap-2 text-muted-foreground/80">
            <Link href="/" className="hover:text-primary transition-colors" data-testid="link-home">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools" className="hover:text-primary transition-colors" data-testid="link-tools">Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/pdf" className="hover:text-primary transition-colors">PDF Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/text-to-pdf" className="hover:text-primary transition-colors">Text to PDF</Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground font-medium">Chat to PDF</span>
          </div>

          <div className="text-center space-y-6 mb-16">
            <div className="flex items-center justify-center mb-2">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
                <Type className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Convert Chat to PDF Online Free
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Save important conversations and chat transcripts as professional PDF documents
                <span className="block mt-1 font-medium text-primary/80 text-lg">100% Private • Offline • Free</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Preserve Conversations
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Format Support
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Easy to Share
              </Badge>
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="chat-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-24 space-y-20 max-w-5xl mx-auto border-t pt-20">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold">Why Save Chats as PDF?</h2>
              <p className="text-muted-foreground leading-relaxed">Converting chat conversations to PDF is a great way to preserve important discussions and create professional documentation without server uploads or data collection.</p>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Chat Types You Can Convert</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {["Slack conversations", "Discord server discussions", "WhatsApp message threads", "Teams chat histories", "Email conversations", "Customer support chats"].map((type, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-muted-foreground">{type}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqItems.map((faq, i) => (
                  <Card key={i} className="border-none shadow-none bg-muted/20">
                    <CardHeader><CardTitle className="text-lg">{faq.question}</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground leading-relaxed">{faq.answer}</p></CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-primary/5 rounded-3xl p-12 border border-primary/10 text-center">
              <h2 className="text-3xl font-bold mb-6">Save Your Chat Conversations Today</h2>
              <Link href="/tools/text-to-pdf" className="inline-block">
                <Badge className="cursor-pointer hover-elevate py-2 px-6 text-base">
                  Visit Main Text to PDF Tool
                </Badge>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
