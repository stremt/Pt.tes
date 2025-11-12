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
      <div className="min-h-screen py-16 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Breadcrumb */}
          <div className="mb-10 text-base text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            {" / "}
            <Link href="/blogs" className="hover:text-foreground transition-colors">Blog</Link>
            {" / "}
            <span className="text-foreground font-medium">{post.title}</span>
          </div>

          {/* Article Header */}
          <header className="mb-16 text-center space-y-8">
            <Badge variant="secondary" className="text-base px-5 py-2 font-medium">Article</Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-8 text-base text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">{new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-16 -mx-4 md:mx-0">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-border">
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
          <article className="prose prose-lg prose-headings:font-bold max-w-none mb-20">
            {post.content.map((item, index) => {
              switch (item.type) {
                case "h2":
                  return (
                    <h2 key={index} className="text-4xl md:text-5xl font-bold mt-16 mb-6 leading-tight">
                      {item.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={index} className="text-3xl font-bold mt-12 mb-5 leading-snug">
                      {item.text}
                    </h3>
                  );
                case "p":
                  return (
                    <p key={index} className="text-xl leading-relaxed mb-8 text-foreground">
                      {item.text}
                    </p>
                  );
                case "ul":
                  return (
                    <ul key={index} className="space-y-4 mb-8 pl-6">
                      {item.items?.map((listItem, i) => (
                        <li key={i} className="text-xl leading-relaxed text-foreground relative before:content-['•'] before:absolute before:-left-6 before:text-primary before:text-2xl before:font-bold">
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                case "ol":
                  return (
                    <ol key={index} className="space-y-4 mb-8 pl-8 list-decimal">
                      {item.items?.map((listItem, i) => (
                        <li key={i} className="text-xl leading-relaxed text-foreground pl-2 marker:text-primary marker:font-bold">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  );
                case "code":
                  return (
                    <pre key={index} className="bg-muted/50 border-2 border-border p-6 rounded-xl overflow-x-auto mb-8 shadow-lg">
                      <code className="text-base font-mono text-foreground">{item.text}</code>
                    </pre>
                  );
                case "image":
                  return (
                    <figure key={index} className="my-12 -mx-4 md:mx-0">
                      <div className="rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
                        <img
                          src={item.src}
                          alt={item.alt || ""}
                          className="w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {item.caption && (
                        <figcaption className="text-center text-base text-muted-foreground mt-4 font-medium">
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
            <section className="mb-20 pt-12 border-t-2">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Related Tools</h2>
                <p className="text-xl text-muted-foreground">Try these tools mentioned in this article</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedTools.map((tool) => {
                  const Icon = getToolIcon(tool.icon);
                  return (
                    <Card key={tool.id} className="hover-elevate active-elevate-2 transition-all duration-300 border-2 group">
                      <CardHeader className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <CardDescription className="text-base leading-relaxed">
                          {tool.description}
                        </CardDescription>
                        <Link href={tool.path}>
                          <Button variant="outline" size="lg" className="w-full" data-testid={`button-related-tool-${tool.id}`}>
                            Use Tool
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
          <div className="text-center pt-8 border-t-2">
            <Link href="/blogs">
              <Button variant="outline" size="lg" data-testid="button-back-to-all-articles">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
