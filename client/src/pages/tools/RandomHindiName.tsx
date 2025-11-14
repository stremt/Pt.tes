import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { User, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { hindiNames } from "@/lib/random-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RandomHindiName() {
  const [name, setName] = useState<string | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  useSEO({
    title: "Random Hindi Name Generator | Indian Names | Pixocraft Tools",
    description: "Generate offline Indian names for characters, ideas, etc. Perfect for writers, game developers, and creative projects.",
    keywords: "hindi name generator, indian names, random name generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-hindi-name",
  });

  const generateName = () => {
    const names = gender === 'male' ? hindiNames.male : hindiNames.female;
    const randomIndex = Math.floor(Math.random() * names.length);
    setName(names[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Choose Gender", description: "Select male or female" },
    { step: 2, title: "Click Generate", description: "Get random Indian name" },
    { step: 3, title: "Use It", description: "Perfect for characters & stories" },
  ];

  const benefits = [
    { icon: <User className="h-5 w-5" />, title: "Modern Names", description: "Popular Indian names" },
    { icon: <User className="h-5 w-5" />, title: "Both Genders", description: "Male and female names" },
    { icon: <User className="h-5 w-5" />, title: "Creative Use", description: "Great for writing" },
    { icon: <User className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "How many names are available?",
      answer: "We have 15+ popular male names and 15+ popular female names, totaling 30+ modern Indian names."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Hindi Name Generator"
        description="Click → get names"
        icon={<User className="h-8 w-8" />}
        toolId="random-hindi-name"
        category="generator"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Random Hindi Name</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Tabs value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="male">Male Names</TabsTrigger>
              <TabsTrigger value="female">Female Names</TabsTrigger>
            </TabsList>
            <TabsContent value={gender} className="mt-6">
              <Button
                onClick={generateName}
                size="lg"
                className="w-full"
                data-testid="button-generate"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Generate {gender === 'male' ? 'Male' : 'Female'} Name
              </Button>
            </TabsContent>
          </Tabs>

          {name && (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-5xl font-bold" data-testid="text-name">{name}</h3>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
