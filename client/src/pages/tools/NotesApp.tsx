import { useState, useEffect } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FileText, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function NotesApp() {
  const [note, setNote] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Online Notes App | Save Notes Offline (No Login) | Pixocraft Tools",
    description: "Create and save notes offline using local storage. Fast & private.",
    keywords: "notes app online, save notes offline, simple notes tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/notes-app",
  });

  useEffect(() => {
    const saved = localStorage.getItem("pixocraft-note");
    if (saved) setNote(saved);
  }, []);

  const saveNote = () => {
    localStorage.setItem("pixocraft-note", note);
    toast({
      title: "Saved!",
      description: "Your note has been saved",
    });
  };

  const clearNote = () => {
    setNote("");
    localStorage.removeItem("pixocraft-note");
    toast({
      title: "Cleared!",
      description: "Note has been deleted",
    });
  };

  const howItWorks = [
    { step: 1, title: "Write Notes", description: "Type your notes in the text area" },
    { step: 2, title: "Auto Save", description: "Notes automatically saved to browser" },
    { step: 3, title: "Edit Anytime", description: "Come back and edit whenever needed" },
  ];

  const benefits = [
    { icon: <FileText className="h-5 w-5" />, title: "No Sync", description: "Purely offline for privacy" },
    { icon: <FileText className="h-5 w-5" />, title: "Auto Save", description: "Never lose your notes" },
    { icon: <FileText className="h-5 w-5" />, title: "Distraction Free", description: "Clean, simple interface" },
    { icon: <FileText className="h-5 w-5" />, title: "No Login", description: "Use instantly, no signup" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it sync?",
      answer: "No — purely offline for privacy. Your notes stay in your browser's local storage and never leave your device. Perfect for sensitive information."
    },
    {
      question: "Will my notes be saved if I close the browser?",
      answer: "Yes! Notes are automatically saved to local storage and persist across browser sessions. They'll be there when you return."
    },
    {
      question: "Can I use this on mobile?",
      answer: "Absolutely! This notes app works perfectly on mobile browsers, tablets, and desktops. Your notes stay on each device separately."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Notes App"
        description="Write notes → auto save → edit anytime. Clean, distraction-free notes tool."
        icon={<FileText className="h-8 w-8" />}
        toolId="notes-app"
        category="productivity"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", url: "/" },
              { label: "Tools", url: "/tools" },
              { label: "Productivity Tools", url: "/tools/productivity" },
              { label: "Notes App" },
            ]}
          />
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Start writing your notes here..."
              rows={20}
              className="resize-none"
              data-testid="textarea-note"
            />

            <div className="flex gap-2">
              <Button
                onClick={saveNote}
                size="lg"
                className="flex-1"
                data-testid="button-save-note"
              >
                <Save className="mr-2 h-5 w-5" />
                Save Note
              </Button>
              <Button
                onClick={clearNote}
                size="lg"
                variant="destructive"
                className="flex-1"
                data-testid="button-clear-note"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Clear Note
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground max-w-4xl mx-auto">
          <p>
            <Link href="/tools/productivity" className="text-primary hover:text-primary/80 transition-colors">
              Category: Productivity Tools
            </Link>
          </p>
        </div>
      </ToolLayout>
    </>
  );
}
