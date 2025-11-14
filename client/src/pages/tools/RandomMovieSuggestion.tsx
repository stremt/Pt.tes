import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Film, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { movies } from "@/lib/random-data";

export default function RandomMovieSuggestion() {
  const [movie, setMovie] = useState<typeof movies[0] | null>(null);

  useSEO({
    title: "Movie Suggestion Generator | Random Movie Picker | Pixocraft Tools",
    description: "Get offline movie suggestions from a static list. Perfect for choosing what to watch next.",
    keywords: "movie generator, movie picker, random movie suggester",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-movie-suggestion",
  });

  const generateMovie = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setMovie(movies[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get instant movie suggestion" },
    { step: 2, title: "View Details", description: "See title, year & genre" },
    { step: 3, title: "Enjoy", description: "Watch your suggested movie" },
  ];

  const benefits = [
    { icon: <Film className="h-5 w-5" />, title: "Curated List", description: "Popular movies included" },
    { icon: <Film className="h-5 w-5" />, title: "Multiple Genres", description: "Action, drama, comedy & more" },
    { icon: <Film className="h-5 w-5" />, title: "Instant", description: "Random suggestion in milliseconds" },
    { icon: <Film className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "How many movies are included?",
      answer: "We have curated a list of 15+ popular movies from various genres including classics, Bollywood hits, and Hollywood blockbusters."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Movie Suggestion"
        description="Click → show a random movie"
        icon={<Film className="h-8 w-8" />}
        toolId="random-movie-suggestion"
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
          <span className="text-foreground">Random Movie Suggestion</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateMovie}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Suggest Random Movie
          </Button>

          {movie && (
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4" data-testid="text-movie">
                  <h3 className="text-4xl font-bold">{movie.title}</h3>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="text-xl font-semibold">{movie.year}</p>
                    </div>
                    <div className="px-4 py-2 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Genre</p>
                      <p className="text-xl font-semibold">{movie.genre}</p>
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
