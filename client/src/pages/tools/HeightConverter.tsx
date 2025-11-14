import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HeightConverter() {
  const [cm, setCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [result, setResult] = useState<{ cm: number; feet: number; inches: number; totalInches: number } | null>(null);

  useSEO({
    title: "Height Converter | cm to feet & inches | Pixocraft Tools",
    description: "Convert height between feet, cm and inches instantly. Free height conversion tool for everyone.",
    keywords: "height converter, cm to feet, feet to cm, inches converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/height-converter",
  });

  const convertFromCm = () => {
    const cmVal = parseFloat(cm);
    if (isNaN(cmVal)) return;

    const totalInches = cmVal / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inch = totalInches % 12;

    setResult({ cm: cmVal, feet: ft, inches: inch, totalInches });
  };

  const convertFromFeetInches = () => {
    const ft = parseFloat(feet) || 0;
    const inch = parseFloat(inches) || 0;

    const totalInches = ft * 12 + inch;
    const cmVal = totalInches * 2.54;

    setResult({ cm: cmVal, feet: ft, inches: inch, totalInches });
  };

  const faqItems: FAQItem[] = [
    {
      question: "How to convert cm to feet?",
      answer: "Divide cm by 30.48 to get feet. For example, 180 cm = 180/30.48 = 5.9 feet (approximately 5 feet 11 inches)."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            {" / "}
            <span className="text-foreground">Height Converter</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Ruler className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Height Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter value → convert instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Fast</Badge>
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Convert Height</CardTitle>
                <CardDescription>
                  Convert between centimeters, feet, and inches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cm-to-feet" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cm-to-feet">CM to Feet/Inches</TabsTrigger>
                    <TabsTrigger value="feet-to-cm">Feet/Inches to CM</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cm-to-feet" className="space-y-6">
                    <div className="space-y-2">
                      <Label>Centimeters</Label>
                      <Input
                        type="number"
                        value={cm}
                        onChange={(e) => setCm(e.target.value)}
                        placeholder="e.g., 180"
                        data-testid="input-cm"
                      />
                    </div>
                    <Button onClick={convertFromCm} className="w-full" data-testid="button-convert-cm">
                      Convert
                    </Button>
                  </TabsContent>

                  <TabsContent value="feet-to-cm" className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Feet</Label>
                        <Input
                          type="number"
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          placeholder="e.g., 5"
                          data-testid="input-feet"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Inches</Label>
                        <Input
                          type="number"
                          value={inches}
                          onChange={(e) => setInches(e.target.value)}
                          placeholder="e.g., 11"
                          data-testid="input-inches"
                        />
                      </div>
                    </div>
                    <Button onClick={convertFromFeetInches} className="w-full" data-testid="button-convert-feet">
                      Convert
                    </Button>
                  </TabsContent>
                </Tabs>

                {result && (
                  <Card className="bg-muted mt-6">
                    <CardContent className="p-6">
                      <div className="space-y-3" data-testid="text-result">
                        <p className="text-lg"><strong>CM:</strong> {result.cm.toFixed(2)} cm</p>
                        <p className="text-lg"><strong>Feet & Inches:</strong> {result.feet}' {result.inches.toFixed(1)}"</p>
                        <p className="text-lg"><strong>Total Inches:</strong> {result.totalInches.toFixed(2)}"</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
