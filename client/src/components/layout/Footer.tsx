import { Link } from "wouter";
import { Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-lg">Pixocraft Tools</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Smart, Fast, and Free Online Tools.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:support@pixocraft.in"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-contact-email"
              >
                <Mail className="h-4 w-4" />
                support@pixocraft.in
              </a>
              <p className="text-muted-foreground">
                Response time: 24-48 hours
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Pixocraft Tools – Part of <a href="https://pixocraft.in" className="hover:text-foreground transition-colors">Pixocraft.in</a></p>
        </div>
      </div>
    </footer>
  );
}
