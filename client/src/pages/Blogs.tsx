import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/lib/seo";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";

export default function Blogs() {
  useSEO({
    title: "Blog | Pixocraft Tools",
    description: "Read our latest articles about online tools, privacy, security, and digital productivity. Tips, guides, and best practices from the Pixocraft team.",
    keywords: "blog, articles, tutorials, guides, online tools, privacy, security",
    canonicalUrl: "https://tools.pixocraft.in/blogs",
  });

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/blogs/data.json"],
  });

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">Blog</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Pixocraft Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and guides to help you make the most of our free online tools
          </p>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Card
                key={post.slug}
                className={`hover-elevate transition-transform duration-200 ${index === 0 ? "md:col-span-2 lg:col-span-3" : ""}`}
                data-testid={`card-blog-${post.slug}`}
              >
                <CardHeader>
                  {index === 0 && (
                    <Badge variant="default" className="w-fit mb-2">Featured</Badge>
                  )}
                  <CardTitle className={index === 0 ? "text-2xl md:text-3xl" : "text-xl"}>
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className={index === 0 ? "text-base" : ""}>
                    {post.meta.description}
                  </CardDescription>
                  <Link href={`/blogs/${post.slug}`}>
                    <Button variant={index === 0 ? "default" : "outline"} data-testid={`button-read-${post.slug}`}>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
