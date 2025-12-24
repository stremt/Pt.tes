import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Globe, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const countries = [
  { name: "United States", capital: "Washington D.C.", continent: "North America", flag: "🇺🇸" },
  { name: "United Kingdom", capital: "London", continent: "Europe", flag: "🇬🇧" },
  { name: "Canada", capital: "Ottawa", continent: "North America", flag: "🇨🇦" },
  { name: "Australia", capital: "Canberra", continent: "Oceania", flag: "🇦🇺" },
  { name: "Germany", capital: "Berlin", continent: "Europe", flag: "🇩🇪" },
  { name: "France", capital: "Paris", continent: "Europe", flag: "🇫🇷" },
  { name: "Japan", capital: "Tokyo", continent: "Asia", flag: "🇯🇵" },
  { name: "India", capital: "New Delhi", continent: "Asia", flag: "🇮🇳" },
  { name: "Brazil", capital: "Brasília", continent: "South America", flag: "🇧🇷" },
  { name: "China", capital: "Beijing", continent: "Asia", flag: "🇨🇳" },
  { name: "Russia", capital: "Moscow", continent: "Europe/Asia", flag: "🇷🇺" },
  { name: "Mexico", capital: "Mexico City", continent: "North America", flag: "🇲🇽" },
  { name: "Italy", capital: "Rome", continent: "Europe", flag: "🇮🇹" },
  { name: "Spain", capital: "Madrid", continent: "Europe", flag: "🇪🇸" },
  { name: "South Korea", capital: "Seoul", continent: "Asia", flag: "🇰🇷" },
  { name: "Argentina", capital: "Buenos Aires", continent: "South America", flag: "🇦🇷" },
  { name: "Egypt", capital: "Cairo", continent: "Africa", flag: "🇪🇬" },
  { name: "South Africa", capital: "Pretoria", continent: "Africa", flag: "🇿🇦" },
  { name: "Nigeria", capital: "Abuja", continent: "Africa", flag: "🇳🇬" },
  { name: "Saudi Arabia", capital: "Riyadh", continent: "Asia", flag: "🇸🇦" },
];

export default function RandomCountryGenerator() {
  const [country, setCountry] = useState<typeof countries[0] | null>(null);

  useSEO({
    title: "Random Country Generator | Pick Random Countries | Pixocraft Tools",
    description: "Generate random countries with flags, capitals & continent info.",
    keywords: "random country, country picker, flag generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-country-generator",
  });

  const generateCountry = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setCountry(countries[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Press button to pick random country" },
    { step: 2, title: "View Details", description: "See country name, capital & continent" },
    { step: 3, title: "Generate Again", description: "Get new random country anytime" },
  ];

  const benefits = [
    { icon: <Globe className="h-5 w-5" />, title: "Flag Display", description: "Shows country flag" },
    { icon: <Globe className="h-5 w-5" />, title: "Complete Info", description: "Name, capital & continent" },
    { icon: <Globe className="h-5 w-5" />, title: "Educational", description: "Learn geography fun way" },
    { icon: <Globe className="h-5 w-5" />, title: "Instant", description: "Random country in milliseconds" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it show flag?",
      answer: "Yes — flag display included. Each randomly generated country shows its national flag along with comprehensive information."
    },
    {
      question: "How many countries are included?",
      answer: "We have a curated list of 20+ major countries from all continents. This includes popular nations from North America, South America, Europe, Asia, Africa, and Oceania."
    },
    {
      question: "What information is shown?",
      answer: "For each country, you'll see: country name, capital city, continent, and the national flag. Perfect for educational purposes or geography games."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Country Generator"
        description="Click generate → get random country name, capital & flag instantly."
        icon={<Globe className="h-8 w-8" />}
        toolId="random-country-generator"
        category="generator"
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
              { label: "Random Country Generator" },
            ]}
          />
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateCountry}
            size="lg"
            className="w-full"
            data-testid="button-generate-country"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Random Country
          </Button>

          {country && (
            <Card>
              <CardContent className="p-8 text-center space-y-6">
                <div className="text-8xl mb-4" data-testid="text-flag">{country.flag}</div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold" data-testid="text-country-name">{country.name}</h3>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Capital</p>
                      <p className="text-xl font-semibold" data-testid="text-capital">{country.capital}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Continent</p>
                      <p className="text-xl font-semibold" data-testid="text-continent">{country.continent}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
