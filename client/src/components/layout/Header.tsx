import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tools", label: "Tools" },
    { href: "/blogs", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 max-w-7xl">
        <Link href="/" className="flex items-center space-x-2 hover-elevate rounded-lg px-2 py-1">
          <div className="flex items-center gap-2">
            <div className={`rounded-lg bg-primary flex items-center justify-center transition-all ${scrolled ? 'h-7 w-7' : 'h-8 w-8'}`}>
              <Sparkles className={`text-primary-foreground transition-all ${scrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold leading-none transition-all ${scrolled ? 'text-base' : 'text-lg'}`}>Pixocraft Tools</span>
              <span className="text-xs text-muted-foreground leading-none hidden sm:block">Fast & Free</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  isActive(link.href) ? 'text-foreground' : 'text-muted-foreground'
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/contact">
            <Button size="sm" data-testid="button-contact-cta">
              Contact Us
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <div
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href) 
                      ? 'bg-secondary text-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2" data-testid="button-mobile-contact-cta">
                Contact Us
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
