import { useEffect } from "react";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  article?: {
    author?: string;
    publishedTime?: string;
  };
}

export function useSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  ogImage,
  article,
}: SEOProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Helper to set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description);
    if (keywords) {
      setMetaTag("keywords", keywords);
    }

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }

    // OpenGraph tags
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", ogType, true);
    if (canonicalUrl) {
      setMetaTag("og:url", canonicalUrl, true);
    }
    if (ogImage) {
      setMetaTag("og:image", ogImage, true);
    }

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    if (ogImage) {
      setMetaTag("twitter:image", ogImage);
    }

    // Article-specific tags
    if (article && ogType === "article") {
      if (article.author) {
        setMetaTag("article:author", article.author, true);
      }
      if (article.publishedTime) {
        setMetaTag("article:published_time", article.publishedTime, true);
      }
    }
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, article]);
}

export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
