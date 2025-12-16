import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { getUseCasesForTool } from "@/lib/toolClusters";

interface RelatedUseCasesProps {
  toolId: string;
  toolName: string;
  maxItems?: number;
}

export function RelatedUseCases({ toolId, toolName, maxItems = 4 }: RelatedUseCasesProps) {
  const useCases = getUseCasesForTool(toolId).slice(0, maxItems);
  
  if (useCases.length === 0) {
    return null;
  }

  return (
    <section className="py-16 border-t bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Popular Use Cases</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover specific ways people use {toolName}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase) => (
            <Card 
              key={useCase.slug} 
              className="hover-elevate transition-all duration-200 group" 
              data-testid={`card-usecase-${useCase.slug}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {useCase.content.h1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 leading-relaxed mb-4">
                  {useCase.content.intro.slice(0, 120)}...
                </CardDescription>
                <Link href={`/tools/${useCase.parentToolId}/${useCase.slug}`}>
                  <Button variant="outline" size="sm" className="w-full" data-testid={`button-usecase-${useCase.slug}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
