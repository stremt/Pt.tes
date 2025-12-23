import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smile, Copy, Search } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { ToolLayout } from "@/components/layout/ToolLayout";

const symbolCategories = {
  arrows: ['←', '↑', '→', '↓', '↔', '↕', '⇐', '⇑', '⇒', '⇓', '⇔', '⇕', '⟵', '⟶', '⟷', '⤴', '⤵', '↩', '↪', '↺', '↻', '⇄', '⇅', '⇆'],
  math: ['±', '×', '÷', '=', '≠', '≈', '≤', '≥', '<', '>', '∞', '∑', '∏', '∫', '∂', '√', '∛', '∜', 'π', 'α', 'β', 'γ', 'δ', 'θ', 'λ', 'μ', 'σ', 'Ω'],
  currency: ['$', '¢', '£', '¥', '€', '₹', '₽', '₩', '₪', '₦', '₨', '฿', '₡', '₴', '₵', '₸', '₺', '₼', '₾', '﷼'],
  punctuation: ['!', '?', '.', ',', ';', ':', '"', "'", '-', '–', '—', '(', ')', '[', ']', '{', '}', '/', '\\', '|', '…', '·', '•', '‒', '―', '‖'],
  symbols: ['©', '®', '™', '§', '¶', '†', '‡', '°', '¹', '²', '³', '¼', '½', '¾', '⁰', '‰', '℃', '℉', '№', '℗', '℠', 'Ⓐ', '♠', '♣', '♥', '♦'],
  shapes: ['○', '●', '◯', '◉', '◌', '□', '■', '▢', '▣', '◻', '◼', '△', '▲', '▽', '▼', '◁', '◀', '▷', '▶', '◇', '◆', '⬟', '⬠', '★', '☆', '⭐'],
  emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😍', '🥰', '😘', '😋', '😎', '🤔', '🤨', '😐', '😑', '🙄', '😴', '😷', '🤧', '🤮', '🥵', '🥶', '😱'],
  technical: ['⌘', '⌥', '⇧', '⌃', '⎋', '⌫', '⌦', '⏎', '↩', '⇥', '⏏', '⌨', '🖱', '🖨', '💾', '📁', '📂', '🔍', '🔒', '🔓', '⚙', '🔧', '🔨', '⚡', '🔌'],
};

export default function CharacterMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedChar, setCopiedChar] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Character Map Online | Copy Unicode Symbols & Emojis Instantly | Pixocraft Tools",
    description: "Browse & copy thousands of Unicode characters — arrows, math symbols, currency, emojis & more.",
    keywords: "character map online, unicode copy, text symbols, special characters, emoji picker, unicode symbols",
    canonicalUrl: "https://tools.pixocraft.in/tools/character-map",
  });

  const copyCharacter = (char: string) => {
    navigator.clipboard.writeText(char);
    setCopiedChar(char);
    toast({
      title: "Copied!",
      description: `Copied "${char}" to clipboard`,
    });
    setTimeout(() => setCopiedChar(""), 2000);
  };

  const filterSymbols = (symbols: string[]) => {
    if (!searchQuery) return symbols;
    return symbols.filter(symbol => symbol.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Does it support emojis?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, emojis + 1000+ Unicode symbols." }
    }]
  };

  const howItWorks = [
    { step: 1, title: "Browse", description: "Explore symbols, arrows, math, currency & emojis" },
    { step: 2, title: "Click", description: "Click any character to copy it instantly" },
    { step: 3, title: "Paste", description: "Paste anywhere you need it" },
  ];

  const benefits = [
    { icon: <Smile className="h-5 w-5" />, title: "1000+ Symbols", description: "Browse thousands of Unicode characters" },
    { icon: <Copy className="h-5 w-5" />, title: "One-Click Copy", description: "Copy instantly with a single click" },
    { icon: <Search className="h-5 w-5" />, title: "Search", description: "Find symbols quickly" },
  ];

  const faqs = [
    { question: "Does it support emojis?", answer: "Yes, emojis + 1000+ Unicode symbols." },
    { question: "How do I use the characters?", answer: "Simply click on any character and it will be automatically copied to your clipboard." },
    { question: "What symbols are available?", answer: "Arrows, math, currency, punctuation, shapes, emojis, technical symbols and more." },
  ];

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <ToolLayout
        title="Character Map"
        description="Click any symbol → copied instantly. Arrows, math, emojis, currency & more"
        icon={<Smile className="h-8 w-8" />}
        toolId="character-map"
        category="text"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="max-w-6xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Browse Symbols</CardTitle>
              <CardDescription>Click any character to copy it to your clipboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search symbols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>

              <Tabs defaultValue="arrows" className="w-full">
                <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-1">
                  <TabsTrigger value="arrows" data-testid="tab-arrows">Arrows</TabsTrigger>
                  <TabsTrigger value="math" data-testid="tab-math">Math</TabsTrigger>
                  <TabsTrigger value="currency" data-testid="tab-currency">Currency</TabsTrigger>
                  <TabsTrigger value="punctuation" data-testid="tab-punctuation">Punct</TabsTrigger>
                  <TabsTrigger value="symbols" data-testid="tab-symbols">Symbols</TabsTrigger>
                  <TabsTrigger value="shapes" data-testid="tab-shapes">Shapes</TabsTrigger>
                  <TabsTrigger value="emojis" data-testid="tab-emojis">Emojis</TabsTrigger>
                  <TabsTrigger value="technical" data-testid="tab-technical">Tech</TabsTrigger>
                </TabsList>

                {Object.entries(symbolCategories).map(([category, symbols]) => (
                  <TabsContent key={category} value={category} className="mt-6">
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2">
                      {filterSymbols(symbols).map((char, index) => (
                        <Button
                          key={index}
                          onClick={() => copyCharacter(char)}
                          variant={copiedChar === char ? "default" : "outline"}
                          className="h-12 w-12 p-0 text-2xl"
                          data-testid={`button-char-${char}`}
                        >
                          {char}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
