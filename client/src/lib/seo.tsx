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

// FAQ Schema Generator
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Article Schema Generator for Blog Posts
export interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  image?: string;
  url: string;
}

export function generateArticleSchema({
  title,
  description,
  author,
  publishedTime,
  image,
  url,
}: ArticleSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pixocraft Tools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tools.pixocraft.in/favicon.png"
      }
    },
    "datePublished": publishedTime,
    "dateModified": publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    })
  };
}

// Default OG Images for tool pages
export const OG_IMAGES = {
  home: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
  tempMail: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=1200&h=630&fit=crop",
  passwordGenerator: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=630&fit=crop",
  qrMaker: "https://images.unsplash.com/photo-1617984683318-dfe7b780b2f8?w=1200&h=630&fit=crop",
  imageCompressor: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop",
  blogs: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop",
} as const;
