import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Diff, ArrowLeftRight } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showDiff, setShowDiff] = useState(false);

  useSEO({
    title: "Text Difference Checker | Highlight Changes Between Two Texts | Pixocraft Tools",
    description: "Compare two text blocks and highlight exact differences instantly. Offline, fast & perfect for editors and developers.",
    keywords: "text diff checker, compare text online, highlight text differences, text comparison tool, diff tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-diff",
  });

  const compare = () => {
    setShowDiff(true);
  };

  const swap = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const clear = () => {
    setText1("");
    setText2("");
    setShowDiff(false);
  };

  // Simple character-based diff
  const getDiff = () => {
    if (!text1 && !text2) return { added: [], removed: [], same: [] };

    const chars1 = text1.split('');
    const chars2 = text2.split('');
    const maxLen = Math.max(chars1.length, chars2.length);

    const added: string[] = [];
    const removed: string[] = [];
    const same: string[] = [];

    for (let i = 0; i < maxLen; i++) {
      const c1 = chars1[i];
      const c2 = chars2[i];

      if (c1 === c2) {
        same.push(c1 || '');
      } else {
        if (c1) removed.push(c1);
        if (c2) added.push(c2);
      }
    }

    return { added, removed, same };
  };

  const diff = getDiff();
  const hasDifferences = diff.added.length > 0 || diff.removed.length > 0;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does this work offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, everything runs inside your browser."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Diff className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Text Difference Highlighter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare texts & highlight differences. Perfect for code review, writing edits & documents
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Instant</Badge>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Compare Texts</CardTitle>
                <CardDescription>
                  Paste text in both boxes to see differences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Original Text</Label>
                    <Textarea
                      value={text1}
                      onChange={(e) => setText1(e.target.value)}
                      placeholder="Paste original text here..."
                      className="min-h-[200px] font-mono text-sm"
                      data-testid="textarea-text1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Modified Text</Label>
                    <Textarea
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                      placeholder="Paste modified text here..."
                      className="min-h-[200px] font-mono text-sm"
                      data-testid="textarea-text2"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Button onClick={compare} data-testid="button-compare">
                    Compare
                  </Button>
                  <Button onClick={swap} variant="outline" data-testid="button-swap">
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Swap
                  </Button>
                  <Button onClick={clear} variant="outline" data-testid="button-clear">
                    Clear
                  </Button>
                </div>

                {showDiff && (
                  <div className="space-y-4">
                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Differences Found</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {hasDifferences ? (
                          <>
                            {diff.removed.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-destructive mb-2">Removed Characters: {diff.removed.length}</p>
                                <div className="p-3 bg-destructive/10 rounded-md font-mono text-sm break-all">
                                  {diff.removed.map((char, i) => (
                                    <span key={i} className="bg-destructive/30">{char}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {diff.added.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Added Characters: {diff.added.length}</p>
                                <div className="p-3 bg-green-500/10 rounded-md font-mono text-sm break-all">
                                  {diff.added.map((char, i) => (
                                    <span key={i} className="bg-green-500/30">{char}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-center text-muted-foreground">No differences found. Both texts are identical.</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
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
                    <CardTitle className="text-lg">Does this work offline?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! Everything runs inside your browser. No data is uploaded to any server.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What kind of differences does it show?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The tool compares texts character by character and highlights what was added (green) and what was removed (red).
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
