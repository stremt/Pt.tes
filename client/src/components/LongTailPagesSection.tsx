import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLongTailPages } from "@/lib/longTailPages";
import { ArrowRight } from "lucide-react";

interface LongTailPagesSectionProps {
  toolId: string;
}

export function LongTailPagesSection({ toolId }: LongTailPagesSectionProps) {
  const pages = getLongTailPages(toolId);
  
  if (pages.length === 0) {
    return null;
  }

  return (
    <section className="border-t py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">Explore Use Cases</h2>
            <p className="text-muted-foreground">
              Discover how this tool can be used for different purposes and scenarios
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {pages.map((page) => (
              <Link key={page.slug} href={page.path}>
                <Card className="h-full hover-elevate cursor-pointer transition-all" data-testid={`card-longtail-${page.slug}`}>
                  <CardHeader>
                    <CardTitle className="text-base">{page.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between p-0" 
                      data-testid={`button-explore-${page.slug}`}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
