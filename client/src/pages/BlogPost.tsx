import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useSEO, StructuredData } from "@/lib/seo";
import { 
  Calendar, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Eye, 
  Share2, 
  Link as LinkIcon, 
  Facebook, 
  Twitter,
  Linkedin,
  MessageCircle,
  Send
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost as BlogPostType, BlogComment } from "@shared/schema";
import { tools, getToolIcon } from "@/lib/tools";
import { useToast } from "@/hooks/use-toast";

export default function BlogPost() {
  const [, params] = useRoute("/blogs/:slug");
  const slug = params?.slug;
  const [activeSection, setActiveSection] = useState<string>("");
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { data: posts } = useQuery<BlogPostType[]>({
    queryKey: ["/blogs/data.json"],
  });

  const post = posts?.find((p) => p.slug === slug);
  const currentIndex = posts?.findIndex((p) => p.slug === slug) ?? -1;
  const previousPost = currentIndex > 0 ? posts?.[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < (posts?.length ?? 0) - 1 ? posts?.[currentIndex + 1] : null;

  const relatedPosts = useMemo(() => {
    if (!post || !posts) return [];
    return posts
      .filter(p => p.slug !== post.slug && p.category === post.category)
      .slice(0, 3);
  }, [post, posts]);

  const tableOfContents = useMemo(() => {
    if (!post) return [];
    return post.content
      .filter(item => item.type === "h2" || item.type === "h3")
      .map((item, index) => ({
        id: `heading-${index}`,
        level: item.type === "h2" ? 2 : 3,
        text: item.text || ""
      }));
  }, [post]);

  useEffect(() => {
    if (!slug) return;
    const storedComments = localStorage.getItem(`blog-comments-${slug}`);
    if (storedComments) {
      try {
        setComments(JSON.parse(storedComments));
      } catch (_) {
        localStorage.removeItem(`blog-comments-${slug}`);
      }
    }
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    
    const currentViews = parseInt(localStorage.getItem(`blog-views-${slug}`) || "0");
    if (currentViews === 0) {
      localStorage.setItem(`blog-views-${slug}`, "1");
    }
  }, [post, slug]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2[id], h3[id]');
      let current = "";
      
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 150) {
          current = heading.id;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

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

  const handleShare = (platform: string) => {
    const url = `https://tools.pixocraft.in/blogs/${slug}`;
    const text = post?.title || "";
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    const url = `https://tools.pixocraft.in/blogs/${slug}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "The article link has been copied to your clipboard.",
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText || !slug) return;

    const newComment: BlogComment = {
      id: Date.now().toString(),
      postSlug: slug,
      author: commentName,
      email: commentEmail || undefined,
      content: commentText,
      date: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`blog-comments-${slug}`, JSON.stringify(updatedComments));

    setCommentName("");
    setCommentEmail("");
    setCommentText("");

    toast({
      title: "Comment posted!",
      description: "Your comment has been added successfully.",
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.meta.description,
    "image": post.featuredImage,
    "author": {
      "@type": "Organization",
      "name": post.author,
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "Pixocraft Tools",
      "url": "https://tools.pixocraft.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tools.pixocraft.in/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tools.pixocraft.in/blogs/${slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.content.reduce((acc, item) => {
      if (item.text) return acc + item.text.split(/\s+/).length;
      if (item.items) return acc + item.items.join(" ").split(/\s+/).length;
      return acc;
    }, 0)
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen py-8 sm:py-12 md:py-16 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {tableOfContents.length > 0 && (
                  <Card className="p-6">
                    <h3 className="font-bold text-sm uppercase tracking-wide mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left text-sm transition-colors ${
                            item.level === 3 ? 'pl-4' : ''
                          } ${
                            activeSection === item.id 
                              ? 'text-primary font-semibold' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                          data-testid={`toc-${item.id}`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </nav>
                  </Card>
                )}

                <Card className="p-6">
                  <h3 className="font-bold text-sm uppercase tracking-wide mb-4">Share Article</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleShare('twitter')}
                      data-testid="button-share-twitter"
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleShare('facebook')}
                      data-testid="button-share-facebook"
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleShare('linkedin')}
                      data-testid="button-share-linkedin"
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleCopyLink}
                      data-testid="button-copy-link"
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                </Card>
              </div>
            </aside>

            <main className="flex-1 min-w-0">
              <div className="mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm text-muted-foreground px-2 sm:px-0">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                {" / "}
                <Link href="/blogs" className="hover:text-foreground transition-colors">Blog</Link>
                {" / "}
                <Link href={`/blogs?category=${encodeURIComponent(post.category)}`} className="hover:text-foreground transition-colors">{post.category}</Link>
                {" / "}
                <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
              </div>

              <header className="mb-8 sm:mb-12 md:mb-16 space-y-4 sm:space-y-6 px-2 sm:px-0">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="default" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2" data-testid="badge-category">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>{new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</span>
                  </div>
                </div>

                <div className="lg:hidden flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleShare('twitter')} data-testid="button-share-mobile-twitter">
                    <Twitter className="h-4 w-4 mr-2" /> Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopyLink} data-testid="button-copy-link-mobile">
                    <LinkIcon className="h-4 w-4 mr-2" /> Copy Link
                  </Button>
                </div>
              </header>

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

              <article 
                ref={contentRef}
                className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-headings:font-bold max-w-none mb-12 sm:mb-16 md:mb-20 px-2 sm:px-0"
              >
                {post.content.map((item, index) => {
                  const headingId = (item.type === "h2" || item.type === "h3") 
                    ? `heading-${tableOfContents.findIndex(toc => toc.text === item.text)}`
                    : undefined;

                  switch (item.type) {
                    case "h2":
                      return (
                        <h2 key={index} id={headingId} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-8 sm:mt-12 md:mt-16 mb-4 sm:mb-5 md:mb-6 leading-tight scroll-mt-24">
                          {item.text}
                        </h2>
                      );
                    case "h3":
                      return (
                        <h3 key={index} id={headingId} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-6 sm:mt-8 md:mt-12 mb-3 sm:mb-4 md:mb-5 leading-snug scroll-mt-24">
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

              <div className="mb-8 sm:mb-12 px-2 sm:px-0">
                <h3 className="text-lg sm:text-xl font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link key={tag} href={`/blogs/tag/${encodeURIComponent(tag)}`}>
                      <Badge variant="secondary" className="cursor-pointer hover-elevate text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2" data-testid={`badge-tag-${tag}`}>
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {(previousPost || nextPost) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 sm:mb-16 px-2 sm:px-0">
                  {previousPost && (
                    <Link href={`/blogs/${previousPost.slug}`}>
                      <Card className="hover-elevate active-elevate-2 transition-all h-full group" data-testid="card-previous-post">
                        <CardHeader className="p-4 sm:p-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Previous Article</span>
                          </div>
                          <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-2">
                            {previousPost.title}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </Link>
                  )}
                  {nextPost && (
                    <Link href={`/blogs/${nextPost.slug}`}>
                      <Card className="hover-elevate active-elevate-2 transition-all h-full group" data-testid="card-next-post">
                        <CardHeader className="p-4 sm:p-6">
                          <div className="flex items-center gap-2 justify-end text-sm text-muted-foreground mb-2">
                            <span>Next Article</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <CardTitle className="text-base sm:text-lg text-right group-hover:text-primary transition-colors line-clamp-2">
                            {nextPost.title}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </Link>
                  )}
                </div>
              )}

              {relatedPosts.length > 0 && (
                <section className="mb-12 sm:mb-16 md:mb-20 pt-8 sm:pt-10 md:pt-12 border-t sm:border-t-2 px-2 sm:px-0">
                  <div className="mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Related Articles</h2>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground">More articles in {post.category}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Card key={relatedPost.slug} className="hover-elevate active-elevate-2 transition-all group overflow-hidden" data-testid={`card-related-${relatedPost.slug}`}>
                        {relatedPost.featuredImage && (
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={relatedPost.featuredImage}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <CardHeader className="p-4 space-y-3">
                          <Badge variant="secondary" className="w-fit text-xs">{relatedPost.category}</Badge>
                          <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {relatedPost.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {relatedPost.readingTime} min read
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <Link href={`/blogs/${relatedPost.slug}`}>
                            <Button variant="outline" size="sm" className="w-full" data-testid={`button-read-related-${relatedPost.slug}`}>
                              Read Article
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {relatedTools.length > 0 && (
                <section className="mb-12 sm:mb-16 md:mb-20 pt-8 sm:pt-10 md:pt-12 border-t sm:border-t-2 px-2 sm:px-0">
                  <div className="mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Related Tools</h2>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground">Try these tools mentioned in this article</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {relatedTools.map((tool) => {
                      const Icon = getToolIcon(tool.icon);
                      return (
                        <Card key={tool.id} className="hover-elevate active-elevate-2 transition-all group" data-testid={`card-tool-${tool.id}`}>
                          <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all flex-shrink-0">
                                <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary" />
                              </div>
                              <CardTitle className="text-base sm:text-lg md:text-xl group-hover:text-primary transition-colors leading-tight">{tool.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 sm:space-y-5 p-4 sm:p-6 pt-0">
                            <CardDescription className="text-sm sm:text-base leading-relaxed">
                              {tool.description}
                            </CardDescription>
                            <Link href={tool.path}>
                              <Button variant="outline" size="default" className="w-full text-sm sm:text-base" data-testid={`button-use-tool-${tool.id}`}>
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

              <section className="mb-12 pt-8 border-t sm:border-t-2 px-2 sm:px-0">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Comments ({comments.length})</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Share your thoughts about this article</p>
                </div>

                <Card className="p-6 mb-8">
                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name *</label>
                        <Input
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          placeholder="Your name"
                          required
                          data-testid="input-comment-name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email (optional)</label>
                        <Input
                          type="email"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          placeholder="your@email.com"
                          data-testid="input-comment-email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Comment *</label>
                      <Textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={4}
                        required
                        data-testid="textarea-comment"
                      />
                    </div>
                    <Button type="submit" data-testid="button-submit-comment">
                      <Send className="mr-2 h-4 w-4" />
                      Post Comment
                    </Button>
                  </form>
                </Card>

                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <Card key={comment.id} className="p-6" data-testid={`comment-${comment.id}`}>
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <p className="text-sm sm:text-base leading-relaxed">{comment.content}</p>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </section>

              <div className="text-center pt-6 sm:pt-8 border-t sm:border-t-2 px-2 sm:px-0">
                <Link href="/blogs">
                  <Button variant="outline" size="default" className="text-sm sm:text-base" data-testid="button-back-to-all-articles">
                    <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Back to All Articles
                  </Button>
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
