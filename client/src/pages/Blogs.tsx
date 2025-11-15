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
    title: "Blog - Pixocraft Tools | Latest Guides, Tips & Tutorials for Free Online Tools",
    description: "Explore our comprehensive blog featuring in-depth tutorials, expert tips, and guides on using 200+ free online tools. Learn about privacy, security, productivity, text tools, image editing, PDF manipulation, developer utilities, and more. Expert insights from India's biggest tool hub.",
    keywords: "pixocraft blog, online tools tutorials, tool guides, privacy tips, security guides, productivity hacks, text tool tips, image editing tutorials, PDF tools guide, developer utilities, free tools blog, India tool hub blog, how to use online tools",
    canonicalUrl: "https://tools.pixocraft.in/blogs",
  });

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/blogs/data.json"],
  });

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16 md:mb-24 px-4">
          <Badge variant="secondary" className="text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 font-medium">Our Blog</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
            Insights & <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Guides</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn about online tools, privacy, security, and digital productivity from the Pixocraft team
          </p>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse overflow-hidden border-2">
                <div className="h-56 bg-muted"></div>
                <CardHeader className="space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-12">
            {/* Featured Post */}
            {posts[0] && (
              <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group border-2" data-testid={`card-blog-${posts[0].slug}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {posts[0].featuredImage && (
                    <div className="relative h-64 sm:h-80 lg:h-full min-h-[400px] lg:min-h-[500px] overflow-hidden">
                      <img 
                        src={posts[0].featuredImage} 
                        alt={posts[0].title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <Badge variant="default" className="absolute top-6 left-6 text-base px-4 py-2 font-semibold">
                        Featured Article
                      </Badge>
                    </div>
                  )}
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <CardHeader className="p-0 space-y-4 sm:space-y-6">
                      <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
                        {posts[0].title}
                      </CardTitle>
                      <div className="flex items-center gap-6 text-base text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          {new Date(posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {posts[0].author}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8 mt-6">
                      <CardDescription className="text-lg leading-relaxed">
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
              <>
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 sm:px-0">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Latest Articles</h2>
                  <Badge variant="outline" className="text-sm sm:text-base font-semibold px-2 sm:px-3 py-1">{posts.length - 1}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                  {posts.slice(1).map((post) => (
                    <Card
                      key={post.slug}
                      className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group flex flex-col border-2"
                      data-testid={`card-blog-${post.slug}`}
                    >
                      {post.featuredImage && (
                        <div className="relative h-56 overflow-hidden">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
                      <CardHeader className="flex-1 space-y-4 pb-4">
                        <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            {post.author}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5 pt-0">
                        <CardDescription className="line-clamp-3 leading-relaxed text-base">
                          {post.meta.description}
                        </CardDescription>
                        <Link href={`/blogs/${post.slug}`}>
                          <Button variant="outline" size="lg" className="w-full" data-testid={`button-read-${post.slug}`}>
                            Read Article
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="space-y-6">
              <div className="h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">No blog posts yet</h3>
                <p className="text-lg text-muted-foreground">Check back soon for our latest articles and guides!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
