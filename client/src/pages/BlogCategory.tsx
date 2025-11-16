import { useMemo } from "react";
import { Link, useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Calendar, User, ArrowRight, Clock, Eye, Folder } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";

export default function BlogCategory() {
  const [, params] = useRoute("/blogs/category/:category");
  const categorySlug = params?.category;

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/blogs/data.json"],
  });

  const categoryPosts = useMemo(() => {
    if (!posts || !categorySlug) return [];
    const decodedCategory = decodeURIComponent(categorySlug).replace(/-/g, ' ');
    return posts.filter(post => 
      post.category.toLowerCase() === decodedCategory.toLowerCase()
    );
  }, [posts, categorySlug]);

  const category = categoryPosts[0]?.category || 
    (categorySlug ? decodeURIComponent(categorySlug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '');

  useSEO({
    title: `${category} Articles | Pixocraft Blog`,
    description: `Browse all articles in the ${category} category. Expert guides, tutorials, and tips from the Pixocraft team.`,
    keywords: `${category}, blog, articles, guides, tutorials, pixocraft`,
    canonicalUrl: `https://tools.pixocraft.in/blogs/category/${categorySlug}`,
  });

  const popularPosts = useMemo(() => {
    return [...categoryPosts].sort((a, b) => b.views - a.views).slice(0, 3);
  }, [categoryPosts]);

  const latestPosts = useMemo(() => {
    return [...categoryPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [categoryPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
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
        </div>
      </div>
    );
  }

  if (categoryPosts.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="space-y-6">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
              <Folder className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-8">
              No articles found in this category.
            </p>
            <Link href="/blogs">
              <Button data-testid="button-back-to-blog">
                <ArrowRight className="mr-2 h-4 w-4" />
                Browse All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        <div className="mb-6 sm:mb-8 text-xs sm:text-sm text-muted-foreground px-2 sm:px-0">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          {" / "}
          <Link href="/blogs" className="hover:text-foreground transition-colors">Blog</Link>
          {" / "}
          <span className="text-foreground font-medium">{category}</span>
        </div>

        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 mb-10 sm:mb-14 md:mb-16 px-2 sm:px-4">
          <div className="flex items-center justify-center gap-3">
            <Folder className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            <Badge variant="secondary" className="text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 font-semibold" data-testid="badge-category">
              {category}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {category} <span className="text-primary">Articles</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our collection of {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''} in the {category} category
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {popularPosts.length > 0 && (
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
          )}

          <section>
            <div className="flex items-center gap-3 mb-6 sm:mb-8 px-2 sm:px-0">
              <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">All Articles</h2>
              <Badge variant="outline" className="text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1">
                {latestPosts.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {latestPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index + 3} />
              ))}
            </div>
          </section>
        </div>

        <div className="text-center pt-12 mt-12 border-t px-2 sm:px-0">
          <Link href="/blogs">
            <Button variant="outline" size="default" className="text-sm sm:text-base" data-testid="button-back-to-all-categories">
              Browse All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ 
  post, 
  index, 
  showViews = false 
}: { 
  post: BlogPost; 
  index: number; 
  showViews?: boolean;
}) {
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
          {post.title}
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
          {post.meta.description}
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
