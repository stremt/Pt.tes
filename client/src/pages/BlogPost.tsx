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
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/blogs" className="hover:text-foreground">Blog</Link>
            {" / "}
            <span className="text-foreground">{post.title}</span>
          </div>

          {/* Article Header */}
          <header className="mb-12 text-center space-y-6">
            <Badge variant="secondary">Article</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{post.title}</h1>
            <div className="flex items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-12 -mx-4 md:mx-0">
              <div className="relative aspect-video rounded-xl overflow-hidden">
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
          <article className="prose prose-lg max-w-none mb-16">
            {post.content.map((item, index) => {
              switch (item.type) {
                case "h2":
                  return (
                    <h2 key={index} className="text-3xl font-bold mt-12 mb-4">
                      {item.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={index} className="text-2xl font-semibold mt-8 mb-3">
                      {item.text}
                    </h3>
                  );
                case "p":
                  return (
                    <p key={index} className="text-lg leading-relaxed mb-6 text-foreground">
                      {item.text}
                    </p>
                  );
                case "ul":
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-foreground">
                      {item.items?.map((listItem, i) => (
                        <li key={i} className="text-lg">{listItem}</li>
                      ))}
                    </ul>
                  );
                case "ol":
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 mb-6 text-foreground">
                      {item.items?.map((listItem, i) => (
                        <li key={i} className="text-lg">{listItem}</li>
                      ))}
                    </ol>
                  );
                case "code":
                  return (
                    <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto mb-6">
                      <code className="text-sm font-mono">{item.text}</code>
                    </pre>
                  );
                case "image":
                  return (
                    <figure key={index} className="mb-8">
                      <img
                        src={item.src}
                        alt={item.alt || ""}
                        className="rounded-lg w-full"
                      />
                      {item.caption && (
                        <figcaption className="text-center text-sm text-muted-foreground mt-2">
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
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Try These Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedTools.map((tool) => {
                  const Icon = getToolIcon(tool.icon);
                  return (
                    <Card key={tool.id} className="hover-elevate">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          {tool.description}
                        </CardDescription>
                        <Link href={tool.path}>
                          <Button variant="outline" className="w-full" data-testid={`button-related-tool-${tool.id}`}>
                            Use Tool
                            <ArrowRight className="ml-2 h-4 w-4" />
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
          <div className="text-center">
            <Link href="/blogs">
              <Button variant="outline" size="lg" data-testid="button-back-to-all-articles">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
