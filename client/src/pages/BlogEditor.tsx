import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  RefreshCw, 
  Plus, 
  Tag, 
  Eye, 
  Code,
  Calendar,
  User,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/lib/seo";
import { BlogPost, BlogContentItem } from "@shared/schema";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("Pixocraft Team");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [views, setViews] = useState(0);
  const { toast } = useToast();

  useSEO({
    title: "Blog Editor | Pixocraft Tools",
    description: "Create and edit blog posts with our powerful markdown editor. Auto-generate slugs, tags, and export JSON entries.",
    keywords: "blog editor, markdown editor, content creation, pixocraft",
    canonicalUrl: "https://tools.pixocraft.in/blog-editor",
  });

  useEffect(() => {
    if (!slug && title) {
      const autoSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(autoSlug);
    }
  }, [title, slug]);

  const generateSlug = () => {
    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(newSlug);
    toast({
      title: "Slug generated!",
      description: `Slug: ${newSlug}`,
    });
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput.toLowerCase())) {
      setTags([...tags, tagInput.toLowerCase()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const generateTags = () => {
    const text = `${title} ${metaDescription} ${markdown}`.toLowerCase();
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'it', 'its'];
    
    const words = text.match(/\b\w+\b/g) || [];
    const wordFreq = new Map<string, number>();
    
    words.forEach(word => {
      if (word.length > 3 && !commonWords.includes(word)) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
      }
    });

    const sortedWords = Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word]) => word);

    setTags(Array.from(new Set([...tags, ...sortedWords])));
    toast({
      title: "Tags generated!",
      description: `Added ${sortedWords.length} auto-generated tags`,
    });
  };

  const calculateReadingTime = (content: string): number => {
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  const parseMarkdown = (): BlogContentItem[] => {
    const content: BlogContentItem[] = [];
    const lines = markdown.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (line.startsWith('## ')) {
        content.push({ type: 'h2', text: line.substring(3) });
      } else if (line.startsWith('### ')) {
        content.push({ type: 'h3', text: line.substring(4) });
      } else if (line.startsWith('```')) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        content.push({ type: 'code', text: codeLines.join('\n') });
      } else if (line.startsWith('![')) {
        const match = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, alt, src] = match;
          const captionMatch = lines[i + 1]?.match(/^_(.+)_$/);
          content.push({
            type: 'image',
            src,
            alt,
            caption: captionMatch ? captionMatch[1] : undefined
          });
          if (captionMatch) i++;
        }
      } else if (line.startsWith('- ')) {
        const items: string[] = [line.substring(2)];
        i++;
        while (i < lines.length && lines[i].trim().startsWith('- ')) {
          items.push(lines[i].trim().substring(2));
          i++;
        }
        content.push({ type: 'ul', items });
        i--;
      } else if (/^\d+\.\s/.test(line)) {
        const items: string[] = [line.replace(/^\d+\.\s/, '')];
        i++;
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
          i++;
        }
        content.push({ type: 'ol', items });
        i--;
      } else if (line.length > 0) {
        content.push({ type: 'p', text: line });
      }

      i++;
    }

    return content;
  };

  const exportBlog = () => {
    const date = new Date().toISOString().split('T')[0];
    const content = parseMarkdown();
    const readingTime = calculateReadingTime(markdown);

    const blogPost: BlogPost = {
      slug,
      title,
      date,
      author,
      category,
      tags,
      featuredImage: featuredImage || undefined,
      views,
      readingTime,
      meta: {
        description: metaDescription,
        keywords: metaKeywords,
      },
      content,
    };

    const json = JSON.stringify(blogPost, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug || 'blog-post'}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Blog exported!",
      description: "Your blog post JSON has been downloaded.",
    });
  };

  const copyToClipboard = () => {
    const date = new Date().toISOString().split('T')[0];
    const content = parseMarkdown();
    const readingTime = calculateReadingTime(markdown);

    const blogPost: BlogPost = {
      slug,
      title,
      date,
      author,
      category,
      tags,
      featuredImage: featuredImage || undefined,
      views,
      readingTime,
      meta: {
        description: metaDescription,
        keywords: metaKeywords,
      },
      content,
    };

    navigator.clipboard.writeText(JSON.stringify(blogPost, null, 2));
    toast({
      title: "Copied to clipboard!",
      description: "Blog post JSON has been copied.",
    });
  };

  const renderPreview = () => {
    const content = parseMarkdown();

    return (
      <article className="prose prose-sm sm:prose-base max-w-none">
        {content.map((item, index) => {
          switch (item.type) {
            case 'h2':
              return <h2 key={index} className="text-2xl sm:text-3xl font-bold mt-8 mb-4">{item.text}</h2>;
            case 'h3':
              return <h3 key={index} className="text-xl sm:text-2xl font-bold mt-6 mb-3">{item.text}</h3>;
            case 'p':
              return <p key={index} className="text-base leading-relaxed mb-4">{item.text}</p>;
            case 'ul':
              return (
                <ul key={index} className="space-y-2 mb-4 pl-6">
                  {item.items?.map((listItem, i) => (
                    <li key={i} className="text-base leading-relaxed">{listItem}</li>
                  ))}
                </ul>
              );
            case 'ol':
              return (
                <ol key={index} className="space-y-2 mb-4 pl-6 list-decimal">
                  {item.items?.map((listItem, i) => (
                    <li key={i} className="text-base leading-relaxed">{listItem}</li>
                  ))}
                </ol>
              );
            case 'code':
              return (
                <pre key={index} className="bg-muted border border-border p-4 rounded-lg overflow-x-auto mb-4">
                  <code className="text-sm font-mono">{item.text}</code>
                </pre>
              );
            case 'image':
              return (
                <figure key={index} className="my-6">
                  <img src={item.src} alt={item.alt || ""} className="w-full rounded-lg border" />
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
    );
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        <div className="text-center space-y-4 sm:space-y-6 mb-10 sm:mb-14">
          <Badge variant="secondary" className="text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 font-semibold">
            <FileText className="mr-2 h-4 w-4" />
            Blog Editor
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Create Your <span className="text-primary">Blog Post</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Write in markdown, preview in real-time, and export as JSON
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Metadata</CardTitle>
              <CardDescription>Basic information about your blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter blog post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    data-testid="input-title"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slug">Slug *</Label>
                    <Button variant="ghost" size="sm" onClick={generateSlug} data-testid="button-generate-slug">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Auto Generate
                    </Button>
                  </div>
                  <Input
                    id="slug"
                    placeholder="blog-post-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    data-testid="input-slug"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    placeholder="Author name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    data-testid="input-author"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    placeholder="Privacy & Security"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    data-testid="input-category"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="views">Initial Views</Label>
                  <Input
                    id="views"
                    type="number"
                    placeholder="0"
                    value={views}
                    onChange={(e) => setViews(parseInt(e.target.value) || 0)}
                    data-testid="input-views"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  placeholder="https://example.com/image.jpg"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  data-testid="input-featured-image"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Tags</Label>
                  <Button variant="ghost" size="sm" onClick={generateTags} data-testid="button-generate-tags">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Auto Generate
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    data-testid="input-tag"
                  />
                  <Button onClick={addTag} data-testid="button-add-tag">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)} data-testid={`badge-tag-${tag}`}>
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description *</Label>
                <Textarea
                  id="metaDescription"
                  placeholder="Brief description for SEO (150-160 characters)"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  data-testid="textarea-meta-description"
                />
                <p className="text-xs text-muted-foreground">
                  {metaDescription.length} / 160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords *</Label>
                <Input
                  id="metaKeywords"
                  placeholder="keyword1, keyword2, keyword3"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  data-testid="input-meta-keywords"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Editor</CardTitle>
              <CardDescription>
                Write your blog post in Markdown format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="edit" data-testid="tab-edit">
                    <Code className="h-4 w-4 mr-2" />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="preview" data-testid="tab-preview">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="help" data-testid="tab-help">
                    <FileText className="h-4 w-4 mr-2" />
                    Help
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="mt-4">
                  <Textarea
                    placeholder="## Your Heading Here

Write your content using markdown...

- List item 1
- List item 2

### Subheading

More content here...

```
code block
```

![Alt text](image-url)
_Image caption_"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                    data-testid="textarea-markdown"
                  />
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Reading time: {calculateReadingTime(markdown)} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{markdown.split(/\s+/).length} words</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-4">
                  <div className="min-h-[500px] p-6 border rounded-lg bg-background">
                    {featuredImage && (
                      <div className="mb-8">
                        <img src={featuredImage} alt={title} className="w-full rounded-lg" />
                      </div>
                    )}
                    <div className="mb-6">
                      <Badge variant="secondary" className="mb-4">{category || "Category"}</Badge>
                      <h1 className="text-4xl font-bold mb-4">{title || "Blog Post Title"}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date().toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {calculateReadingTime(markdown)} min read
                        </div>
                      </div>
                      <div className="flex gap-2 mb-6">
                        {tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    {renderPreview()}
                  </div>
                </TabsContent>

                <TabsContent value="help" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Markdown Syntax Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Headings</h4>
                        <code className="block bg-muted p-2 rounded text-sm">
                          ## Heading 2<br />
                          ### Heading 3
                        </code>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Lists</h4>
                        <code className="block bg-muted p-2 rounded text-sm">
                          - Unordered item<br />
                          - Another item<br /><br />
                          1. Ordered item<br />
                          2. Another ordered item
                        </code>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Code Blocks</h4>
                        <code className="block bg-muted p-2 rounded text-sm">
                          ```<br />
                          Your code here<br />
                          ```
                        </code>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Images</h4>
                        <code className="block bg-muted p-2 rounded text-sm">
                          ![Alt text](https://image-url.com/image.jpg)<br />
                          _Optional caption_
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Download or copy your blog post JSON</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button onClick={exportBlog} data-testid="button-export">
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
              <Button variant="outline" onClick={copyToClipboard} data-testid="button-copy-json">
                <FileText className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
