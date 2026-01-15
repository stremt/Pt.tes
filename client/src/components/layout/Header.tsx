import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchButton } from "@/components/SearchDialog";
import { Menu, X } from "lucide-react";
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
    { href: "/tools", label: "All Tools" },
    { href: "/blogs", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${scrolled ? 'h-14 md:h-14' : 'h-16 md:h-16'}`}>
      <div className="container mx-auto flex h-full items-center justify-between px-3 sm:px-4 md:px-6 max-w-7xl">
        <Link href="/" className="flex items-center space-x-2 hover-elevate rounded-lg px-1 sm:px-2 py-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <img 
              src="/logo.png" 
              alt="Pixocraft Tools Logo" 
              width="32"
              height="32"
              className={`transition-all ${scrolled ? 'h-6 w-6 sm:h-7 sm:w-7' : 'h-7 w-7 sm:h-8 sm:w-8'}`}
            />
            <div className="flex flex-col">
              <span className={`font-bold leading-none transition-all ${scrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>Pixocraft Tools</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground leading-none hidden sm:block">India's Biggest Tool Hub</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`text-sm md:text-sm lg:text-base font-medium transition-colors hover:text-primary cursor-pointer ${
                  isActive(link.href) ? 'text-foreground' : 'text-muted-foreground'
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <SearchButton variant="outline" />
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-0.5 sm:gap-1">
          <SearchButton variant="ghost" iconOnly={true} />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col gap-1.5 sm:gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                <div
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href) 
                      ? 'bg-secondary text-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
