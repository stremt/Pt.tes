import { Link } from "wouter";
import { Mail, Sparkles, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const toolLinks = [
    { href: "/tools/temp-mail", label: "Temp Mail" },
    { href: "/tools/password-generator", label: "Password Generator" },
    { href: "/tools/qr-maker", label: "QR Code Maker" },
    { href: "/tools/image-compressor", label: "Image Compressor" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Pixocraft Tools</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
              India's Biggest Free Online Tool Hub
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              200+ Browser Tools • 100% Private & Offline • Made in India
            </p>
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button 
                    key={social.label}
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-testid={`link-social-${social.label.toLowerCase()}`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Tools Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Popular Tools</h3>
            <ul className="space-y-3 text-sm">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Get In Touch</h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:support@pixocraft.in"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>support@pixocraft.in</span>
              </a>
              <p className="text-muted-foreground text-xs">
                We typically respond within 24-48 hours
              </p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Built with precision by the Pixocraft team
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} Pixocraft Tools — India's Biggest Free Online Tool Hub • Part of{" "}
            <a 
              href="https://pixocraft.in" 
              className="hover:text-foreground transition-colors underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pixocraft.in
            </a>
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <a href="mailto:support@pixocraft.in" className="hover:text-foreground transition-colors">
              Contact Support
            </a>
            <span>•</span>
            <span>Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
