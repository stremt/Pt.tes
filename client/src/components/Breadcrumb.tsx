import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

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

export function Breadcrumb({ items }: BreadcrumbProps) {
  const mobileItems = items.slice(-2);

  return (
    <nav className="mb-4 sm:mb-6" aria-label="Breadcrumb">
      {/* Mobile: show only last 2 items */}
      <ol className="flex md:hidden flex-wrap items-center gap-y-1 text-xs text-muted-foreground">
        {items.length > 2 && (
          <li className="flex items-center">
            <span className="text-muted-foreground/60">…</span>
            <span className="mx-1.5 text-muted-foreground/40 select-none" aria-hidden="true">/</span>
          </li>
        )}
        {mobileItems.map((item, index) => {
          const isLast = index === mobileItems.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-1.5 text-muted-foreground/40 select-none" aria-hidden="true">/</span>
              )}
              {isLast ? (
                <span className="font-semibold text-foreground leading-snug">{item.label}</span>
              ) : item.url ? (
                <Link
                  href={toRelativeUrl(item.url)}
                  className="text-muted-foreground hover:text-foreground transition-colors leading-snug"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-muted-foreground leading-snug">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Desktop: full breadcrumb */}
      <ol className="hidden md:flex flex-wrap items-center gap-y-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-1.5 text-muted-foreground/50 select-none" aria-hidden="true">/</span>
              )}
              {isLast ? (
                <span className="font-semibold text-foreground leading-snug">
                  {item.label}
                </span>
              ) : item.url ? (
                <Link
                  href={toRelativeUrl(item.url)}
                  className="text-muted-foreground hover:text-foreground transition-colors leading-snug"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-muted-foreground leading-snug">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
