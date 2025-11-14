import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function OGPreview() {
  const [title, setTitle] = useState<string>("Your Amazing Website");
  const [description, setDescription] = useState<string>("Check out this awesome content! Click to learn more.");
  const [imageUrl, setImageUrl] = useState<string>("https://placehold.co/1200x630/3b82f6/ffffff?text=Preview+Image");
  const [url, setUrl] = useState<string>("https://example.com");

  useSEO({
    title: "Open Graph Preview Tool | Check Social Media Thumbnails | Pixocraft Tools",
    description: "Preview how your page will look on Facebook, Twitter, LinkedIn & WhatsApp. Offline and simple.",
    keywords: "og preview, open graph tool, social preview generator, facebook preview, twitter card",
    canonicalUrl: "https://tools.pixocraft.in/tools/og-preview",
  });

  const howItWorks = [
    { step: 1, title: "Enter Details", description: "Fill in your page title, description, and image URL" },
    { step: 2, title: "Live Preview", description: "See how it looks on different social platforms" },
    { step: 3, title: "Optimize", description: "Adjust until it looks perfect before publishing" },
  ];

  const benefits = [
    { icon: <Eye className="h-5 w-5" />, title: "Multi-Platform", description: "Preview for Facebook, Twitter, LinkedIn, and WhatsApp" },
    { icon: <Eye className="h-5 w-5" />, title: "Real-Time", description: "See changes instantly as you type" },
    { icon: <Eye className="h-5 w-5" />, title: "Offline", description: "No data sent to servers - completely private" },
  ];

  const faqs = [
    {
      question: "What is Open Graph?",
      answer: "Open Graph is a protocol that controls how URLs are displayed when shared on social media platforms like Facebook, Twitter, and LinkedIn.",
    },
    {
      question: "What image size should I use?",
      answer: "Recommended size is 1200x630 pixels. This works well across all social platforms.",
    },
    {
      question: "Does this preview my actual page?",
      answer: "No, this tool shows how your content WOULD look with the information you provide. To preview an actual URL, use each platform's debugger tool.",
    },
  ];

  return (
    <ToolLayout
      title="OG Image Previewer"
      description="Preview how your page will look on Facebook, Twitter, LinkedIn & WhatsApp. Offline and simple."
      icon={<Eye className="h-8 w-8" />}
      toolId="og-preview"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your page title"
              data-testid="input-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your page description"
              className="min-h-[80px]"
              data-testid="input-description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url" className="text-base font-semibold">
              Image URL
            </Label>
            <Input
              id="image-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              data-testid="input-image-url"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-base font-semibold">
              URL
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              data-testid="input-url"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold">Preview</h3>
          
          {/* Facebook Preview */}
          <div>
            <h4 className="font-semibold mb-3 text-muted-foreground">Facebook</h4>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-hidden rounded-lg border">
                  <img 
                    src={imageUrl} 
                    alt="OG Preview" 
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/1200x630/3b82f6/ffffff?text=Image+Not+Found';
                    }}
                    data-testid="img-facebook-preview"
                  />
                  <div className="p-4 bg-muted">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{url}</p>
                    <h4 className="font-bold text-lg mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Twitter Preview */}
          <div>
            <h4 className="font-semibold mb-3 text-muted-foreground">Twitter</h4>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-hidden rounded-lg border">
                  <img 
                    src={imageUrl} 
                    alt="Twitter Preview" 
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/1200x630/3b82f6/ffffff?text=Image+Not+Found';
                    }}
                    data-testid="img-twitter-preview"
                  />
                  <div className="p-4 border-t bg-muted">
                    <h4 className="font-bold text-base mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-1">{description}</p>
                    <p className="text-xs text-muted-foreground">{url}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* LinkedIn Preview */}
          <div>
            <h4 className="font-semibold mb-3 text-muted-foreground">LinkedIn</h4>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-hidden rounded-lg border">
                  <img 
                    src={imageUrl} 
                    alt="LinkedIn Preview" 
                    className="w-full h-auto"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/1200x630/3b82f6/ffffff?text=Image+Not+Found';
                    }}
                    data-testid="img-linkedin-preview"
                  />
                  <div className="p-4 bg-muted">
                    <h4 className="font-bold text-base mb-1">{title}</h4>
                    <p className="text-xs text-muted-foreground">{url}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
