import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Rabbit, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { animals } from "@/lib/random-data";

export default function RandomAnimalGenerator() {
  const [animal, setAnimal] = useState<string | null>(null);

  useSEO({
    title: "Random Animal Generator | Offline Animal Picker | Pixocraft Tools",
    description: "Generate random animals from a static list. Free offline random animal generator for games, education, and fun.",
    keywords: "random animal, animal picker, random animal generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-animal-generator",
  });

  const generateAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animals.length);
    setAnimal(animals[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Press button to pick random animal" },
    { step: 2, title: "View Result", description: "See random animal name" },
    { step: 3, title: "Generate Again", description: "Get new random animal anytime" },
  ];

  const benefits = [
    { icon: <Rabbit className="h-5 w-5" />, title: "Instant", description: "Random animal in milliseconds" },
    { icon: <Rabbit className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
    { icon: <Rabbit className="h-5 w-5" />, title: "Educational", description: "Learn about different animals" },
    { icon: <Rabbit className="h-5 w-5" />, title: "Fun", description: "Perfect for games and activities" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "How many animals are included?",
      answer: "We have 30+ different animals from various categories including mammals, birds, insects, and reptiles."
    },
    {
      question: "Can I use this for educational purposes?",
      answer: "Absolutely! This tool is perfect for classroom activities, learning games, and educational projects."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Animal Generator"
        description="Click → get random animal"
        icon={<Rabbit className="h-8 w-8" />}
        toolId="random-animal-generator"
        category="random"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-6 px-4 pt-4">
          <Breadcrumb
            items={[
              { label: "Home", url: "/" },
              { label: "Tools", url: "/tools" },
              { label: "Random Tools", url: "/tools/random" },
              { label: "Random Animal Generator" },
            ]}
          />
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateAnimal}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Random Animal
          </Button>

          {animal && (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-5xl font-bold" data-testid="text-animal">{animal}</h3>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
