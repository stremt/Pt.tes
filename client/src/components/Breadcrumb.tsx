import { useEffect } from "react";
import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  schemaUrl?: string;
}

export function Breadcrumb({ items, schemaUrl = "" }: BreadcrumbProps) {
  useEffect(() => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(item.url && { item: item.url }),
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [items]);

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.url ? (
              <>
                <Link href={item.url} className="text-primary hover:text-primary/80 transition-colors">
                  {item.label}
                </Link>
                {index < items.length - 1 && <span className="mx-2 text-muted-foreground">/</span>}
              </>
            ) : (
              <>
                <span className="text-foreground font-medium">{item.label}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
