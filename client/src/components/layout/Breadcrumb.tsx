import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { StructuredData, generateBreadcrumbSchema, type BreadcrumbItem } from "@/lib/seo";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function toRelativeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return url;
  }
}

function getLabel(item: BreadcrumbItem): string {
  return item.name ?? item.label ?? "";
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="mb-6" data-testid="breadcrumb-nav">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground" data-testid="breadcrumb-list">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" data-testid={`breadcrumb-separator-${index}`} />}
              {index === items.length - 1 || !item.url ? (
                <span className="text-foreground font-medium" data-testid={`breadcrumb-current`}>
                  {getLabel(item)}
                </span>
              ) : (
                <Link
                  href={toRelativeUrl(item.url)}
                  className="hover:text-foreground transition-colors"
                  data-testid={`breadcrumb-link-${index}`}
                >
                  {getLabel(item)}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
