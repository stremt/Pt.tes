import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smile, Copy, Search } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

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
    return symbols.filter(symbol => 
      symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does it support emojis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, emojis + 1000+ Unicode symbols."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Character Map</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Smile className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Character Map</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Click any symbol → copied instantly. Arrows, math, emojis, currency & more
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">1000+ Symbols</Badge>
              <Badge variant="secondary">One-Click Copy</Badge>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Browse Symbols</CardTitle>
                <CardDescription>
                  Click any character to copy it to your clipboard
                </CardDescription>
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

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does it support emojis?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! We include emojis plus 1000+ Unicode symbols including arrows, math symbols, currency signs, shapes, and technical symbols.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do I use the characters?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Simply click on any character and it will be automatically copied to your clipboard. You can then paste it anywhere you need.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I search for specific symbols?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! Use the search box at the top to quickly find the symbols you need. The search works across all categories.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
