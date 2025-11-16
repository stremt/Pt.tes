import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSEO } from "@/lib/seo";
import { Calendar, User, ArrowRight, Search, Clock, Eye, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useSEO({
    title: "Blog - Pixocraft Tools | Latest Guides, Tips & Tutorials for Free Online Tools",
    description: "Explore our comprehensive blog featuring in-depth tutorials, expert tips, and guides on using 200+ free online tools. Learn about privacy, security, productivity, text tools, image editing, PDF manipulation, developer utilities, and more. Expert insights from India's biggest tool hub.",
    keywords: "pixocraft blog, online tools tutorials, tool guides, privacy tips, security guides, productivity hacks, text tool tips, image editing tutorials, PDF tools guide, developer utilities, free tools blog, India tool hub blog, how to use online tools",
    canonicalUrl: "https://tools.pixocraft.in/blogs",
  });

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/blogs/data.json"],
  });

  const categories = useMemo(() => {
    if (!posts) return [];
    const categoryMap = new Map<string, number>();
    posts.forEach(post => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
  }, [posts]);

  const allTags = useMemo(() => {
    if (!posts) return [];
    const tagMap = new Map<string, number>();
    posts.forEach(post => {
      post.tags.forEach(tag => {
        const count = tagMap.get(tag) || 0;
        tagMap.set(tag, count + 1);
      });
    });
    return Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    let filtered = [...posts];

    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.meta.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [posts, searchQuery, selectedCategory]);

  const featuredPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) => b.views - a.views).slice(0, 3);
  }, [posts]);

  const latestPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
  }, [posts]);

  const popularPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) => b.views - a.views).slice(0, 6);
  }, [posts]);

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 mb-10 sm:mb-14 md:mb-16 px-2 sm:px-4">
          <Badge variant="secondary" className="text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 font-semibold" data-testid="badge-blog-header">Our Blog</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Insights & <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Guides</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn about online tools, privacy, security, and digital productivity from the Pixocraft team
          </p>

          <div className="relative max-w-2xl mx-auto mt-6 sm:mt-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles, tags, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-base sm:text-lg"
              data-testid="input-search-blog"
            />
          </div>
        </div>

        <div className="mb-10 sm:mb-12 md:mb-16 px-2 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
              data-testid="button-category-all"
            >
              All Articles {posts && `(${posts.length})`}
            </Button>
            {categories.map(category => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.name)}
                className="rounded-full"
                data-testid={`button-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse overflow-hidden">
                <div className="h-48 sm:h-56 bg-muted"></div>
                <CardHeader className="p-4 sm:p-6 space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {!searchQuery && !selectedCategory && (
              <>
                <section>
                  <div className="flex items-center gap-3 mb-6 sm:mb-8 px-2 sm:px-0">
                    <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Featured Articles</h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {featuredPosts.map((post, index) => (
                      <Card
                        key={post.slug}
                        className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group flex flex-col"
                        data-testid={`card-featured-${post.slug}`}
                      >
                        {post.featuredImage && (
                          <div className="relative h-48 sm:h-56 overflow-hidden">
                            <img 
                              src={post.featuredImage} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading={index === 0 ? "eager" : "lazy"}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <Badge variant="default" className="absolute top-4 left-4 text-xs px-3 py-1">
                              Featured
                            </Badge>
                            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white text-sm">
                              <Eye className="h-4 w-4" />
                              <span className="font-semibold">{post.views.toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                        <CardHeader className="p-4 sm:p-6 flex-1 space-y-3 pb-3">
                          <Badge variant="secondary" className="w-fit text-xs" data-testid={`badge-category-${post.slug}`}>
                            {post.category}
                          </Badge>
                          <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {post.title}
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              {post.readingTime} min read
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 space-y-4 pt-0">
                          <CardDescription className="line-clamp-3 leading-relaxed text-sm sm:text-base">
                            {post.meta.description}
                          </CardDescription>
                          <Link href={`/blogs/${post.slug}`}>
                            <Button variant="outline" size="default" className="w-full text-sm sm:text-base" data-testid={`button-read-${post.slug}`}>
                              Read Article
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-6 sm:mb-8 px-2 sm:px-0">
                    <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Latest Articles</h2>
                    <Badge variant="outline" className="text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1">
                      {latestPosts.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {latestPosts.map((post, index) => (
                      <BlogCard key={post.slug} post={post} index={index} />
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-6 sm:mb-8 px-2 sm:px-0">
                    <Eye className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Most Popular</h2>
                    <Badge variant="outline" className="text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1">
                      {popularPosts.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {popularPosts.map((post, index) => (
                      <BlogCard key={post.slug} post={post} index={index} showViews />
                    ))}
                  </div>
                </section>

                <section className="bg-muted/30 rounded-xl p-6 sm:p-8 md:p-10">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Popular Tags</h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {allTags.map(tag => (
                      <Badge
                        key={tag.name}
                        variant="secondary"
                        className="cursor-pointer hover-elevate active-elevate-2 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
                        onClick={() => setSearchQuery(tag.name)}
                        data-testid={`badge-tag-${tag.name}`}
                      >
                        #{tag.name} ({tag.count})
                      </Badge>
                    ))}
                  </div>
                </section>
              </>
            )}

            {(searchQuery || selectedCategory) && (
              <section>
                <div className="flex items-center gap-3 mb-6 sm:mb-8 px-2 sm:px-0">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Articles`}
                  </h2>
                  <Badge variant="outline" className="text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1">
                    {filteredPosts.length}
                  </Badge>
                </div>
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {filteredPosts.map((post, index) => (
                      <BlogCard key={post.slug} post={post} index={index} highlightQuery={searchQuery} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 sm:py-20">
                    <div className="space-y-4">
                      <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                        <Search className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">No articles found</h3>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
                          Try adjusting your search or browse all articles
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory(null); }} data-testid="button-clear-filters">
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20 md:py-24 px-4">
            <div className="space-y-4 sm:space-y-6">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">No blog posts yet</h3>
                <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">Check back soon for our latest articles and guides!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ 
  post, 
  index, 
  showViews = false, 
  highlightQuery = "" 
}: { 
  post: BlogPost; 
  index: number; 
  showViews?: boolean;
  highlightQuery?: string;
}) {
  const highlightText = (text: string) => {
    if (!highlightQuery) return text;
    const parts = text.split(new RegExp(`(${highlightQuery})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlightQuery.toLowerCase() ? (
        <mark key={i} className="bg-primary/20 text-primary px-1 rounded">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group flex flex-col"
      data-testid={`card-blog-${post.slug}`}
    >
      {post.featuredImage && (
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading={index < 3 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {showViews && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Eye className="h-4 w-4" />
              <span className="font-semibold">{post.views.toLocaleString()}</span>
            </div>
          )}
        </div>
      )}
      <CardHeader className="p-4 sm:p-6 flex-1 space-y-3 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${post.slug}`}>
            {post.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime} min
          </div>
        </div>
        <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {highlightQuery ? highlightText(post.title) : post.title}
        </CardTitle>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
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
      <CardContent className="p-4 sm:p-6 space-y-4 pt-0">
        <CardDescription className="line-clamp-3 leading-relaxed text-sm sm:text-base">
          {highlightQuery ? highlightText(post.meta.description) : post.meta.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs" data-testid={`badge-tag-${tag}-${post.slug}`}>
              #{tag}
            </Badge>
          ))}
        </div>
        <Link href={`/blogs/${post.slug}`}>
          <Button variant="outline" size="default" className="w-full text-sm sm:text-base" data-testid={`button-read-${post.slug}`}>
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
