import { useSEO, StructuredData } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Dices, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Random Tools", "item": "https://tools.pixocraft.in/tools/random" }
  ]
});

export default function RandomCategory() {
  useSEO({
    title: "Random Generator Tools - Free Online Random Data & Ideas | Pixocraft",
    description: "Generate random numbers, strings, colors, names, ideas, and more with Pixocraft's free online random generator tools. Get inspiration instantly—offline, private, and no signup required.",
    keywords: "random generator, random number, random string, random color, random name, random idea, random quote, random task, free random tools, online random generator, inspiration tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/random",
  });

  const randomTools = [
    {
      id: "random-number-generator",
      name: "Random Number Generator",
      description: "Generate random numbers with custom ranges and formatting options.",
      path: "/tools/random-number-generator",
    },
    {
      id: "random-string-generator",
      name: "Random String Generator",
      description: "Create random strings with customizable character sets and length.",
      path: "/tools/random-string-generator",
    },
    {
      id: "random-hex-color",
      name: "Random Hex Color Generator",
      description: "Generate random hex color codes instantly for design and development.",
      path: "/tools/random-hex-color",
    },
    {
      id: "random-emoji-generator",
      name: "Random Emoji Generator",
      description: "Get a random emoji every time—perfect for creative ideas and social media.",
      path: "/tools/random-emoji-generator",
    },
    {
      id: "random-word-generator",
      name: "Random Word Generator",
      description: "Generate random words for writing prompts, brainstorming, and creative projects.",
      path: "/tools/random-word-generator",
    },
    {
      id: "random-date-generator",
      name: "Random Date Generator",
      description: "Generate random dates within specific year ranges and formats.",
      path: "/tools/random-date-generator",
    },
    {
      id: "random-country-generator",
      name: "Random Country Generator",
      description: "Get a random country from around the world with a single click.",
      path: "/tools/random-country-generator",
    },
    {
      id: "random-animal-generator",
      name: "Random Animal Generator",
      description: "Discover random animals from across the globe for inspiration and learning.",
      path: "/tools/random-animal-generator",
    },
    {
      id: "random-object-generator",
      name: "Random Object Generator",
      description: "Generate random everyday objects for creative challenges and ideas.",
      path: "/tools/random-object-generator",
    },
    {
      id: "random-fake-address",
      name: "Random Address Generator",
      description: "Generate realistic random addresses for testing, development, and creative use.",
      path: "/tools/random-fake-address",
    },
    {
      id: "random-movie-suggestion",
      name: "Random Movie Suggestion",
      description: "Get random movie recommendations when you can't decide what to watch.",
      path: "/tools/random-movie-suggestion",
    },
    {
      id: "random-hindi-name",
      name: "Random Hindi Name Generator",
      description: "Generate random Hindi names for characters, projects, and creative writing.",
      path: "/tools/random-hindi-name",
    },
    {
      id: "random-tech-stack",
      name: "Random Tech Stack Generator",
      description: "Get random technology combinations for learning and side projects.",
      path: "/tools/random-tech-stack",
    },
    {
      id: "random-startup-idea",
      name: "Random Startup Idea Generator",
      description: "Generate random startup ideas to spark innovation and entrepreneurial thinking.",
      path: "/tools/random-startup-idea",
    },
    {
      id: "random-riddle",
      name: "Random Riddle Generator",
      description: "Get random riddles to challenge your mind and entertain friends.",
      path: "/tools/random-riddle",
    },
    {
      id: "random-task",
      name: "Random Task Generator",
      description: "Generate random tasks and challenges to overcome procrastination.",
      path: "/tools/random-task",
    },
    {
      id: "random-superhero-name",
      name: "Random Superhero Name Generator",
      description: "Create random superhero names for characters, games, and creative projects.",
      path: "/tools/random-superhero-name",
    },
    {
      id: "random-truth-dare",
      name: "Random Truth or Dare",
      description: "Get random truth or dare prompts for games and social gatherings.",
      path: "/tools/random-truth-dare",
    },
    {
      id: "random-motivational-quote",
      name: "Random Motivational Quote",
      description: "Get inspired with random motivational quotes whenever you need a boost.",
      path: "/tools/random-motivational-quote",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Random Tools" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <Dices className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-random-category">
              Random Generators
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Random Generator Tools – <span className="text-primary">Free, Offline & Private</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get inspired with random generators for numbers, colors, ideas, names, and more—instantly, offline, and completely private.
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Random Generation for Inspiration & Creativity</h2>
            <p className="text-muted-foreground leading-relaxed">
              Random generators spark creativity, overcome decision fatigue, and provide instant inspiration when you need it most. Whether you're brainstorming ideas, testing applications, creating content, or simply seeking a moment of chance-driven inspiration, random generators transform uncertainty into opportunity.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From random numbers for simulations and testing to random ideas for startup concepts and creative projects, random generators serve as idea accelerators. They eliminate the "blank page syndrome," provide diverse perspectives through randomization, and introduce element of surprise that often leads to breakthrough thinking.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Uses Random Generators?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Developers use random generators for testing, sample data creation, and algorithm development. Content creators leverage random prompts for writing, design, and creative projects. Students use randomization for study breaks, challenges, and learning aids. Game enthusiasts enjoy random suggestions for entertainment choices and interactive games.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Business professionals use random ideas to spark innovation and brainstorming sessions. Entrepreneurs generate startup concepts and market ideas. Teachers use random tasks and riddles for classroom engagement. Friends play truth-or-dare games and random challenges together. Anyone seeking inspiration, decision-making help, or creative stimulation benefits from random generators.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Common Uses for Random Generation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Testing and development rely on random data generation—random numbers for simulations, random strings for input validation, random addresses for form testing. Creative projects use random prompts to break creative blocks and explore new directions. Decision-making becomes easier with random suggestions, from movie picks to task suggestions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Entertainment and social activities thrive with random games, riddles, and challenges. Inspiration comes from random quotes, startup ideas, and creative prompts. Character creation for games and stories uses random names and characteristics. Learning benefits from randomized tasks, riddles, and unexpected challenges.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Offline & Private Random Generation</h2>
            <p className="text-muted-foreground leading-relaxed">
              All random generator tools run entirely in your browser without sending data to external servers. This offline-first approach ensures complete privacy—your random selections, generated data, and creative processes stay on your device. No tracking, no logging, no third-party analysis of your random generation patterns.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Browser-based generation means instant results without network delays, offline functionality after initial load, and zero security risks. Whether generating test data, creative prompts, or personal inspiration, local processing guarantees your activity remains completely private and under your control.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Using Random Generators Effectively</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with simple random generation: create test data for applications, get movie or music suggestions, generate random numbers for games or simulations. For creativity, use random words, prompts, and ideas to overcome blocks and explore new directions. Combine multiple generators for richer results—random object plus random country for storytelling.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For entertainment, organize random challenge games with friends. For learning, use random tasks and riddles as study breaks. For business innovation, generate startup ideas and market concepts. Most importantly, embrace the randomness—sometimes the best ideas come from unexpected suggestions rather than careful planning.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Random generators work best as spontaneous tools in your creative toolkit. Use them when stuck, when seeking inspiration, when testing, or simply when you want a moment of chance-driven surprise. The randomness itself becomes the creative catalyst.
            </p>
          </section>
        </article>

        {/* All Random Tools Section */}
        <section className="space-y-6 border-t pt-12">
          <h2 className="text-2xl font-bold">All Random Generator Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomTools.map((tool) => (
              <Card key={tool.id} className="hover-elevate flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Dices className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="mb-4 flex-1">{tool.description}</CardDescription>
                  <a href={tool.path}>
                    <Button variant="outline" className="w-full" data-testid={`button-random-tool-${tool.id}`}>
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
