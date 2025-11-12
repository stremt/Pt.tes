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
        <div className="text-center space-y-6 mb-20">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">Our Blog</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Insights & <span className="text-primary">Guides</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Learn about online tools, privacy, security, and digital productivity from the Pixocraft team
          </p>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse overflow-hidden">
                <div className="h-48 bg-muted"></div>
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
          <div className="space-y-8">
            {/* Featured Post */}
            {posts[0] && (
              <Card className="overflow-hidden hover-elevate transition-all duration-200 group" data-testid={`card-blog-${posts[0].slug}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {posts[0].featuredImage && (
                    <div className="relative h-64 lg:h-full overflow-hidden">
                      <img 
                        src={posts[0].featuredImage} 
                        alt={posts[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <Badge variant="default" className="absolute top-4 left-4">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="p-8 flex flex-col justify-center">
                    <CardHeader className="p-0">
                      <CardTitle className="text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors">
                        {posts[0].title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {new Date(posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          {posts[0].author}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                      <CardDescription className="text-base leading-relaxed">
                        {posts[0].meta.description}
                      </CardDescription>
                      <Link href={`/blogs/${posts[0].slug}`}>
                        <Button size="lg" data-testid={`button-read-${posts[0].slug}`}>
                          Read Full Article
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </div>
              </Card>
            )}

            {/* Other Posts */}
            {posts.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post) => (
                  <Card
                    key={post.slug}
                    className="overflow-hidden hover-elevate transition-all duration-200 group flex flex-col"
                    data-testid={`card-blog-${post.slug}`}
                  >
                    {post.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="line-clamp-3 leading-relaxed">
                        {post.meta.description}
                      </CardDescription>
                      <Link href={`/blogs/${post.slug}`}>
                        <Button variant="outline" className="w-full" data-testid={`button-read-${post.slug}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
