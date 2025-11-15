import { Link, useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData } from "@/lib/seo";
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost as BlogPostType } from "@shared/schema";
import { tools, getToolIcon } from "@/lib/tools";

export default function BlogPost() {
  const [, params] = useRoute("/blogs/:slug");
  const slug = params?.slug;

  const { data: posts } = useQuery<BlogPostType[]>({
    queryKey: ["/blogs/data.json"],
  });

  const post = posts?.find((p) => p.slug === slug);

  useSEO({
    title: post ? `${post.title} | Pixocraft Blog` : "Blog Post | Pixocraft Tools",
    description: post?.meta.description || "Read our latest blog post",
    keywords: post?.meta.keywords,
    canonicalUrl: `https://tools.pixocraft.in/blogs/${slug}`,
    ogType: "article",
    article: {
      author: post?.author,
      publishedTime: post?.date,
    },
  });

  if (!post) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blogs">
            <Button data-testid="button-back-to-blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedTools = post.relatedTools
    ? tools.filter((t) => post.relatedTools?.includes(t.id))
    : [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.meta.description,
    "author": {
      "@type": "Organization",
      "name": post.author,
    },
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "Pixocraft Tools",
      "url": "https://tools.pixocraft.in",
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen py-8 sm:py-12 md:py-16 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto px-2 sm:px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm text-muted-foreground px-2 sm:px-0">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            {" / "}
            <Link href="/blogs" className="hover:text-foreground transition-colors">Blog</Link>
            {" / "}
            <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
          </div>

          {/* Article Header */}
          <header className="mb-8 sm:mb-12 md:mb-16 text-center space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-0">
            <Badge variant="secondary" className="text-xs sm:text-sm px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 font-medium">Article</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base text-muted-foreground">
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium">{new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium">{post.author}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8 sm:mb-12 md:mb-16 -mx-2 sm:mx-0">
              <div className="relative aspect-video rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border sm:border-2 border-border">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-sm sm:prose-base md:prose-lg prose-headings:font-bold max-w-none mb-12 sm:mb-16 md:mb-20 px-2 sm:px-0">
            {post.content.map((item, index) => {
              switch (item.type) {
                case "h2":
                  return (
                    <h2 key={index} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-8 sm:mt-12 md:mt-16 mb-4 sm:mb-5 md:mb-6 leading-tight">
                      {item.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={index} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-6 sm:mt-8 md:mt-12 mb-3 sm:mb-4 md:mb-5 leading-snug">
                      {item.text}
                    </h3>
                  );
                case "p":
                  return (
                    <p key={index} className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-8 text-foreground">
                      {item.text}
                    </p>
                  );
                case "ul":
                  return (
                    <ul key={index} className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8 pl-4 sm:pl-5 md:pl-6">
                      {item.items?.map((listItem, i) => (
                        <li key={i} className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-foreground relative before:content-['•'] before:absolute before:-left-4 sm:before:-left-5 md:before:-left-6 before:text-primary before:text-lg sm:before:text-xl md:before:text-2xl before:font-bold">
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                case "ol":
                  return (
                    <ol key={index} className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8 pl-5 sm:pl-6 md:pl-8 list-decimal">
                      {item.items?.map((listItem, i) => (
                        <li key={i} className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-foreground pl-1 sm:pl-1.5 md:pl-2 marker:text-primary marker:font-bold">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  );
                case "code":
                  return (
                    <pre key={index} className="bg-muted/50 border sm:border-2 border-border p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl overflow-x-auto mb-4 sm:mb-6 md:mb-8 shadow-md sm:shadow-lg">
                      <code className="text-xs sm:text-sm md:text-base font-mono text-foreground">{item.text}</code>
                    </pre>
                  );
                case "image":
                  return (
                    <figure key={index} className="my-6 sm:my-8 md:my-12 -mx-2 sm:mx-0">
                      <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border sm:border-2 border-border shadow-lg sm:shadow-xl md:shadow-2xl">
                        <img
                          src={item.src}
                          alt={item.alt || ""}
                          className="w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {item.caption && (
                        <figcaption className="text-center text-xs sm:text-sm md:text-base text-muted-foreground mt-2 sm:mt-3 md:mt-4 font-medium">
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                default:
                  return null;
              }
            })}
          </article>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="mb-12 sm:mb-16 md:mb-20 pt-8 sm:pt-10 md:pt-12 border-t sm:border-t-2 px-2 sm:px-0">
              <div className="text-center mb-8 sm:mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Related Tools</h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">Try these tools mentioned in this article</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {relatedTools.map((tool) => {
                  const Icon = getToolIcon(tool.icon);
                  return (
                    <Card key={tool.id} className="hover-elevate active-elevate-2 transition-all duration-300 border sm:border-2 group">
                      <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300 flex-shrink-0">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
                          </div>
                          <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl group-hover:text-primary transition-colors leading-tight">{tool.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-5 p-4 sm:p-6 pt-0">
                        <CardDescription className="text-sm sm:text-base leading-relaxed">
                          {tool.description}
                        </CardDescription>
                        <Link href={tool.path}>
                          <Button variant="outline" size="default" className="w-full text-sm sm:text-base" data-testid={`button-related-tool-${tool.id}`}>
                            Use Tool
                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {/* Back to Blog */}
          <div className="text-center pt-6 sm:pt-8 border-t sm:border-t-2 px-2 sm:px-0">
            <Link href="/blogs">
              <Button variant="outline" size="default" className="text-sm sm:text-base" data-testid="button-back-to-all-articles">
                <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Back to All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
